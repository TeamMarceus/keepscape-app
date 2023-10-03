import { Formik } from 'formik';
import { isEmpty } from 'lodash-es';
// import { useAlert } from 'react-alert';

import { useSelector } from 'react-redux';

import {
  buttonKinds,
  colorNames,
  textTypes,
  spinnerSizes,
  inputKinds,
} from '@/app-globals';

import { Button, ControlledInput, Text, Spinner, ControlledTextArea, ImageDropzone } from '@/components';

import { textAreaTypes } from '@/components/TextArea/constants';
import { getUser } from '@/ducks';

// import { useUpdateUser } from '@/hooks';
import { isValidEmail } from '@/utils/string';

import styles from './styles.module.scss';

function AccountInformation() {
  // const alert = useAlert();
  const user = useSelector((store) => getUser(store));
  const userType = 'buyer';

  const isUserUpdating = false;
  const isVerifyingPassword = false;
  const updateUser = () => {};
  // const {
  //   isUpdating: isUserUpdating,
  //   isVerifyingPassword,
  //   updateUser,
  // } = useUpdateUser();

  const validate = (values) => {
    const errors = {};

    if (!values.firstName) {
      errors.firstName = 'This field is required.';
    } else if (values.firstName.length > 50) {
      errors.firstName = 'The maximum length of this field is 50 characters.';
    } else if (values.firstName.length < 2) {
      errors.firstName = 'The minimum length of this field is two characters.';
    }

    if (!values.lastName) {
      errors.lastName = 'This field is required.';
    } else if (values.lastName.length > 50) {
      errors.lastName = 'The maximum length of this field is 50 characters.';
    } else if (values.lastName.length < 2) {
      errors.lastName = 'The minimum length of this field is two characters.';
    }

    if (!values.email) {
      errors.email = 'This field is required.';
    } else if (!isValidEmail(values.email)) {
      errors.email = 'This must be a valid email address.';
    } else if (values.email.length > 50) {
      errors.email = 'The maximum length of this field is 50 characters.';
    }

    if (!values.username) {
      errors.username = 'This field is required.';
    } else if (values.username.length > 50) {
      errors.username = 'The maximum length of this field is 50 characters.';
    } else if (values.username.length < 5) {
      errors.username = 'The minimum length of this field is five characters.';
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = 'This field is required.';
    }

    return errors;
  };

  return (
    <div className={styles.AccountInformation}>
      <Text
        className={styles.AccountInformation_title}
        type={textTypes.HEADING.SM}
      >
        My Account
      </Text>

      <Formik
        initialValues={{
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          mobileNumber: '',
          confirmPassword: '',
          description: '',

          // Buyer Only
          preferences: '',
          interests: '',

          // Seller only
          sellerName: '',
          governmentId: '',

        }}
        onSubmit={async (values, { setErrors }) => {
          const currentFormValues = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            // mobileNumber: values.mobileNumber,
            password: values.confirmPassword,
            // description: values.description,

            // Buyer Only
            // preferences: values.preferences,
            // interests: values.interests,

            // Seller only
            // sellerName: values.sellerName,
            // governmentId: values.governmentId,
          };

          const errors = validate(values);
          if (!isEmpty(errors)) {
            setErrors(errors);
            // return;
          }

          // const { responseCode: updateUserResponseCode, errors: updateErrors } =
          //   await updateUser(user.id, currentFormValues);

          // const updateUserCallbacks = {
          //   updated: () => {
          //     alert.success('Account updated successfully.');

          //     loginUpdate({
          //       ...user,
          //       ...currentFormValues,
          //     });
          //   },
          //   invalidFields: () => {
          //     alert.error('Invalid fields.');
          //     errors.email = updateErrors.email;
          //     errors.username = updateErrors.username;
          //     errors.confirmPassword = updateErrors.password;
          //     setErrors(errors);
          //   },
          //   internalError: () => alert.error('Oops, something went wrong.'),
          // };

          // switch (updateUserResponseCode) {
          //   case 200:
          //     updateUserCallbacks.updated();
          //     break;
          //   case 400:
          //     updateUserCallbacks.invalidFields();
          //     break;
          //   case 500:
          //     updateUserCallbacks.internalError();
          //     break;
          //   default:
          //     break;
          // }
        }}
      >
        {({ errors, values, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <ControlledInput
              className={styles.AccountInformation_input}
              error={errors.firstName}
              name="firstName"
              placeholder="First Name*"
              value={values.firstName}
              onChange={(e) => setFieldValue('firstName', e.target.value)}
            />

            <ControlledInput
              className={styles.AccountInformation_input}
              error={errors.lastName}
              name="lastName"
              placeholder="Last Name*"
              value={values.lastName}
              onChange={(e) => setFieldValue('lastName', e.target.value)}
            />

            { userType === 'seller' &&
              <ControlledInput
                className={styles.AccountInformation_input}
                error={errors.sellerName}
                name="sellerName"
                placeholder="Seller Name*"
                value={values.sellerName}
                onChange={(e) => setFieldValue('sellerName', e.target.value)}
              />
            }

            <ControlledInput
              className={styles.AccountInformation_input}
              error={errors.email}
              name="email"
              placeholder="Email Address*"
              value={values.email}
              onChange={(e) => setFieldValue('email', e.target.value)}
            />

            <ControlledInput
              className={styles.AccountInformation_input}
              error={errors.mobileNumber}
              name="mobileNumber"
              placeholder="Mobile Number*"
              value={values.email}
              onChange={(e) => setFieldValue('mobileNumber', e.target.value)}
            />

            { userType === 'buyer' &&
              <>
                <ControlledTextArea
                  className={styles.AccountInformation_input}
                  error={errors.preferences}
                  name="preferences"
                  placeholder="Souvenir preferences"
                  type={textAreaTypes.FORM}
                  value={values.preferences}
                  onChange={(e) => setFieldValue('preferences', e.target.value)}
                />

                <ControlledTextArea
                  className={styles.AccountInformation_input}
                  error={errors.interests}
                  name="interests"
                  placeholder="Personal interests"
                  type={textAreaTypes.FORM}
                  value={values.interests}
                  onChange={(e) => setFieldValue('interests', e.target.value)}
                />
              </>
            }

            { userType === 'seller' &&
              <ImageDropzone
                  className={styles.AccountInformation_input}
                  error={errors.governmentId}
                  text="Upload Government ID"
                  value={values.governmentId}
                  onChange={(image) => {
                    setFieldValue('governmentId', image);
                  }}
                />
            }

            <ControlledTextArea
              className={styles.AccountInformation_input}
              error={errors.description}
              name="description"
              placeholder={userType === 'buyer' ? 
                'Yourself (e.g. personality, likes, dislikes)' : 
                'What do you sell and why you want to be a seller?'}
              type={textAreaTypes.FORM}
              value={values.description}
              onChange={(e) => setFieldValue('description', e.target.value)}
            />

            <ControlledInput
              className={styles.AccountInformation_input}
              error={errors.confirmPassword}
              kind={inputKinds.PASSWORD}
              name="confirmPassword"
              placeholder="Confirm Password*"
              value={values.confirmPassword}
              onChange={(e) => setFieldValue('confirmPassword', e.target.value)}
            />

            <div className={styles.AccountInformation_buttonGroup}>
              <Button
                className={styles.AccountInformation_buttonGroup_updateButton}
                disabled={isUserUpdating}
                kind={buttonKinds.SUBMIT}
                onClick={() => {}}
              >
                <span
                  className={styles.AccountInformation_buttonGroup_buttonText}
                >
                  Update
                  {isVerifyingPassword && isUserUpdating && (
                    <Spinner
                      className={styles.AccountInformation_buttonGroup_spinner}
                      colorName={colorNames.WHITE}
                      size={spinnerSizes.XS}
                    />
                  )}
                </span>
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default AccountInformation;

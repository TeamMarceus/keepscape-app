import { Formik } from 'formik';
import { isEmpty } from 'lodash-es';

import { useSelector } from 'react-redux';

import { toast } from 'sonner';

import {
  buttonKinds,
  colorNames,
  textTypes,
  spinnerSizes,
  inputKinds,
  userTypes,
} from '@/app-globals';

import { 
  Button,
  ControlledInput, 
  Text, 
  Spinner, 
  ControlledTextArea 
} from '@/components';

import { textAreaTypes } from '@/components/TextArea/constants';
import { getUser } from '@/ducks';

import { actions as usersActions } from '@/ducks/reducers/users';
import { useUpdateUser } from '@/hooks';
import useActionDispatch from '@/hooks/useActionDispatch';

import { UsersService } from '@/services';

import styles from './styles.module.scss';

function AccountInformation() {
  const user = useSelector((store) => getUser(store));
  const loginUpdate = useActionDispatch(usersActions.loginActions.loginUpdate);

  const {
    isUpdating: isUserUpdating,
    updateAccount,
  } = useUpdateUser();

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

    if (!values.phoneNumber) {
      errors.phoneNumber = 'This field is required.';
    }

    if (!values.description) {
      errors.description = 'This field is required.';
    } else if (values.description.length > 500) {
      errors.description = 'The maximum length of this field is 500 characters.';
    } else if (values.description.length < 10) {
      errors.description = 'The minimum length of this field is 10 characters.';
    }

    // Seller only
    if (user.userType === userTypes.SELLER) {
      if (!values.sellerName) {
        errors.sellerName = 'This field is required.';
      } else if (values.sellerName.length > 50) {
        errors.sellerName = 'The maximum length of this field is 50 characters.';
      } else if (values.sellerName.length < 2) {
        errors.sellerName = 'The minimum length of this field is two characters.';
      }
    }

    // Buyer only
    if (user.userType === userTypes.BUYER) {
      if (!values.preferences) {
        errors.preferences = 'This field is required.';
      } else if (values.preferences.length > 500) {
        errors.preferences = 'The maximum length of this field is 500 characters.';
      } else if (values.preferences.length < 10) {
        errors.preferences = 'The minimum length of this field is 10 characters.';
      }

      if (!values.interests) {
        errors.interests = 'This field is required.';
      } else if (values.interests.length > 500) {
        errors.interests = 'The maximum length of this field is 500 characters.';
      } else if (values.interests.length < 10) {
        errors.interests = 'The minimum length of this field is 10 characters.';
      }
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
          phoneNumber: user.phoneNumber,
          description: user.description,
          
          // Buyer Only
          firstName: user.firstName,
          lastName: user.lastName,
          preferences: user.preferences,
          interests: user.interests,

          // Seller only
          sellerName: user.sellerName,

        }}
        onSubmit={async (values, { setErrors }) => {
          const buyerFormValues = {
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: values.phoneNumber,
            preferences: values.preferences,
            interests: values.interests,
            description: values.description,
          }

          const sellerFormValues = {
            sellerName: values.sellerName,
            phoneNumber: values.phoneNumber,
            description: values.description,
          }

          const errors = validate(values);
          if (!isEmpty(errors)) {
            setErrors(errors);
            return;
          }

          const userType = user.userType === userTypes.BUYER ? 'buyers' : 'sellers';
          const currentFormValues = user.userType === userTypes.BUYER ? buyerFormValues : sellerFormValues;

          const { responseCode: updateAccountResponseCode} =
            await updateAccount(userType, currentFormValues);

          const updateAccountCallbacks = {
            updated: async () => {
              toast.success('Account updated successfully.', {
                style: {
                  backgroundColor: '#48CFAD',
                  color: '#fff',
                },
              });

              loginUpdate({
                user: {
                  ...user,
                  ...currentFormValues,
                },
              });

              await UsersService.updateBuyerSuggestions();
            },
            invalidFields: () => {
              toast.error('Invalid fields.', {
                style: {
                  backgroundColor: '#ed5565',
                  color: '#fff',
                },
              });
              setErrors(errors);
            },
            internalError: () => {
              toast.error('Oops, something went wrong.', {
                style: {
                  backgroundColor: '#ed5565',
                  color: '#fff',
                },
              });
            },
          };

          switch (updateAccountResponseCode) {
            case 200:
              updateAccountCallbacks.updated();
              break;
            case 400:
              updateAccountCallbacks.invalidFields();
              break;
            case 500:
              updateAccountCallbacks.internalError();
              break;
            default:
              break;
          }
        }}
      >
        {({ errors, values, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            {user.userType === userTypes.BUYER && (
              <>
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
              </>
            )}

            { user.userType === userTypes.SELLER &&
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
              error={errors.phoneNumber}
              kind={inputKinds.NUMBER}
              name="phoneNumber"
              placeholder="Mobile Number*"
              value={values.phoneNumber}
              onChange={(e) => setFieldValue('phoneNumber', e.target.value)}
            />

            {user.userType === userTypes.BUYER &&
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

            <ControlledTextArea
              className={styles.AccountInformation_input}
              error={errors.description}
              name="description"
              placeholder={user.userType === userTypes.BUYER ? 
                'Yourself (e.g. personality, likes, dislikes)' : 
                'What do you sell and why you want to be a seller?'}
              type={textAreaTypes.FORM}
              value={values.description}
              onChange={(e) => setFieldValue('description', e.target.value)}
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
                  {isUserUpdating && (
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

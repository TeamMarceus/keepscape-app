
import { Formik } from 'formik';
import { isEmpty } from 'lodash-es';
import { useSelector } from 'react-redux';
// import { useAlert } from 'react-alert';

import {
  buttonKinds,
  colorNames,
  textTypes,
  spinnerSizes,
  inputKinds,
} from '@/app-globals';
import { Button, ControlledInput, Text, Spinner } from '@/components';
import { getUser } from '@/ducks';

// import { useUpdateUser } from '@/hooks';
import { isValidPassword } from '@/utils/string';

import styles from './styles.module.scss';

function ChangePassword() {
  // const alert = useAlert();

  const user = useSelector((store) => getUser(store));

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

    if (!values.oldPassword) {
      errors.oldPassword = 'This field is required.';
    }

    if (!values.newPassword) {
      errors.newPassword = 'This field is required.';
    } else if (!isValidPassword(values.newPassword)) {
      errors.newPassword =
        'Password must be at least 8 characters long and must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = 'This field is required.';
    } else if (values.confirmPassword !== values.newPassword) {
      errors.confirmPassword = 'This must match with your new password.';
    }

    return errors;
  };

  return (
    <div className={styles.ChangePassword}>
      <Text className={styles.ChangePassword_title} type={textTypes.HEADING.SM}>
        Change Password
      </Text>

      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        }}
        onSubmit={async (values, { setErrors, setFieldValue }) => {
          const currentFormValues = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            password: values.newPassword,
          };

          const errors = validate(values);
          if (!isEmpty(errors)) {
            setErrors(errors);
            // return;
          }

          // const { responseCode: updateUserResponseCode, errors: updateErrors } =
          //   await updateUser(user.id, currentFormValues, values.oldPassword);

          // const updateUserCallbacks = {
          //   updated: () => {
          //     alert.success('Account updated successfully.');

          //     loginUpdate({
          //       ...user,
          //       ...currentFormValues,
          //     });

          //     setFieldValue('oldPassword', '');
          //     setFieldValue('newPassword', '');
          //     setFieldValue('confirmPassword', '');
          //   },
          //   invalidFields: () => {
          //     alert.error('Invalid fields.');
          //     errors.oldPassword = updateErrors.password;
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
              className={styles.ChangePassword_input}
              error={errors.oldPassword}
              kind={inputKinds.PASSWORD}
              name="oldPassword"
              placeholder="Old Password*"
              value={values.oldPassword}
              onChange={(e) => setFieldValue('oldPassword', e.target.value)}
            />
            <ControlledInput
              className={styles.ChangePassword_input}
              error={errors.newPassword}
              kind={inputKinds.PASSWORD}
              name="newPassword"
              placeholder="New Password*"
              value={values.newPassword}
              onChange={(e) => setFieldValue('newPassword', e.target.value)}
            />

            <ControlledInput
              className={styles.ChangePassword_input}
              error={errors.confirmPassword}
              kind={inputKinds.PASSWORD}
              name="confirmPassword"
              placeholder="Confirm Password*"
              value={values.confirmPassword}
              onChange={(e) => setFieldValue('confirmPassword', e.target.value)}
            />

            <div className={styles.ChangePassword_buttonGroup}>
              <Button
                className={styles.ChangePassword_buttonGroup_updateButton}
                disabled={isUserUpdating}
                kind={buttonKinds.SUBMIT}
                onClick={() => {}}
              >
                <span className={styles.ChangePassword_buttonGroup_buttonText}>
                  Update
                  {isVerifyingPassword && isUserUpdating && (
                    <Spinner
                      className={styles.ChangePassword_buttonGroup_spinner}
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

export default ChangePassword;

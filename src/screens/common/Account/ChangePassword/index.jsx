
import { Formik } from 'formik';
import { isEmpty } from 'lodash-es';

import { toast } from 'sonner';

import {
  buttonKinds,
  colorNames,
  textTypes,
  spinnerSizes,
  inputKinds,
} from '@/app-globals';
import { Button, ControlledInput, Text, Spinner } from '@/components';

import { useUpdateUser } from '@/hooks';

import styles from './styles.module.scss';

function ChangePassword() {

  const {
    isUpdating: isUserUpdating,
    updatePassword,
  } = useUpdateUser();

  const validate = (values) => {
    const errors = {};

    if (!values.oldPassword) {
      errors.oldPassword = 'This field is required.';
    }

    if (!values.newPassword) {
      errors.newPassword = 'This field is required.';
    } else if (values.newPassword.length < 6) {
      errors.newPassword =
        'New Password must be at least 6 characters long.';
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
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
            confirmNewPassword: values.confirmPassword,
          };

          const errors = validate(values);
          if (!isEmpty(errors)) {
            setErrors(errors);
            return;
          }

          const { responseCode: updateUserResponseCode, errors: updateUserResponseErrors } =
            await updatePassword(currentFormValues);

          const updateUserCallbacks = {
            updated: () => {
              toast.success('Account updated successfully.', {
                style: {
                  backgroundColor: '#48CFAD',
                  color: '#fff',
                },
              });
            },
            invalidFields: () => {
              toast.error('Invalid fields.', {
                style: {
                  backgroundColor: '#ed5565',
                  color: '#fff',
                },
              });

              errors.newPassword = updateUserResponseErrors.newPassword;
              errors.oldPassword = updateUserResponseErrors.oldPassword;

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

          switch (updateUserResponseCode) {
            case 200:
              updateUserCallbacks.updated();
              break;
            case 400:
              updateUserCallbacks.invalidFields();
              break;
            case 500:
              updateUserCallbacks.internalError();
              break;
            default:
              break;
          }
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
                  {isUserUpdating && (
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

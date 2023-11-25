import React, { useState } from 'react';

import { Formik } from 'formik';
import { isEmpty } from 'lodash-es';
import { useSearchParams, useRouter } from 'next/navigation';

import {
  inputTypes,
  inputKinds,
  textTypes,
  buttonKinds,
  colorNames,
  spinnerSizes,
  buttonTypes,
  colorClasses,
} from '@/app-globals';
import {
  ControlledInput,
  Text,
  Button,
  Spinner,
  ButtonLink,
} from '@/components';

import { UsersService } from '@/services';

import styles from './styles.module.scss';

const validate = (values) => {
  const errors = {};

  if (!values.newPassword) {
    errors.newPassword = 'This field is required.';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'This field is required.';
  } else if (
    values.newPassword &&
    values.newPassword !== values.confirmPassword
  ) {
    errors.confirmPassword = 'This must match with your new password.';
  }

  return errors;
};

function ChangePassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const code = searchParams.get('code');

  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  return (
    <div className={styles.ChangePassword}>
      <div className={styles.ChangePassword_header}>
        <Text type={textTypes.HEADING.LG}>New Beginnings</Text>

        <Text type={textTypes.BODY.LG}>
          For security purposes, please enter your new password below
        </Text>
      </div>
      <Formik
        initialValues={{ newPassword: '', confirmPassword: '' }}
        onSubmit={async (values, { setErrors }) => {
          const errors = validate(values);
          if (!isEmpty(errors)) {
            setErrors(errors);
            return;
          }

          const userToBeUpdated = {
            code,
            email,
            newPassword: values.newPassword,
            confirmNewPassword: values.confirmPassword,
          };

          setIsUpdatingPassword(true);

          try {
            const { status: resetPasswordStatusCode } =
              await UsersService.resetPassword(userToBeUpdated);

            if (resetPasswordStatusCode === 200) {
              router.push('/forgot-password/success');
            }
          } catch (error) {
            const { status } = error.response;

            switch (status) {
              case 400:
                setIsUpdatingPassword(false);
                setErrors({
                  overall: 'Invalid input. Please try again.',
                });
                break;

              case 403:
                setIsUpdatingPassword(false);
                setErrors({
                  overall: 'The user is banned.',
                });
                break;

              case 401:
                setIsUpdatingPassword(false);
                setErrors({
                  overall: 'You are not authorized to perform this action.',
                });
                break;

              case 500:
                setIsUpdatingPassword(false);
                setErrors({
                  overall: 'Oops, something went wrong.',
                });
                break;
              default:
                break;
            }
          }
        }}
      >
        {({ errors, values, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <ControlledInput
              className={styles.ChangePassword_withMarginBottom}
              error={errors.newPassword}
              kind={inputKinds.PASSWORD}
              name="newPassword"
              placeholder="New Password"
              type={inputTypes.SLIM}
              value={values.newPassword}
              onChange={(e) => setFieldValue('newPassword', e.target.value)}
            />
            <ControlledInput
              error={errors.confirmPassword}
              kind={inputKinds.PASSWORD}
              name="confirmPassword"
              placeholder="Confirm Password"
              type={inputTypes.SLIM}
              value={values.confirmPassword}
              onChange={(e) => setFieldValue('confirmPassword', e.target.value)}
            />

            {errors.overall && (
              <Text
                className={styles.ChangePassword_withMarginTop}
                colorClass={colorClasses.RED['400']}
                type={textTypes.BODY.XS}
              >
                {errors.overall}
              </Text>
            )}

            <div className={styles.ChangePassword_content_buttonGroup}>
              <Button
                className={
                  styles.ChangePassword_content_buttonGroup_submitButton
                }
                disabled={isUpdatingPassword}
                kind={buttonKinds.SUBMIT}
                onClick={() => {}}
              >
                <span
                  className={
                    styles.ChangePassword_content_buttonGroup_buttonText
                  }
                >
                  Proceed
                  {isUpdatingPassword && (
                    <Spinner
                      className={
                        styles.ChangePassword_content_buttonGroup_spinner
                      }
                      colorName={colorNames.WHITE}
                      size={spinnerSizes.XS}
                    />
                  )}
                </span>
              </Button>

              <ButtonLink
                icon="arrow_back"
                to="/login"
                type={buttonTypes.TEXT.BLUE}
              >
                Back to Login
              </ButtonLink>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default ChangePassword;

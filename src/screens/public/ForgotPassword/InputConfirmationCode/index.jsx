import { useState } from 'react';

import { Formik } from 'formik';
import { isEmpty } from 'lodash-es';
import { useSearchParams, useRouter } from 'next/navigation';

import {
  buttonKinds,
  buttonTypes,
  colorClasses,
  colorNames,
  inputTypes,
  spinnerSizes,
  textTypes,

} from '@/app-globals';
import { 
  Button, 
  ButtonLink, 
  ControlledInput, 
  Spinner, 
  Text 
} from '@/components';

import { useInterval } from '@/hooks';
import { ConfirmationCodesService } from '@/services';

import styles from './styles.module.scss';




const RESEND_VERIFICATION_COOLDOWN = 30;

const validate = (values) => {
  const errors = {};

  if (!values.code) {
    errors.code = 'This field is required.';
  }

  return errors;
};

function InputConfirmationCode() {
  const router = useRouter();
  const searchParams  = useSearchParams();
  const email = searchParams.get('email');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const resendVerification = () => {
    setResendCooldown(RESEND_VERIFICATION_COOLDOWN);

    ConfirmationCodesService.acquire(email);
  };

  useInterval(() => {
    if (resendCooldown === 0) {
      return;
    }

    setResendCooldown(resendCooldown - 1);
  }, 1000);

  return (
    <div className={styles.InputConfirmationCode}>
      <div className={styles.InputConfirmationCode_header}>
      <Text type={textTypes.HEADING.LG} >
        Confirm your Email
      </Text>

      <Text type={textTypes.BODY.LG}>
        We've sent a confirmation code to your email. Input the code to proceed
      </Text>
      </div>

      <Formik
        initialValues={{ code: '' }}
        onSubmit={async (values, { setErrors }) => {
          const errors = validate(values);
          if (!isEmpty(errors)) {
            setErrors(errors);
            return;
          }

          setIsSubmitting(true);

          try {
            // Verify the confirmation code
            const {
              data: verifyConfirmationCodeData,
              status: verifyConfirmationCodeStatus,
            } = await ConfirmationCodesService.verify({
              email,
              confirmationCode: values.code,
            });

            if (verifyConfirmationCodeStatus === 200) {
              router.push(`/forgot-password/password?email=${email}&code=${verifyConfirmationCodeData}`);
            }
          } catch (error) {
            const {status} = error.response;

            switch (status) {
              case 400:
                setIsSubmitting(false);
                setErrors({
                  code: 'The code you inputted is an invalid code.',
                });
                break;

                case 404:
                  setIsSubmitting(false);
                  setErrors({
                    code: 'The user does not exist.',
                  });
                  break;

              case 500:
                setIsSubmitting(false);
                setErrors({
                  code: 'Oops, something went wrong.',
                });
                break;
              default:
                break;
            }
          }
        }}
      >
        {({ errors, values, handleSubmit, setFieldValue }) => (
          <form 
            className={styles.InputEmail_content} 
            onSubmit={handleSubmit}
          >
            <ControlledInput
              className={styles.InputConfirmationCode_withMarginBottom}
              error={errors.code}
              id="code"
              name="code"
              placeholder="Confirmation Code*"
              type={inputTypes.SLIM}
              value={values.code}
              onChange={(e) =>
                setFieldValue('code', e.target.value)
              }
            />

            {errors.overall && (
              <Text
                className={styles.InputConfirmationCode_withMarginTop}
                colorClass={colorClasses.BLUE['400']}
                type={textTypes.BODY.XS}
              >
                {errors.overall}
              </Text>
            )}

            <Button
              disabled={resendCooldown > 0}
              type={buttonTypes.TEXT.BLUE}
              onClick={resendVerification}
            >
              {resendCooldown > 0
                ? `Resend Verification (${resendCooldown}s)`
                : 'Resend Verification'}
            </Button>

            <div className={styles.InputConfirmationCode_content_buttonGroup}>
              <Button
                className={styles.InputConfirmationCode_content_buttonGroup_submitButton}
                disabled={isSubmitting}
                kind={buttonKinds.SUBMIT}
                onClick={() => {}}
              >
                <span
                  className={styles.InputConfirmationCode_content_buttonGroup_buttonText}
                >
                  Submit
                  {isSubmitting && (
                    <Spinner
                      className={styles.InputConfirmationCode_content_buttonGroup_spinner}
                      colorName={colorNames.WHITE}
                      size={spinnerSizes.XS}
                    />
                  )}
                </span>
              </Button>

              <ButtonLink
                icon='arrow_back'
                to='/login'
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

export default InputConfirmationCode;

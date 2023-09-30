import { useState } from 'react';

import { Formik } from 'formik';
import { isEmpty } from 'lodash-es';
import { useRouter } from 'next/navigation';

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

 import { ConfirmationCodesService } from '@/services';

import styles from './styles.module.scss';

const validate = (values) => {
  const errors = {};

  if (!values.emailAddress) {
    errors.emailAddress = 'This field is required.';
  }

  return errors;
};

function InputEmail() {
  const router = useRouter();
  const [isVerifying, toggleIsVerifying] = useState(false);

  return (
    <div className={styles.InputEmail}>
      <div className={styles.InputEmail_header}>
      <Text type={textTypes.HEADING.LG} >
        Just Checking
      </Text>

      <Text type={textTypes.BODY.LG}>
        For security purposes, we need your email address
      </Text>
      </div>

      <Formik
        initialValues={{ login: '' }}
        onSubmit={async (values, { setErrors }) => {
          const errors = validate(values);
          if (!isEmpty(errors)) {
            setErrors(errors);
            return;
          } 

          toggleIsVerifying(true);

          try {
            // Send confirmation code to user's email address
            // This API will also verify if the user exists
            const {
              status: sendConfirmationCodeResponseStatus,
            } = await ConfirmationCodesService.acquire(values.emailAddress);

            if (sendConfirmationCodeResponseStatus === 200) {
              router.push(`/forgot-password/code?email=${values.emailAddress}`);
            }
          } catch (error) {
            const {status} = error.response;

            switch (status) {
              case 400:
                toggleIsVerifying(false);
                setErrors({
                  emailAddress: 'Cannot generate confirmation code right now.',
                });
                break;

              case 404:
                toggleIsVerifying(false);
                setErrors({
                  emailAddress: 'The user does not exist.',
                });
                break;

              case 500:
                toggleIsVerifying(false);
                setErrors({
                  emailAddress: 'Oops, something went wrong.',
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
            onSubmit={handleSubmit}>
            <ControlledInput
              error={errors.emailAddress}
              name="emailAddress"
              placeholder="Email Address"
              type={inputTypes.SLIM}
              value={values.emailAddress}
              onChange={(e) => setFieldValue('emailAddress', e.target.value)}
            />

            {errors.overall && (
              <Text
                className={styles.InputEmail_withMarginTop}
                colorClass={colorClasses.RED['400']}
                type={textTypes.BODY.XS}
              >
                {errors.overall}
              </Text>
            )}

            <div className={styles.InputEmail_content_buttonGroup}>
              <Button
                className={styles.InputEmail_content_buttonGroup_proceedButton}
                disabled={isVerifying}
                kind={buttonKinds.SUBMIT}
                onClick={() => {}}
              >
                <span
                  className={styles.InputEmail_content_buttonGroup_buttonText}
                >
                  Proceed
                  {isVerifying && (
                    <Spinner
                      className={styles.InputEmail_content_buttonGroup_spinner}
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

export default InputEmail;

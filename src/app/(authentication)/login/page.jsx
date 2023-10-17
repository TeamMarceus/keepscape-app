'use client';

import React, { useState } from 'react';

import { Formik } from 'formik';
import { isEmpty } from 'lodash-es';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  buttonKinds,
  buttonTypes,
  colorClasses,
  colorNames,
  inputKinds,
  spinnerSizes,
  textTypes,
  userStatus,
} from '@/app-globals';

import {
  ControlledInput,
  Button,
  Spinner,
  Text,
  ButtonLink,
} from '@/components';

import { actions as usersActions } from '@/ducks/reducers/users';
import { useActionDispatch, useSubdomainRedirect } from '@/hooks';
import { TokensService, UsersService } from '@/services';

import styles from './styles.module.scss';

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'This field is required.';
  }

  if (!values.password) {
    errors.password = 'This field is required.';
  }

  return errors;
};

export default function LoginPage() {
  const router = useRouter();
  const { redirect } = useSubdomainRedirect();
  const loginUpdate = useActionDispatch(
    usersActions.loginActions.loginUpdate
  );


  const [isLoggingIn, setIsLoggingIn] = useState(false);

  return (
      <section className={styles.LoginPage}>
        <Text 
          className={styles.LoginPage_header}
          type={textTypes.HEADING.XL}
        >
          Welcome!
        </Text>
       
       
        <div className={styles.LoginPage_content}>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={async (values, { setErrors }) => {
              const currentFormValues = {
                email: values.email,
                password: values.password,
              };

              const errors = validate(values);
              if (!isEmpty(errors)) {
                setErrors(errors);
                return;
              }

              setIsLoggingIn(true);

              // LoginPage the user
              try {
                const { data: LoginPageResponse } = await UsersService.login(
                  currentFormValues
                );

                // Call the Acquire Tokens endpoint to set the tokens
                const { data: acquireResponse } = await TokensService.acquire({
                  email: currentFormValues.email,
                  password: currentFormValues.password,
                });

                // Update login
                loginUpdate({
                  user: LoginPageResponse,
                  access_token: acquireResponse.accessToken,
                  refresh_token: acquireResponse.refreshToken,
                });

                // Redirect the user
                redirect(
                  LoginPageResponse, 
                  acquireResponse.accessToken, 
                  acquireResponse.refreshToken
                );                
              } catch (error) {
                setIsLoggingIn(false);
                const { status } = error.response;
                const { data } = error.response;
     
                switch (status) {
                  case 400:
                    setIsLoggingIn(false);
                    if (data.userStatus === userStatus.PENDING) {
                      router.push('/seller-application?status=Pending');
                    } else if (data.userStatus === userStatus.REJECTED) {
                      router.push('/seller-application?status=Rejected');
                    } else if (data.userStatus === userStatus.BANNED) {
                      router.push('/seller-application?status=Banned');
                    } else {
                      setErrors({
                        overall: 'Invalid email and/or password.',
                      });
                    }
                    break;

                  case 500:
                    setIsLoggingIn(false);
                    setErrors({
                      overall: 'Oops, something went wrong.',
                    });
                    break;
                  default:
                    break;
                }
                setIsLoggingIn(false);
              }
            }}
          >
            {({ errors, values, handleSubmit, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                <ControlledInput
                  className={styles.LoginPage_content_input}
                  error={errors.email}
                  name="email"
                  placeholder="Email Address"
                  value={values.email}
                  onChange={(e) => setFieldValue('email', e.target.value)}
                />
                <ControlledInput
                  className={styles.LoginPage_content_input}
                  error={errors.password}
                  kind={inputKinds.PASSWORD}
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={(e) => setFieldValue('password', e.target.value)}
                />
                {errors.overall && (
                  <Text
                    className={styles.LoginPage_content_input_errorMessage}
                    colorClass={colorClasses.RED['400']}
                    type={textTypes.BODY.XS}
                  >
                    {errors.overall}
                  </Text>
                )}

                <Button
                  className={styles.LoginPage_content_loginButton}
                  disabled={isLoggingIn}
                  kind={buttonKinds.SUBMIT}
                  onClick={() => {}}
                >
                  <span
                    className={styles.LoginPage_content_loginButton_buttonText}
                  >
                    login
                    {isLoggingIn && (
                      <Spinner
                        className={styles.LoginPage_content_loginButton_spinner}
                        colorName={colorNames.WHITE}
                        size={spinnerSizes.XS}
                      />
                    )}
                  </span>
                </Button>

                <div className={styles.LoginPage_content_textLink}>
                  <ButtonLink
                    className={styles.LoginPage_content_forgotPassword}
                    to="/forgot-password/email"
                    type={buttonTypes.TEXT.BLUE}
                  >
                    Forgot Password?
                  </ButtonLink>


                  <Text>
                    Don't have an account?{' '}
                    <Link
                      className={styles.LoginPage_content_textLink_signUp}
                      href="/signup"
                      onClick={isLoggingIn ? (e) => e.preventDefault() : () => {}}
                    >
                      Sign Up
                    </Link>
                  </Text>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </section>
  );
}

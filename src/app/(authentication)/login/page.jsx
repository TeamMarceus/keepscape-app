'use client';

import React, { useState } from 'react';

import { Formik } from 'formik';
import { isEmpty } from 'lodash-es';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import {
  buttonKinds,
  buttonTypes,
  colorClasses,
  colorNames,
  inputKinds,
  spinnerSizes,
  textTypes,
} from '@/app-globals';

import {
  ControlledInput,
  Button,
  Spinner,
  Text,
  ButtonLink,
} from '@/components';

import { getGeneralQuestions, getNewQuestions, getSuggestions } from '@/ducks';
import { actions as questionsAction } from '@/ducks/reducers/questions';
import { actions as productsActions } from '@/ducks/reducers/suggestions';
import { actions as usersActions } from '@/ducks/reducers/users';
import { useActionDispatch, useSubdomainRedirect } from '@/hooks';
import { TokensService, QuestionnairesService, UsersService } from '@/services';

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
  const { redirect } = useSubdomainRedirect();
  const loginUpdate = useActionDispatch(
    usersActions.loginActions.loginUpdate
  );

  const productsRestart = useActionDispatch(
    productsActions.productActions.productRestart
  );

  const questionsRestart = useActionDispatch(
    questionsAction.questionActions.questionRestart
  );

  const generalQuestions = useSelector((store) => getGeneralQuestions(store));
  const newQuestions = useSelector((store) => getNewQuestions(store));
  const suggestions = useSelector((store) => getSuggestions(store));

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

                // Create questionnaire and suggestions if they exist in the store
                if (generalQuestions.length !== 0 &&
                    newQuestions.length !== 0 &&
                    suggestions.length !== 0) {

                  // Create the questionnaire with the recipient's name
                  const { data: questionnaireDataResponse } =
                    await QuestionnairesService.create(generalQuestions[0].answer);

                  // Update the suggestions with the questionnaire's guid
                  await QuestionnairesService.updateSuggestions(questionnaireDataResponse.guid, suggestions);

                  // Restart the products and questions store
                  productsRestart();
                  questionsRestart();
                }

                // Redirect the user
                redirect(
                  LoginPageResponse, 
                  acquireResponse.accessToken, 
                  acquireResponse.refreshToken
                );                
              } catch (error) {
                setIsLoggingIn(false);
                const {status} = error.response;

                switch (status) {
                  case 400:
                    setIsLoggingIn(false);
                    setErrors({
                      overall: 'Invalid email and/or password.',
                    });
                    break;
                  case 401:
                    setIsLoggingIn(false);
                    setErrors({
                      overall: 'Oops, something went wrong.',
                    });
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

'use client';

import React, { useState } from 'react';

import { Formik } from 'formik';
import { isEmpty } from 'lodash-es';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import {
  buttonKinds,
  colorNames,
  inputKinds,
  spinnerSizes,
  textTypes,
} from '@/app-globals';
import {
  ControlledInput,
  Button,
  Grid,
  Spinner,
  Text,
  ControlledTextArea,
} from '@/components';

import { textAreaTypes } from '@/components/TextArea/constants';
import { actions as usersActions } from '@/ducks/reducers/users';
import { useActionDispatch, useSubdomainRedirect } from '@/hooks';
import { TokensService, UsersService } from '@/services';
import { isValidEmail } from '@/utils/string';


import styles from './styles.module.scss';

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
    errors.lastName = 'This field can have at most 50 characters.';
  } else if (values.lastName.length < 2) {
    errors.lastName = 'This field can have at least 2 characters.';
  }

  if (!values.email) {
    errors.email = 'This field is required.';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'This must be a valid email address.';
  } 

  if (!values.phoneNumber) {
    errors.phoneNumber = 'This field is required.';
  }

  if (!values.preferences) {
    errors.preferences = 'This field is required.';
  }

  if (!values.interests) {
    errors.interests = 'This field is required.';
  }

  if (!values.description) {
    errors.description = 'This field is required.';
  }

  if (!values.password) {
    errors.password = 'This field is required.';
  } else if (values.password.length > 20) {
    errors.password = 'This field can have at most 20 characters.';
  } else if (values.password.length < 6) {
    errors.password = 'This field can have at least 6 characters.';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'This field is required.';
  } else if (values.password && values.password !== values.confirmPassword) {
    errors.confirmPassword = 'This must match with your password.';
  }

  return errors;
};

export default function BuyerSignUpPage() {
  const { redirect } = useSubdomainRedirect();
  const loginUpdate = useActionDispatch(usersActions.loginActions.loginUpdate);

  const [isSigningUp, setIsSigningUp] = useState(false);


  return (
    <section className={styles.BuyerSignUpPage}>
        <Text 
          className={styles.BuyerSignUpPage_header}
          type={textTypes.HEADING.MD}
        >
          Enter your account details
        </Text>

      <div className={styles.BuyerSignUpPage_content}>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            preferences: '',
            interests: '',
            description: '',
          }}
          onSubmit={async (values, { setErrors }) => {
            const currentFormValues = {
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              password: values.password,
              confirmPassword: values.confirmPassword,
              phoneNumber: values.phoneNumber,
              preferences: values.preferences,
              interests: values.interests,
              description: values.description,
            };

            const errors = validate(values);
            if (!isEmpty(errors)) {
              setErrors(errors);
              return;
            }

            setIsSigningUp(true);

            // Sign up the buyer
            try {
              const { data: signUpResponse } = await UsersService.signupBuyer(
                currentFormValues
              );

              // If the creation of the user is successful
              // then we need to log the user in

             // Call the Acquire Tokens endpoint to set the tokens
             const { data: acquireResponse } = await TokensService.acquire({
              email: currentFormValues.email,
              password: currentFormValues.password,
            });

            // Update login
            loginUpdate({
              user: signUpResponse,
              access_token: acquireResponse.accessToken,
              refresh_token: acquireResponse.refreshToken,
            });

             // Redirect the buyer
             redirect(
              signUpResponse, 
              acquireResponse.accessToken, 
              acquireResponse.refreshToken);

            } catch (error) {
              setIsSigningUp(false);
              const responseData = error.response.data;

              if (responseData.includes('Email')) {
                setErrors({
                  email: 'Email is already taken.',
                });

                setIsSigningUp(false);
              }

              const {status} = error.response;
              const dataErrors = responseData.errors;

              switch (status) {
                case 400:
                  if (dataErrors.Email) {
                    setErrors({
                      email: dataErrors.email,
                    });
                  }

                  if (dataErrors.Password) {
                    setErrors({
                      password: dataErrors.Password,
                    });
                  }
                  break;
                
                case 401:
                  setIsSigningUp(false);
                  setErrors({
                    overall: 'Oops, something went wrong.',
                  });
                  break;

                case 500:
                  setErrors({
                    overall: 'Oops, something went wrong.',
                  });
                  break;
                default:
                  break;
              }

              setIsSigningUp(false);
            }
          }}
        >
          {({ errors, values, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <Grid>
                <ControlledInput
                  error={errors.firstName}
                  name="firstName"
                  placeholder="First Name*"
                  value={values.firstName}
                  onChange={(e) => setFieldValue('firstName', e.target.value)}
                />

                <ControlledInput
                  error={errors.lastName}
                  name="lastName"
                  placeholder="Last Name*"
                  value={values.lastName}
                  onChange={(e) => setFieldValue('lastName', e.target.value)}
                />
              </Grid>

              <ControlledInput
                className={styles.BuyerSignUpPage_content_withMargin}
                error={errors.email}
                name="email"
                placeholder="Email Address*"
                value={values.email}
                onChange={(e) => setFieldValue('email', e.target.value)}
              />

              <ControlledInput
                className={styles.BuyerSignUpPage_content_withMargin}
                error={errors.phoneNumber}
                kind={inputKinds.NUMBER}
                name="phoneNumber"
                placeholder="Mobile Number*"
                value={values.phoneNumber}
                onChange={(e) => setFieldValue('phoneNumber', e.target.value)}
              />

              <Text 
                className={styles.BuyerSignUpPage_content_personalized}
                type={textTypes.HEADING.XXXS}
              >
                To create a personalized experience, tell us about:
              </Text>

              <ControlledTextArea
                error={errors.preferences}
                inputClassName={styles.BuyerSignUpPage_content_withMargin}
                name="preferences"
                placeholder="Your souvenir preferences"
                type={textAreaTypes.FORM}
                value={values.preferences}
                onChange={(e) => setFieldValue('preferences', e.target.value)}
              />

              <ControlledTextArea
                error={errors.interests}
                inputClassName={styles.BuyerSignUpPage_content_withMargin}
                name="interests"
                placeholder="Your personal interests"
                type={textAreaTypes.FORM}
                value={values.interests}
                onChange={(e) => setFieldValue('interests', e.target.value)}
              />

              <ControlledTextArea
                error={errors.description}
                inputClassName={styles.BuyerSignUpPage_content_withMargin}
                name="description"
                placeholder="Yourself (e.g. personality, likes, dislikes)"
                type={textAreaTypes.FORM}
                value={values.description}
                onChange={(e) => setFieldValue('description', e.target.value)}
              />

              <Grid className={styles.BuyerSignUpPage_content_withMargin}>
                <ControlledInput
                  error={errors.password}
                  kind={inputKinds.PASSWORD}
                  name="password"
                  placeholder="Password*"
                  value={values.password}
                  onChange={(e) => setFieldValue('password', e.target.value)}
                />
                <ControlledInput
                  error={errors.confirmPassword}
                  kind={inputKinds.PASSWORD}
                  name="confirmPassword"
                  placeholder="Confirm Password*"
                  value={values.confirmPassword}
                  onChange={(e) =>
                    setFieldValue('confirmPassword', e.target.value)
                  }
                />
              </Grid>

              <div className={styles.BuyerSignUpPage_content_buttonGroup}>
                <Button
                  className={styles.BuyerSignUpPage_content_signupButton}
                  disabled={isSigningUp}
                  kind={buttonKinds.SUBMIT}
                  onClick={() => {}}
                >
                  <span
                    className={styles.BuyerSignUpPage_content_buttonGroup_buttonText}
                  >
                    Sign Up
                    {isSigningUp && (
                      <Spinner
                        className={styles.BuyerSignUpPage_content_buttonGroup_spinner}
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

      <div className={styles.BuyerSignUpPage_footer}>
        <Text>
          Already have an account?{' '}
          <Link
            className={styles.BuyerSignUpPage_footer_signIn}
            href="/login"
            onClick={isSigningUp ? (e) => e.preventDefault() : () => {}}
          >
            Sign In
          </Link>
        </Text>
      </div>
    </section>
  );
}
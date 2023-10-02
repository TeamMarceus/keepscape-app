import React, { useState } from 'react';

import { Formik } from 'formik';

import { isEmpty } from 'lodash-es';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import ShoppingCart from '%/images/Misc/shopping-cart.png'
import { buttonKinds, buttonTypes, colorClasses, colorNames, inputKinds, spinnerSizes, textTypes } from '@/app-globals';
import { Button, ButtonLink, ControlledInput, Spinner, Text } from '@/components';
import { actions as usersActions } from '@/ducks/reducers/users';
import { useActionDispatch } from '@/hooks';

import styles from './styles.module.scss';

const validate = (values) => {
  const errors = {};

  if (!values.fullName) {
    errors.fullName = 'This field is required.';
  }

  if (!values.fullAddress) {
    errors.fullAddress = 'This field is required.';
  }

  return errors;
};

function Delivery() {
  const router = useRouter();

  const loginUpdate = useActionDispatch(
    usersActions.loginActions.loginUpdate
  );

  const [isSaving, setIsSaving] = useState(false);

  return (
    <div className={styles.Delivery}>
      <Image
        alt="Shopping Cart"
        height={180}
        src={ShoppingCart}
        width={180}
      />

      <Text 
        className={styles.Delivery_header}
        type={textTypes.HEADING.MD}
      >
        Enter your delivery details
      </Text>
   
   
    <div className={styles.Delivery_content}>
      <Formik
        initialValues={{
          fullName: '',
          fullAddress: '',
          altMobileNumber: '',
        }}
        onSubmit={async (values, { setErrors }) => {
          const currentFormValues = {
            fullName: values.fullName,
            fullAddress: values.fullAddress,
            altMobileNumber: values.altMobileNumber,
          };

          const errors = validate(values);
          if (!isEmpty(errors)) {
            setErrors(errors);
            return;
          }

          setIsSaving(true);

          // Add api call here

          loginUpdate({
            delivery_details: currentFormValues,
          })
        
          router.push('/buyer/checkout');

          setIsSaving(false);
        }}
      >
        {({ errors, values, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <ControlledInput
              className={styles.Delivery_content_input}
              error={errors.fullName}
              name="fullName"
              placeholder="Full Name"
              value={values.fullName}
              onChange={(e) => setFieldValue('fullName', e.target.value)}
            />

            <ControlledInput
              className={styles.Delivery_content_input}
              error={errors.fullAddress}
              name="fullAddress"
              placeholder="Full Address"
              value={values.fullAddress}
              onChange={(e) => setFieldValue('fullAddress', e.target.value)}
            />

            <ControlledInput
              className={styles.Delivery_content_input}
              error={errors.altMobileNumber}
              kind={inputKinds.NUMBER}
              name="altMobileNumber"
              placeholder="Alternaive Mobile Number (Optional)"
              value={values.altMobileNumber}
              onChange={(e) => setFieldValue('altMobileNumber', e.target.value)}
            />
           
            {errors.overall && (
              <Text
                className={styles.Delivery_content_input_errorMessage}
                colorClass={colorClasses.RED['400']}
                type={textTypes.BODY.XS}
              >
                {errors.overall}
              </Text>
            )}

            <Button
              className={styles.Delivery_content_saveButton}
              disabled={isSaving}
              kind={buttonKinds.SUBMIT}
              onClick={() => {}}
            >
              <span
                className={styles.Delivery_content_saveButton_buttonText}
              >
                Save
                {isSaving && (
                  <Spinner
                    className={styles.Delivery_content_saveButton_spinner}
                    colorName={colorNames.WHITE}
                    size={spinnerSizes.XS}
                  />
                )}
              </span>
            </Button>

            <ButtonLink
              icon='arrow_back'
              to='/buyer/cart'
              type={buttonTypes.TEXT.BLUE}
            >
              Back to Cart
            </ButtonLink>
          </form>
        )}
      </Formik>
    </div>
  </div>
  )
}

export default Delivery;

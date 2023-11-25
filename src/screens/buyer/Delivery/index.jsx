import React, { useState } from 'react';

import { Formik } from 'formik';

import { isEmpty } from 'lodash-es';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useSelector } from 'react-redux';

import { toast } from 'sonner';

import ShoppingCart from '%/images/Misc/shopping-cart.png';
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
  Button,
  ButtonLink,
  ControlledInput,
  Spinner,
  Text,
} from '@/components';

import { getUser } from '@/ducks';
import { actions as usersActions } from '@/ducks/reducers/users';
import { useActionDispatch, useUpdateUser } from '@/hooks';

import styles from './styles.module.scss';

const validate = (values) => {
  const errors = {};

  if (!values.deliveryFullName) {
    errors.deliveryFullName = 'This field is required.';
  }

  if (!values.deliveryAddress) {
    errors.deliveryAddress = 'This field is required.';
  }

  return errors;
};

function Delivery() {
  const router = useRouter();

  const user = useSelector((store) => getUser(store));

  const loginUpdate = useActionDispatch(usersActions.loginActions.loginUpdate);

  const { isUpdating: isSaving, updateAccount } = useUpdateUser();

  return (
    <div className={styles.Delivery}>
      <Image alt="Shopping Cart" height={180} src={ShoppingCart} width={180} />

      <Text className={styles.Delivery_header} type={textTypes.HEADING.MD}>
        Enter your delivery details
      </Text>

      <div className={styles.Delivery_content}>
        <Formik
          initialValues={{
            deliveryFullName: user.deliveryFullName,
            deliveryAddress: user.deliveryAddress,
            altMobileNumber: user.altMobileNumber,
          }}
          onSubmit={async (values, { setErrors }) => {
            const currentFormValues = {
              deliveryFullName: values.deliveryFullName,
              deliveryAddress: values.deliveryAddress,
              altMobileNumber: values.altMobileNumber
                ? values.altMobileNumber
                : null,
            };

            const errors = validate(values);
            if (!isEmpty(errors)) {
              setErrors(errors);
              return;
            }

            const { responseCode: updateAccountResponseCode } =
              await updateAccount('buyers', currentFormValues);

            const updateAccountCallbacks = {
              updated: () => {
                toast.success('Delivery details updated.', {
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

                router.push('/buyer/checkout');
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
              <ControlledInput
                className={styles.Delivery_content_input}
                error={errors.deliveryFullName}
                name="deliveryFullName"
                placeholder="Full Name"
                value={values.deliveryFullName}
                onChange={(e) =>
                  setFieldValue('deliveryFullName', e.target.value)
                }
              />

              <ControlledInput
                className={styles.Delivery_content_input}
                error={errors.deliveryAddress}
                name="deliveryAddress"
                placeholder="Full Address"
                value={values.deliveryAddress}
                onChange={(e) =>
                  setFieldValue('deliveryAddress', e.target.value)
                }
              />

              <ControlledInput
                className={styles.Delivery_content_input}
                error={errors.altMobileNumber}
                kind={inputKinds.NUMBER}
                name="altMobileNumber"
                placeholder="Alternaive Mobile Number (Optional)"
                value={values.altMobileNumber}
                onChange={(e) =>
                  setFieldValue('altMobileNumber', e.target.value)
                }
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
                <span className={styles.Delivery_content_saveButton_buttonText}>
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
                icon="arrow_back"
                to="/buyer/cart"
                type={buttonTypes.TEXT.BLUE}
              >
                Back to Cart
              </ButtonLink>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Delivery;

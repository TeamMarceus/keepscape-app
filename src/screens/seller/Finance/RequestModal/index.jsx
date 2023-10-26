import React from 'react';

import { Formik } from 'formik';
import { isEmpty } from 'lodash-es';
import PropTypes from 'prop-types';

import { toast } from 'sonner';

import { buttonKinds, colorNames, inputKinds, modalPositions, modalSizes, spinnerSizes } from '@/app-globals';
import { Button, ControlledInput, ControlledSelect, ControlledTextArea, ImageDropzone, Modal, Spinner } from '@/components';

import { textAreaTypes } from '@/components/TextArea/constants';
import { useRequestWithdraw } from '@/hooks';

import styles from './styles.module.scss';

function RequestModal({
  currentBalance,
  isOpen,
  handleClose,
  title,
  paymentMethod, 
  setBalanceAmount,
}) {
  const validate = (values) => {  
    const errors = {};
  
    if (!values.amount) {
      errors.amount = 'This field is required.';
    } else if (values.amount > currentBalance) {
      errors.amount = 'Amount is greater than current balance.';
    }
  
    if (paymentMethod === 'Gcash' || paymentMethod === 'Maya') {
      if (!values.accountName) {
        errors.accountName = 'This field is required.';
      }

      if (!values.accountNumber) {
        errors.accountNumber = 'This field is required.';
      }

      if (isEmpty(values.qrImage)) {
        errors.qrImage = 'Image is required.';
      }
    }

    if (paymentMethod === 'Paypal') {
      if (!values.email) {
        errors.email = 'This field is required.';
      }
    }

    if (paymentMethod === 'BankTransfer') {
      if (!values.bank) {
        errors.bank = 'This field is required.';
      }

      if (!values.accountNumber) {
        errors.accountNumber = 'This field is required.';
      }

      if (!values.qrCode) {
        errors.qrCode = 'This field is required.';
      }
    }
  
    return errors;
  };

  const {
    isRequesting,
    requestWithdraw,
  } = useRequestWithdraw();

  return (
    <Modal
      className={styles.RequestModal}
      handleClose={handleClose}
      isOpen={isOpen}
      position={modalPositions.CENTER}
      size={modalSizes.SM}
      title={title}
    >
      <Formik
        initialValues={{
          amount: '',
          accountName: '',
          accountNumber: '',
          qrImage: '',
          email: '',
          bank: '',
          qrCode: '',
          remarks: '',
        }}
        onSubmit={async (values, { setErrors, setFieldValue }) => {
          const gcashMayaFormValues = {
            amount: values.amount,
            paymentMethod,
            paymentDetails: `Account Name: ${values.accountName}, Account Number: ${values.accountNumber}`,
            paymentProfileImage : values.qrImage,
            remarks: values.remarks,
          };

          const paypalFormValues = {
            amount: values.amount,
            paymentMethod,
            paymentDetails: `Email: ${values.email}`,
            remarks: values.remarks,
          };

          const bankTransferFormValues = {
            amount: values.amount,
            paymentMethod,
            paymentDetails: `Bank: ${values.bank.value}, Account Number: ${values.accountNumber}, QR Code: ${values.qrCode}`,
            remarks: values.remarks,
          };

          const errors = validate(values);
          if (!isEmpty(errors)) {
            setErrors(errors);
            return;
          }

          let requestFormValue;

          if (paymentMethod === 'Gcash' || paymentMethod === 'Maya') {
            requestFormValue = gcashMayaFormValues;
          } else if (paymentMethod === 'Paypal') {
            requestFormValue = paypalFormValues;
          } else if (paymentMethod === 'BankTransfer') {
            requestFormValue = bankTransferFormValues;
          }

          const { responseCode: requestWithdrawResponseCode } = await requestWithdraw(requestFormValue);

            const requestWithdrawCallbacks = {
              created: () => {
                toast.success('Withdrawal successfully requested.', {
                  style: {
                    backgroundColor: '#48CFAD',
                    color: '#fff',
                  },
                });

                setBalanceAmount(currentBalance - values.amount);

                // Reset form values
                setFieldValue('amount', '');
                setFieldValue('accountName', '');
                setFieldValue('accountNumber', '');
                setFieldValue('qrImage', '');
                setFieldValue('email', '');
                setFieldValue('bank', '');
                setFieldValue('qrCode', '');          
                setFieldValue('remarks', '');      
              },
              invalidFields: () => {
                toast.error('Invalid fields.', {
                  style: {
                    backgroundColor: '#ed5565',
                    color: '#fff',
                  },
                });
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

            switch (requestWithdrawResponseCode) {
              case 200:
                requestWithdrawCallbacks.created();
                break;
              case 400:
                requestWithdrawCallbacks.invalidFields();
                break;
              case 401:
                requestWithdrawCallbacks.internalError();
                break;
              case 415:
                requestWithdrawCallbacks.internalError();
                break;
              case 500:
                requestWithdrawCallbacks.internalError();
                break;
              default:
                break;
            }
        }}
      >
        {({ errors, values, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <ControlledInput
              className={styles.RequestModal_content_input}
              error={errors.amount}
              kind={inputKinds.NUMBER}
              name="amount"
              placeholder="Amount*"
              value={values.amount}
              onChange={(e) => setFieldValue('amount', e.target.value)}
            />
            
            {(paymentMethod === 'Gcash' || paymentMethod === 'Maya') && (
              <>
                <ControlledInput
                  className={styles.RequestModal_withMargin}
                  error={errors.accountName}
                  name="accountName"
                  placeholder="Account Name*"
                  value={values.accountName}
                  onChange={(e) => setFieldValue('accountName', e.target.value)}
                />

                <ControlledInput
                  className={styles.RequestModal_withMargin}
                  error={errors.accountNumber}
                  name="accountNumber"
                  placeholder="Account Number*"
                  value={values.accountNumber}
                  onChange={(e) => setFieldValue('accountNumber', e.target.value)}
                />
    
                <ImageDropzone
                  className={styles.RequestModal_withMargin}
                  error={errors.qrImage}
                  text="Upload QR Image" 
                  value={values.qrImage}
                  onChange={(image) => {
                    setFieldValue('qrImage', image);
                  }}
                />
              </>
            )}

            {paymentMethod === 'Paypal'  && (
              <ControlledInput
                className={styles.RequestModal_withMargin}
                error={errors.email}
                name="email"
                placeholder="Email*"
                value={values.email}
                onChange={(e) => setFieldValue('email', e.target.value)}
              />
            )}

            {paymentMethod === 'BankTransfer' && (
              <>
               <ControlledSelect
                  className={styles.RequestModal_withMargin}
                  error={errors.bank}
                  name="bank"
                  options={[
                    {
                      label: 'BDO',
                      value: 'BDO', 
                    },
                    {
                      label: 'BPI',
                      value: 'BPI',
                    },
                    {
                      label: 'LandBank',
                      value: 'LandBank',
                    },
                  ]}
                  placeholder="Choose a Bank*"
                  value={values.bank}
                  onChange={(val) => setFieldValue('bank', val)}
                />

                <ControlledInput
                  className={styles.RequestModal_withMargin}
                  error={errors.accountNumber}
                  name="accountNumber"
                  placeholder="Account Number*"
                  value={values.accountNumber}
                  onChange={(e) => setFieldValue('accountNumber', e.target.value)}
                />

                <ControlledInput
                  className={styles.RequestModal_withMargin}
                  error={errors.qrCode}
                  name="qrCode"
                  placeholder="QR Code*"
                  value={values.qrCode}
                  onChange={(e) => setFieldValue('qrCode', e.target.value)}
                />
    
              </>
            )}

            <ControlledTextArea
              error={errors.remarks}
              inputClassName={styles.RequestModal_withMargin}
              name="remarks"
              placeholder="Your remarks"
              type={textAreaTypes.FORM}
              value={values.remarks}
              onChange={(e) => setFieldValue('remarks', e.target.value)}
            />

            <Button
              className={styles.RequestModal_button}
              disabled={isRequesting}
              kind={buttonKinds.SUBMIT}
              onClick={() => {}}
            >
              <span
                className={styles.RequestModal_button_buttonText}
              >
                Withdraw
                {isRequesting && (
                  <Spinner
                    className={styles.RequestModal_button_spinner}
                    colorName={colorNames.WHITE}
                    size={spinnerSizes.XS}
                  />
                )}
              </span>
            </Button>
          </form>
        )}
      </Formik>
    </Modal>
  );
}

RequestModal.propTypes = {
  currentBalance: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  paymentMethod: PropTypes.string.isRequired,
  setBalanceAmount: PropTypes.func.isRequired,
}

export default RequestModal;

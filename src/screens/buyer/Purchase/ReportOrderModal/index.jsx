import React, { useState } from 'react';

import { Formik } from 'formik';
import { isEmpty } from 'lodash-es';
import PropTypes from 'prop-types';

import { 
  buttonKinds, 
  colorNames, 
  modalPositions, 
  modalSizes, 
  spinnerSizes 
} from '@/app-globals';

import { 
  Button, 
  ControlledTextArea, 
  Modal, 
  Spinner
} from '@/components';

import { textAreaTypes } from '@/components/TextArea/constants';


import { useReportOrder } from '@/hooks';
import { toastError, toastSuccess } from '@/utils/toasts';

import styles from './styles.module.scss';

const validate = (values) => {  
  const errors = {};

  if (!values.reason) {
    errors.reason = 'This field is required.';
  }

  return errors;
};

function ReportOrderModal({
  isOpen,
  handleClose,
  title,
  orderId
}) {
  const { isLoading: isSubmitting, reportOrder } = useReportOrder();

  return (
    <Modal
      className={styles.ReportOrderModal}
      handleClose={handleClose}
      isOpen={isOpen}
      position={modalPositions.CENTER}
      size={modalSizes.SM}
      title={title}
    >
      <Formik
        initialValues={{
          reason: '',
        }}
        onSubmit={async (values, { setErrors }) => {
          const currentFormValues = {
            reason: values.reason,
          };

          const errors = validate(values);
          if (!isEmpty(errors)) {
            setErrors(errors);
            return;
          }

           const { responseCode: reportOrderResponseCode } = await reportOrder(orderId, currentFormValues);

            const reportOrderCallbacks = {
              created: () => {
                toastSuccess('Order successfully reported.');
              
                handleClose();
              },
              invalidFields: () => {
                toastError('Invalid fields.');
              },
              internalError: () => {
                toastError('Oops, something went wrong.');
              },
            };

            switch (reportOrderResponseCode) {
              case 200:
                reportOrderCallbacks.created();
                break;
              case 400:
                reportOrderCallbacks.invalidFields();
                break;
              case 401:
                reportOrderCallbacks.internalError();
                break;
              case 500:
                reportOrderCallbacks.internalError();
                break;
              default:
                break;
            }
        }}
      >
        {({ errors, values, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <ControlledTextArea
              error={errors.reason}
              inputClassName={styles.ReportOrderModal_textArea}
              name="reason"
              placeholder="Please describe the problem you encountered here."
              type={textAreaTypes.FORM}
              value={values.reason}
              onChange={(e) => setFieldValue('reason', e.target.value)}
            />
                  
            <Button
              className={styles.ReportOrderModal_button}
              disabled={isSubmitting}
              kind={buttonKinds.SUBMIT}
              onClick={() => {}}
            >
              <span
                className={styles.ReportOrderModal_button_buttonText}
              >
                Submit
                {isSubmitting && (
                  <Spinner
                    className={styles.ReportOrderModal_button_spinner}
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

ReportOrderModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default ReportOrderModal;

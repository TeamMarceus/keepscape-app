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


import { useReportProduct } from '@/hooks';
import { toastError, toastSuccess } from '@/utils/toasts';

import styles from './styles.module.scss';

const validate = (values) => {  
  const errors = {};

  if (!values.reason) {
    errors.reason = 'This field is required.';
  }

  return errors;
};

function ReportProductModal({
  isOpen,
  handleClose,
  title,
  productId
}) {
  const { isLoading: isSubmitting, reportProduct } = useReportProduct();

  return (
    <Modal
      className={styles.ReportProductModal}
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

           const { responseCode: reportProductResponseCode } = await reportProduct(productId, currentFormValues);

            const reportProductCallbacks = {
              created: () => {
                toastSuccess('Product successfully reported.');
              
                handleClose();
              },
              invalidFields: () => {
                toastError('Invalid fields.');
              },
              internalError: () => {
                toastError('Oops, something went wrong.');
              },
            };

            switch (reportProductResponseCode) {
              case 200:
                reportProductCallbacks.created();
                break;
              case 400:
                reportProductCallbacks.invalidFields();
                break;
              case 401:
                reportProductCallbacks.internalError();
                break;
              case 500:
                reportProductCallbacks.internalError();
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
              inputClassName={styles.ReportProductModal_textArea}
              name="reason"
              placeholder="Please describe the problem you encountered here."
              type={textAreaTypes.FORM}
              value={values.reason}
              onChange={(e) => setFieldValue('reason', e.target.value)}
            />
                  
            <Button
              className={styles.ReportProductModal_button}
              disabled={isSubmitting}
              kind={buttonKinds.SUBMIT}
              onClick={() => {}}
            >
              <span
                className={styles.ReportProductModal_button_buttonText}
              >
                Submit
                {isSubmitting && (
                  <Spinner
                    className={styles.ReportProductModal_button_spinner}
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

ReportProductModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  productId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default ReportProductModal;

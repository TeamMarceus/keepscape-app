import React from 'react';

import { Formik } from 'formik';
import { isEmpty } from 'lodash-es';
import PropTypes from 'prop-types';

import { buttonKinds, colorNames, modalPositions, modalSizes, spinnerSizes } from '@/app-globals';
import { Button, ImageDropzone, Modal, Spinner } from '@/components';

import styles from './styles.module.scss';

const validate = (values) => {  
  const errors = {};

  if (!values.paymentProofImage) {
    errors.paymentProofImage = 'Image is required.';
  }

  return errors;
};

function TrasnferModal({
  isOpen,
  handleClose,
  title,
  updateWithdrawal,
  balanceWithdrawalId,
  isUpdating,
}) {
  return (
    <Modal
      className={styles.TrasnferModal}
      handleClose={handleClose}
      isOpen={isOpen}
      position={modalPositions.CENTER}
      size={modalSizes.SM}
      title={title}
    >
      <Formik
        initialValues={{
          paymentProofImage: '',
        }}
        onSubmit={async (values, { setErrors }) => {
          const errors = validate(values);
          if (!isEmpty(errors)) {
            setErrors(errors);
            return;
          }

          await updateWithdrawal({
            balanceWithdrawalId, 
            status: 'Paid', 
            paymentProofImage: values.paymentProofImage
          });

          if (!isUpdating) {
            handleClose();
          }
        }}
      >
        {({ errors, values, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <ImageDropzone
              error={errors.paymentProofImage}
              text="Upload Payment Proof" 
              value={values.paymentProofImage}
              onChange={(image) => {
                setFieldValue('paymentProofImage', image);
              }}
            />

            <Button
              className={styles.TrasnferModal_button}
              disabled={isUpdating}
              kind={buttonKinds.SUBMIT}
              onClick={() => {}}
            >
              <span
                className={styles.TrasnferModal_button_buttonText}
              >
                Transfer
                {isUpdating && (
                  <Spinner
                    className={styles.TrasnferModal_button_spinner}
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

TrasnferModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  balanceWithdrawalId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  updateWithdrawal: PropTypes.func.isRequired,
  isUpdating: PropTypes.bool.isRequired,
}

export default TrasnferModal;

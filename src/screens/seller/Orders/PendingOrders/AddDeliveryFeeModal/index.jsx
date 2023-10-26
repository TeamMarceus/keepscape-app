import React from 'react';

import { Formik } from 'formik';
import { isEmpty } from 'lodash-es';
import PropTypes from 'prop-types';

import { 
  buttonKinds,
  colorNames,
  inputKinds,
  modalPositions,
  modalSizes,
  spinnerSizes 
} from '@/app-globals';

import {
  Button,
  ControlledInput,
  ImageDropzone,
  Modal,
  Spinner 
} from '@/components';

import styles from './styles.module.scss';

const validate = (values) => {  
  const errors = {};

  if (!values.deliveryFee) {
    errors.deliveryFee = 'This field is required.';
  } else if (values.deliveryFee < 0) {
    errors.deliveryFee = 'Delivery fee must be a positive number.';
  } else if (values.deliveryFee > 1000000) {
    errors.deliveryFee = 'Delivery fee must be less than 1000000.';
  }

  if (isEmpty(values.deliveryFeeProofImage)) {
    errors.deliveryFeeProofImage = 'Image is required.';
  }

  return errors;
};

function AddDeliveryFeeModal({
  isOpen,
  handleClose,
  title,
  addDeliveryFee,
  orderId,
  isAdding,
}) {

  return (
    <Modal
      className={styles.AddDeliveryFeeModal}
      handleClose={handleClose}
      isOpen={isOpen}
      position={modalPositions.CENTER}
      size={modalSizes.SM}
      title={title}
    >
      <Formik
        initialValues={{
          deliveryFee: '',
          deliveryFeeProofImage: '',
        }}
        onSubmit={async (values, { setErrors }) => {
          const currentFormValues = {
            deliveryFee: values.deliveryFee,
            deliveryFeeProofImage: values.deliveryFeeProofImage,
          };

          const errors = validate(values);
          if (!isEmpty(errors)) {
            setErrors(errors);
            return;
          }

          await addDeliveryFee(orderId, currentFormValues);

          if (!isAdding) {
            handleClose();
          }
        }}
      >
        {({ errors, values, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <ControlledInput
              className={styles.AddDeliveryFeeModal_input}
              error={errors.deliveryFee}
              kind={inputKinds.NUMBER}
              name="deliveryFee"
              placeholder="Delivery Fee*"
              value={values.deliveryFee}
              onChange={(e) => setFieldValue('deliveryFee', e.target.value)}
            />

            <ImageDropzone
              className={styles.AddDeliveryFeeModal_withMargin}
              error={errors.deliveryFeeProofImage}
              text="Upload Delivery Fee Proof"
              value={values.deliveryFeeProofImage}
              onChange={(image) => {
                setFieldValue('deliveryFeeProofImage', image);
              }}
            />
                  
            <Button
              className={styles.AddDeliveryFeeModal_button}
              disabled={isAdding}
              kind={buttonKinds.SUBMIT}
              onClick={() => {}}
            >
              <span
                className={styles.AddDeliveryFeeModal_button_buttonText}
              >
                Add
                {isAdding && (
                  <Spinner
                    className={styles.AddDeliveryFeeModal_button_spinner}
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

AddDeliveryFeeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  addDeliveryFee: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired,
  isAdding: PropTypes.bool.isRequired,
}

export default AddDeliveryFeeModal;

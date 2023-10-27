import React from 'react';

import { Formik } from 'formik';
import { isEmpty } from 'lodash-es';
import PropTypes from 'prop-types';

import { buttonKinds, colorNames, modalPositions, modalSizes, spinnerSizes } from '@/app-globals';

import { Button, ControlledTextArea, Modal, Spinner } from '@/components';

import { textAreaTypes } from '@/components/TextArea/constants';

import styles from './styles.module.scss';

const validate = (values) => {  
  const errors = {};

  if (!values.reason) {
    errors.reason = 'This field is required.';
  }

  return errors;
};

function RejectModal({
  isOpen,
  handleClose,
  title,
  updateWithdrawal,
  balanceWithdrawalId,
  isUpdating,
}) {

  return (
    <Modal
      className={styles.RejectModal}
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

          const errors = validate(values);
          if (!isEmpty(errors)) {
            setErrors(errors);
            return;
          }

          await updateWithdrawal({
            balanceWithdrawalId, 
            status: 'Rejected', 
            reason: values.reason
          });

          if (!isUpdating) {
            handleClose();
          }
        }}
      >
        {({ errors, values, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <ControlledTextArea
              error={errors.reason}
              inputClassName={styles.RejectModal_textArea}
              name="reason"
              placeholder="Please enter your reason here..."
              type={textAreaTypes.FORM}
              value={values.reason}
              onChange={(e) => setFieldValue('reason', e.target.value)}
            />
                  
            <Button
              className={styles.RejectModal_button}
              disabled={isUpdating}
              kind={buttonKinds.SUBMIT}
              onClick={() => {}}
            >
              <span
                className={styles.RejectModal_button_buttonText}
              >
                Submit
                {isUpdating && (
                  <Spinner
                    className={styles.RejectModal_button_spinner}
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

RejectModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  updateWithdrawal: PropTypes.func.isRequired,
  balanceWithdrawalId: PropTypes.string.isRequired,
  isUpdating: PropTypes.bool.isRequired,
}

export default RejectModal;

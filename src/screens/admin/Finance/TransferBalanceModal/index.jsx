import React, { useState } from 'react';

import { Formik } from 'formik';
import { isEmpty } from 'lodash-es';
import PropTypes from 'prop-types';

import { buttonKinds, colorNames, inputKinds, modalPositions, modalSizes, spinnerSizes } from '@/app-globals';
import { Button, ControlledInput, Modal, Spinner } from '@/components';

import styles from './styles.module.scss';

const validate = (values) => {  
  const errors = {};

  if (!values.balance) {
    errors.balance = 'This field is required.';
  }

  if (!values.userId) {
    errors.userId = 'This field is required.';
  }

  if (!values.confirmUserId) {
    errors.confirmUserId = 'This field is required.';
  } else if (values.confirmUserId !== values.userId) {
    errors.confirmUserId = 'User ID does not match.';
  }

  return errors;
};

function TransferBalanceModal({
  isOpen,
  handleClose,
}) {
  const [isTransferring, setIsTransferring] = useState(false);

  return (
    <Modal
      className={styles.TransferBalanceModal}
      handleClose={handleClose}
      isOpen={isOpen}
      position={modalPositions.CENTER}
      size={modalSizes.SM}
      title='Transfer Balance'
    >
      <Formik
        initialValues={{
          balance: '',
          userId: '',
        }}
        onSubmit={async (values, { setErrors }) => {
          const currentFormValues = {
            balance: values.balance,
            userId: values.userId,
          };

          const errors = validate(values);
          if (!isEmpty(errors)) {
            setErrors(errors);
            return;
          }

          setIsTransferring(true);
          setIsTransferring(false);
        }}
      >
        {({ errors, values, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <ControlledInput
              className={styles.TransferBalanceModal_input}
              error={errors.balance}
              kind={inputKinds.NUMBER}
              name="balance"
              placeholder="Balance to Transfer*"
              value={values.balance}
              onChange={(e) => setFieldValue('balance', e.target.value)}
            />

            <ControlledInput
              className={styles.TransferBalanceModal_withMargin}
              error={errors.userId}
              name="userId"
              placeholder="User ID*"
              value={values.userId}
              onChange={(e) => setFieldValue('userId', e.target.value)}
            />

            <ControlledInput
              className={styles.TransferBalanceModal_withMargin}
              error={errors.confirmUserId}
              name="confirmUserId"
              placeholder="Confirm User ID*"
              value={values.confirmUserId}
              onChange={(e) => setFieldValue('confirmUserId', e.target.value)}
            />

            <Button
              className={styles.TransferBalanceModal_button}
              disabled={isTransferring}
              kind={buttonKinds.SUBMIT}
              onClick={() => {}}
            >
              <span
                className={styles.TransferBalanceModal_button_buttonText}
              >
                Transfer
                {isTransferring && (
                  <Spinner
                    className={styles.TransferBalanceModal_button_spinner}
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

TransferBalanceModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default TransferBalanceModal;

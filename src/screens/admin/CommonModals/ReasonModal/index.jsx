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

function ReasonModal({
  isOpen,
  handleClose,
  title,
  updateUser,
  userId,
  status,
  isUpdating,
}) {

  return (
    <Modal
      className={styles.ReasonModal}
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

          await updateUser(userId, status, values.reason);

          if (!isUpdating) {
            handleClose();
          }
        }}
      >
        {({ errors, values, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <ControlledTextArea
              error={errors.reason}
              inputClassName={styles.ReasonModal_textArea}
              name="reason"
              placeholder="Please enter your reason here..."
              type={textAreaTypes.FORM}
              value={values.reason}
              onChange={(e) => setFieldValue('reason', e.target.value)}
            />
                  
            <Button
              className={styles.ReasonModal_button}
              disabled={isUpdating}
              kind={buttonKinds.SUBMIT}
              onClick={() => {}}
            >
              <span
                className={styles.ReasonModal_button_buttonText}
              >
                Submit
                {isUpdating && (
                  <Spinner
                    className={styles.ReasonModal_button_spinner}
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

ReasonModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  updateUser: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  isUpdating: PropTypes.bool.isRequired,
}

export default ReasonModal;

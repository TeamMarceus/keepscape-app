import React, { useState } from 'react';

import dayjs from 'dayjs';
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
  DateTimePicker,
  Button, 
  ControlledTextArea, 
  Modal, 
  Spinner 
} from '@/components';

import { textAreaTypes } from '@/components/TextArea/constants';

import styles from './styles.module.scss';

const validate = (values) => {  
  const errors = {};

  if (!values.log) {
    errors.log = 'All fields are required.';
  }

  if (isEmpty(values.dateTime)) {
    errors.log = 'All fields are required.';
  }

  return errors;
};

function AddLogsModal({
  isOpen,
  handleClose,
  orderId,
  title,
}) {

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Modal
      className={styles.AddLogsModal}
      handleClose={handleClose}
      isOpen={isOpen}
      position={modalPositions.CENTER}
      size={modalSizes.SM}
      title={title}
    >
      <Formik
        initialValues={{
          log: '',
          dateTime: '',
        }}
        onSubmit={async (values, { setErrors }) => {
          const currentFormValues = {
            log: values.log,
            dateTime: values.dateTime,
          };

          const errors = validate(values);
          if (!isEmpty(errors)) {
            setErrors(errors);
            return;
          }
          
          console.log(values.dateTime.format('YYYY-MM-DD HH:mm:ss A'));
          setIsSubmitting(true);
          setIsSubmitting(false);
        }}
      >
        {({ errors, values, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <DateTimePicker
              label="Date and Time of Log"
              value={values.dateTime || dayjs()}
              onChange={(d) => {
                setFieldValue('dateTime', d);
              }}
            />

            <ControlledTextArea
              error={errors.log}
              inputClassName={styles.AddLogsModal_textArea}
              name="log"
              placeholder="Write your log here..."
              type={textAreaTypes.FORM}
              value={values.log}
              onChange={(e) => setFieldValue('log', e.target.value)}
            />
                  
            <Button
              className={styles.AddLogsModal_button}
              disabled={isSubmitting}
              kind={buttonKinds.SUBMIT}
              onClick={() => {}}
            >
              <span
                className={styles.AddLogsModal_button_buttonText}
              >
                Submit
                {isSubmitting && (
                  <Spinner
                    className={styles.AddLogsModal_button_spinner}
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

AddLogsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default AddLogsModal;

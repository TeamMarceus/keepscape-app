import React, { useState } from 'react';

import { Formik } from 'formik';
import { isEmpty } from 'lodash-es';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { buttonKinds, colorNames, iconButtonTypes, modalPositions, modalSizes, spinnerSizes } from '@/app-globals';

import { Button, ControlledTextArea, IconButton, Modal, RatingStars, Spinner } from '@/components';

import { textAreaTypes } from '@/components/TextArea/constants';

import { getUser } from '@/ducks';

import styles from './styles.module.scss';

const validate = (values) => {  
  const errors = {};

  if (!values.problem) {
    errors.problem = 'This field is required.';
  }

  return errors;
};

function ReportProblemModal({
  isOpen,
  handleClose,
  title,
  seller,
}) {
  const user = useSelector(getUser);

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Modal
      className={styles.ReportProblemModal}
      handleClose={handleClose}
      isOpen={isOpen}
      position={modalPositions.CENTER}
      size={modalSizes.SM}
      title={title}
    >
      <Formik
        initialValues={{
          problem: '',
        }}
        onSubmit={async (values, { setErrors }) => {
          const currentFormValues = {
            problem: values.problem,
            userId: user.id,
            userFullName: `${user.firstName} ${user.lastName}`,
          };

          const errors = validate(values);
          if (!isEmpty(errors)) {
            setErrors(errors);
            return;
          }

          setIsSubmitting(true);
          setIsSubmitting(false);
        }}
      >
        {({ errors, values, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <ControlledTextArea
              error={errors.problem}
              inputClassName={styles.ReportProblemModal_textArea}
              name="problem"
              placeholder="Please describe the problem you encountered here."
              type={textAreaTypes.FORM}
              value={values.problem}
              onChange={(e) => setFieldValue('problem', e.target.value)}
            />
                  
            <Button
              className={styles.ReportProblemModal_button}
              disabled={isSubmitting}
              kind={buttonKinds.SUBMIT}
              onClick={() => {}}
            >
              <span
                className={styles.ReportProblemModal_button_buttonText}
              >
                Submit
                {isSubmitting && (
                  <Spinner
                    className={styles.ReportProblemModal_button_spinner}
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

ReportProblemModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  seller: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default ReportProblemModal;

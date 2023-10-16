import React, { useState } from 'react';

import { Formik } from 'formik';
import { isEmpty } from 'lodash-es';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { buttonKinds, colorNames, iconButtonTypes, modalPositions, modalSizes, spinnerSizes } from '@/app-globals';

import { Button, ControlledInput, ControlledTextArea, IconButton, Modal, RatingStars, Spinner } from '@/components';

import { textAreaTypes } from '@/components/TextArea/constants';

import { getUser } from '@/ducks';

import styles from './styles.module.scss';

const validate = (values) => {  
  const errors = {};

  if (!values.title) {
    errors.title = 'This field is required.';
  }

  if (!values.content) {
    errors.content = 'This field is required.';
  }

  return errors;
};

function AddAnnouncementModal({
  isOpen,
  handleClose,
}) {
  const user = useSelector(getUser);

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Modal
      className={styles.AddAnnouncementModal}
      handleClose={handleClose}
      isOpen={isOpen}
      position={modalPositions.CENTER}
      size={modalSizes.SM}
      title="Create New Announcement"
    >
      <Formik
        initialValues={{
          title: '',
          content: '',
        }}
        onSubmit={async (values, { setErrors }) => {
          const currentFormValues = {
            title: values.title,
            content: values.content,
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
             <ControlledInput
                className={styles.AddAnnouncementModal_input}
                error={errors.title}
                name="title"
                placeholder="Title*"
                value={values.title}
                onChange={(e) => setFieldValue('title', e.target.value)}
              />

            <ControlledTextArea
              error={errors.content}
              inputClassName={styles.AddAnnouncementModal_input}
              name="content"
              placeholder="Write your announcement here..."
              type={textAreaTypes.FORM}
              value={values.content}
              onChange={(e) => setFieldValue('content', e.target.value)}
            />
                  
            <Button
              className={styles.AddAnnouncementModal_button}
              disabled={isSubmitting}
              kind={buttonKinds.SUBMIT}
              onClick={() => {}}
            >
              <span
                className={styles.AddAnnouncementModal_button_buttonText}
              >
                Submit
                {isSubmitting && (
                  <Spinner
                    className={styles.AddAnnouncementModal_button_spinner}
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

AddAnnouncementModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default AddAnnouncementModal;

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

  if (!values.review) {
    errors.review = 'This field is required.';
  }

  if (!values.rating) {
    errors.rating = 'This field is required.';
  }

  return errors;
};

function AddReviewModal({
  isOpen,
  handleClose,
  title,
}) {
  const user = useSelector(getUser);

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Modal
      className={styles.AddReviewModal}
      handleClose={handleClose}
      isOpen={isOpen}
      position={modalPositions.CENTER}
      size={modalSizes.SM}
      title={title}
    >
      <Formik
        initialValues={{
          review: '',
          rating: '',
        }}
        onSubmit={async (values, { setErrors }) => {
          const currentFormValues = {
            review: values.review,
            rating: values.rating,
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
            <div className={styles.AddReviewModal_stars}>
              {Array.from({ length: 5 }, (_, index) => (
                <IconButton
                  key={index}
                  icon={values.rating > index ? 'star' : 'grade'}
                  iconClassName={styles.AddReviewModal_star}
                  type={iconButtonTypes.ICON.LG} 
                  onClick={() => setFieldValue('rating', index + 1)}
                />
              ))}
            </div>

            <ControlledTextArea
              error={errors.review}
              inputClassName={styles.AddReviewModal_textArea}
              name="review"
              placeholder="Write your review here..."
              type={textAreaTypes.FORM}
              value={values.review}
              onChange={(e) => setFieldValue('review', e.target.value)}
            />
                  
            <Button
              className={styles.AddReviewModal_button}
              disabled={isSubmitting}
              kind={buttonKinds.SUBMIT}
              onClick={() => {}}
            >
              <span
                className={styles.AddReviewModal_button_buttonText}
              >
                Submit
                {isSubmitting && (
                  <Spinner
                    className={styles.AddReviewModal_button_spinner}
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

AddReviewModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default AddReviewModal;

import React, { useState } from 'react';

import { Formik } from 'formik';
import { isEmpty } from 'lodash-es';
import PropTypes from 'prop-types';

import { 
  buttonKinds, 
  colorNames, 
  iconButtonTypes, 
  modalPositions, 
  modalSizes, 
  spinnerSizes 
} from '@/app-globals';

import {
  Button, 
  ControlledTextArea, 
  IconButton, 
  Modal, 
  Preloader, 
  Spinner 
} from '@/components';

import { textAreaTypes } from '@/components/TextArea/constants';


import { useAddProductReview, useProductReview, useUpdateProductReview } from '@/hooks';
import { toastError, toastSuccess } from '@/utils/toasts';

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
  productId,
}) {

  const {isLoading: isProductReviewLoading, productReview } = useProductReview(productId);
  const {isLoading: isAdding, addProductReview } = useAddProductReview();
  const {isLoading: isUpdating, updateProductReview } = useUpdateProductReview();

  return (
    <Modal
      className={styles.AddReviewModal}
      handleClose={handleClose}
      isOpen={isOpen}
      position={modalPositions.CENTER}
      size={modalSizes.SM}
      title={ productReview ? 'Update Review' : 'Add Review'}
    >
      {isProductReviewLoading ? (
        <Preloader />
      ) : (
        <Formik
        initialValues={{
          review: productReview?.review || '',
          rating: productReview?.rating || 0,
        }}
        onSubmit={async (values, { setErrors }) => {
          const currentFormValues = {
            review: values.review,
            rating: values.rating,
          };

          const errors = validate(values);
          if (!isEmpty(errors)) {
            setErrors(errors);
            return;
          }

          if (!productReview?.id) {
            const { responseCode: addProductReviewResponseCode } = await addProductReview(productId, currentFormValues);
  
            const addProductReviewCallbacks = {
              created: () => {
                toastSuccess('Review successfully added.');
              
                handleClose();
              },
              invalidFields: () => {
                toastError('Invalid fields.');
              },
              internalError: () => {
                toastError('Oops, something went wrong.');
              },
            };
  
            switch (addProductReviewResponseCode) {
              case 200:
                addProductReviewCallbacks.created();
                break;
              case 400:
                addProductReviewCallbacks.invalidFields();
                break;
              case 401:
                addProductReviewCallbacks.internalError();
                break;
              case 500:
                addProductReviewCallbacks.internalError();
                break;
              default:
                break;
            }
          } else {
            const { responseCode: updateProductReviewResponseCode } = await updateProductReview(productId, currentFormValues);
  
            const updateProductReviewCallbacks = {
              created: () => {
                toastSuccess('Review successfully updated.');
              
                handleClose();
              },
              invalidFields: () => {
                toastError('Invalid fields.');
              },
              internalError: () => {
                toastError('Oops, something went wrong.');
              },
            };
  
            switch (updateProductReviewResponseCode) {
              case 200:
                updateProductReviewCallbacks.created();
                break;
              case 400:
                updateProductReviewCallbacks.invalidFields();
                break;
              case 401:
                updateProductReviewCallbacks.internalError();
                break;
              case 500:
                updateProductReviewCallbacks.internalError();
                break;
              default:
                break;
            }
          }
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
              disabled={isAdding || isUpdating}
              kind={buttonKinds.SUBMIT}
              onClick={() => {}}
            >
              <span
                className={styles.AddReviewModal_button_buttonText}
              >
                { productReview ? 'Update' : 'Submit'}
                {(isAdding || isUpdating) && (
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
      )}
    </Modal>
  );
}

AddReviewModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  productId: PropTypes.string.isRequired,
}

export default AddReviewModal;

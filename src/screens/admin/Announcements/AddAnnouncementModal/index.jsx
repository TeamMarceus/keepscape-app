import React, { useState } from 'react';

import { Formik } from 'formik';
import { isEmpty } from 'lodash-es';
import PropTypes from 'prop-types';

import { toast } from 'sonner';

import {
  buttonKinds,
  colorNames,
  modalPositions,
  modalSizes,
  spinnerSizes,
} from '@/app-globals';

import {
  Button,
  ControlledInput,
  ControlledTextArea,
  Modal,
  Spinner,
} from '@/components';

import { textAreaTypes } from '@/components/TextArea/constants';

import { useAddAnnouncement } from '@/hooks';

import styles from './styles.module.scss';

const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = 'This field is required.';
  }

  if (!values.description) {
    errors.description = 'This field is required.';
  }

  return errors;
};

function AddAnnouncementModal({ isOpen, handleClose, setAnnouncements }) {
  const { isAdding: isSubmitting, addAnnouncement } = useAddAnnouncement();

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
          description: '',
        }}
        onSubmit={async (values, { setErrors, setFieldValue }) => {
          const currentFormValues = {
            title: values.title,
            description: values.description,
          };

          const errors = validate(values);
          if (!isEmpty(errors)) {
            setErrors(errors);
            return;
          }

          const {
            data: addAnnouncementData,
            responseCode: addAnnouncementResponseCode,
          } = await addAnnouncement(currentFormValues);

          const addAnnouncementCallbacks = {
            created: () => {
              setAnnouncements((prevAnnouncements) => {
                const newAnnouncements = [...prevAnnouncements];
                newAnnouncements.unshift(addAnnouncementData);
                return newAnnouncements;
              });

              toast.success('Announcecment successfully added.', {
                style: {
                  backgroundColor: '#48CFAD',
                  color: '#fff',
                },
              });

              // Reset form values
              setFieldValue('title', '');
              setFieldValue('description', '');
            },
            invalidFields: () => {
              toast.error('Invalid fields.', {
                style: {
                  backgroundColor: '#ed5565',
                  color: '#fff',
                },
              });
            },
            internalError: () => {
              toast.error('Oops, something went wrong.', {
                style: {
                  backgroundColor: '#ed5565',
                  color: '#fff',
                },
              });
            },
          };

          switch (addAnnouncementResponseCode) {
            case 200:
              addAnnouncementCallbacks.created();
              break;
            case 400:
              addAnnouncementCallbacks.invalidFields();
              break;
            case 401:
              addAnnouncementCallbacks.internalError();
              break;
            case 500:
              addAnnouncementCallbacks.internalError();
              break;
            default:
              break;
          }
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
              error={errors.description}
              inputClassName={styles.AddAnnouncementModal_input}
              name="description"
              placeholder="Write your announcement here..."
              type={textAreaTypes.FORM}
              value={values.description}
              onChange={(e) => setFieldValue('description', e.target.value)}
            />

            <Button
              className={styles.AddAnnouncementModal_button}
              disabled={isSubmitting}
              kind={buttonKinds.SUBMIT}
              onClick={() => {}}
            >
              <span className={styles.AddAnnouncementModal_button_buttonText}>
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
  setAnnouncements: PropTypes.func.isRequired,
};

export default AddAnnouncementModal;

import React from 'react';

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { Formik } from 'formik';
import { isEmpty } from 'lodash-es';
import PropTypes from 'prop-types';

import {
  buttonKinds,
  colorNames,
  modalPositions,
  modalSizes,
  spinnerSizes,
} from '@/app-globals';
import {
  DateTimePicker,
  Button,
  ControlledTextArea,
  Modal,
  Spinner,
} from '@/components';

import { textAreaTypes } from '@/components/TextArea/constants';

import { useAddOrderLogs } from '@/hooks';

import { toastError, toastSuccess } from '@/utils/toasts';

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
  setOrders,
  orders,
}) {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const { isAdding, addOrderLogs } = useAddOrderLogs();

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
          dateTime: dayjs(),
        }}
        onSubmit={async (values, { setErrors, setFieldValue }) => {
          const currentFormValues = {
            log: values.log,
            // Convert the date to UTC
            dateTime: dayjs(values.dateTime).utc().format(),
          };

          const errors = validate(values);
          if (!isEmpty(errors)) {
            setErrors(errors);
            return;
          }

          const { responseCode: addOrderLogsResponseCode } = await addOrderLogs(
            orderId,
            currentFormValues
          );

          const addOrderLogsCallbacks = {
            created: () => {
              toastSuccess('Delivery log successfully added.');

              const newOrders = orders.map((order) => {
                if (order.id === orderId) {
                  return {
                    ...order,
                    deliveryLogs: [
                      {
                        // subtract 8 hours to the dateTime
                        dateTime: dayjs(currentFormValues.dateTime)
                          .subtract(8, 'hour')
                          .format('MM/DD/YYYY hh:mm A'),
                        log: currentFormValues.log,
                      },
                      ...order.deliveryLogs,
                    ],
                  };
                }

                return order;
              });

              setOrders(newOrders);

              // Reset form values
              setFieldValue('log', '');
              setFieldValue('dateTime', dayjs());
            },
            invalidFields: () => {
              toastError('Invalid fields.');
            },
            internalError: () => {
              toastError('Oops, something went wrong.');
            },
          };

          switch (addOrderLogsResponseCode) {
            case 200:
              addOrderLogsCallbacks.created();
              break;
            case 400:
              addOrderLogsCallbacks.invalidFields();
              break;
            case 401:
              addOrderLogsCallbacks.internalError();
              break;
            case 500:
              addOrderLogsCallbacks.internalError();
              break;
            default:
              break;
          }
        }}
      >
        {({ errors, values, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <DateTimePicker
              disableFutureDateTime
              value={values.dateTime}
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
              disabled={isAdding}
              kind={buttonKinds.SUBMIT}
              onClick={() => {}}
            >
              <span className={styles.AddLogsModal_button_buttonText}>
                Add
                {isAdding && (
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
  setOrders: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired,
};

export default AddLogsModal;

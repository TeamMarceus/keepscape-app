import React from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';

import {
  colorClasses,
  modalPositions,
  modalSizes,
  textTypes,
} from '@/app-globals';

import { Modal, NoResults, Text } from '@/components';

import styles from './styles.module.scss';

function DeliveryLogsModal({
  isOpen,
  handleClose,
  title,
  deliveryDetails,
  deliveryLogs,
  deliveryFeeProofImageUrl,
  deliveryFee,
}) {
  return (
    <Modal
      className={styles.DeliveryLogsModal}
      handleClose={handleClose}
      isOpen={isOpen}
      position={modalPositions.CENTER}
      size={deliveryLogs.length > 0 ? modalSizes.LG : modalSizes.MD}
      title={title}
    >
      <div className={styles.DeliveryLogsModal_content}>
        <div className={styles.DeliveryLogsModal_delivery}>
          <Text
            className={styles.DeliveryLogsModal_delivery_title}
            type={textTypes.HEADING.XXS}
          >
            Delivery Address
          </Text>

          <Text
            className={styles.DeliveryLogsModal_delivery_name}
            type={textTypes.HEADING.XXXS}
          >
            {deliveryDetails.fullName}
          </Text>

          <Text
            className={styles.DeliveryLogsModal_delivery_number}
            colorClass={colorClasses.NEUTRAL['400']}
          >
            {deliveryDetails.contactNumber}{' '}
            {deliveryDetails?.altMobileNumber &&
              `| ${deliveryDetails.altMobileNumber}`}
          </Text>

          <Text colorClass={colorClasses.NEUTRAL['400']}>
            {deliveryDetails.fullAddress}
          </Text>
        </div>

        {deliveryLogs.length > 0 ? (
          <div className={styles.DeliveryLogsModal_logs}>
            {deliveryLogs.map((log, index) => (
              <div key={log.id} className={styles.DeliveryLogsModal_logs_log}>
                <div
                  className={cn(
                    styles.DeliveryLogsModal_logs_circle,
                    index === 0 && styles.DeliveryLogsModal_logs_circle___green
                  )}
                />

                <div className={styles.DeliveryLogsModal_logs_log_dateTime}>
                  <Text>{log.dateTime.replace('T', ' ')}</Text>
                </div>

                <div className={styles.DeliveryLogsModal_logs_log_description}>
                  <Text colorClass={colorClasses.NEUTRAL['400']}>
                    {log.log}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.DeliveryLogsModal_logs_empty}>
            <Text
              className={styles.DeliveryLogsModal_logs_empty_text}
              colorClass={colorClasses.NEUTRAL['400']}
              type={textTypes.HEADING.XS}
            >
              No logs yet.
            </Text>
          </div>
        )}

        <div className={styles.DeliveryLogsModal_proof}>
          <Text
            className={styles.DeliveryLogsModal_proof_title}
            type={textTypes.HEADING.XXS}
          >
            Delivery Fee Proof
          </Text>

          <div className={styles.DeliveryLogsModal_proof_image}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Delivery Fee Proof" src="https://picsum.photos/200" />
          </div>

          <Text
            className={styles.DeliveryLogsModal_proof_fee}
            type={textTypes.HEADING.XXS}
          >
            Delivery Fee:{' '}
            <span className={styles.DeliveryLogsModal_proof_fee_span}>
              ₱{deliveryFee}
            </span>
          </Text>
        </div>
      </div>
    </Modal>
  );
}

DeliveryLogsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  deliveryDetails: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    contactNumber: PropTypes.string.isRequired,
    altMobileNumber: PropTypes.string.isRequired,
    fullAddress: PropTypes.string.isRequired,
  }).isRequired,
  deliveryLogs: PropTypes.arrayOf(
    PropTypes.shape({
      dateTime: PropTypes.string.isRequired,
      log: PropTypes.string.isRequired,
    })
  ).isRequired,
  deliveryFeeProofImageUrl: PropTypes.string.isRequired,
  deliveryFee: PropTypes.number.isRequired,
};

export default DeliveryLogsModal;

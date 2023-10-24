import React from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';

import { colorClasses, modalPositions, modalSizes, textTypes } from '@/app-globals';

import { Modal, Text } from '@/components';

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
      size={modalSizes.LG}
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
            {deliveryDetails.fullName} Stephine Sinoy
          </Text>

          <Text 
            className={styles.DeliveryLogsModal_delivery_number}
            colorClass={colorClasses.NEUTRAL['400']}
          >
            {deliveryDetails?.contactNumber} 09060264692
          </Text>

          <Text colorClass={colorClasses.NEUTRAL['400']}>
            {deliveryDetails.fullAddress} Zone 5 Sitio Letmon Brgy Dumlog Talisay City Cebu
          </Text>
        </div>

        <div className={styles.DeliveryLogsModal_logs}>
          {deliveryLogs.map((log, index) => (
            <div
              key={log.id}
              className={styles.DeliveryLogsModal_logs_log}
            >
              <div className={cn(styles.DeliveryLogsModal_logs_circle, 
                  index === 0 && styles.DeliveryLogsModal_logs_circle___green,
              )}/>

              <div className={styles.DeliveryLogsModal_logs_log_dateTime}>
                <Text>
                  {log.dateTime.replace('T', ' ')}
                </Text>
              </div>

              <div className={styles.DeliveryLogsModal_logs_log_description}>
                <Text
                  colorClass={colorClasses.NEUTRAL['400']}
                >
                  {log.log}
                </Text>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.DeliveryLogsModal_proof}>
          <Text
            className={styles.DeliveryLogsModal_proof_title}
            type={textTypes.HEADING.XXS}
          >
            Delivery Fee Proof
          </Text>

          <div className={styles.DeliveryLogsModal_proof_image}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              alt="Delivery Fee Proof" 
              src="https://picsum.photos/200"
            />
          </div>

          <Text
            className={styles.DeliveryLogsModal_proof_fee}
            type={textTypes.HEADING.XXS}
          >
            Delivery Fee: <span className={styles.DeliveryLogsModal_proof_fee_span}>₱{deliveryFee}</span>
          </Text>
        </div>
      </div>
    </Modal>
  )
}

DeliveryLogsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  deliveryDetails: PropTypes.object.isRequired,
  deliveryLogs: PropTypes.arrayOf(PropTypes.shape({
    dateTime: PropTypes.string.isRequired,
    log: PropTypes.string.isRequired,
  })).isRequired,
  deliveryFeeProofImageUrl: PropTypes.string.isRequired,
  deliveryFee: PropTypes.number.isRequired,
}

export default DeliveryLogsModal;

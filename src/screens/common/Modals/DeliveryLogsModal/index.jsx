import React from 'react';

import cn from 'classnames';
import dayjs from 'dayjs';
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
  deliveryFee,
}) {

  return (
    <Modal
      className={styles.DeliveryLogsModal}
      handleClose={handleClose}
      isOpen={isOpen}
      position={modalPositions.CENTER}
      size={modalSizes.MD}
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
            {deliveryDetails.contactNumber}  {deliveryDetails?.altMobileNumber && `| ${deliveryDetails.altMobileNumber}`}
          </Text>

          <Text colorClass={colorClasses.NEUTRAL['400']}>
            {deliveryDetails.fullAddress}
          </Text>

          <Text
            className={styles.DeliveryLogsModal_delivery_fee}
            type={textTypes.HEADING.XXXS}
          >
            Delivery Fee: <span className={styles.DeliveryLogsModal_delivery_fee_span}>₱{deliveryFee}</span>
          </Text>
        </div>

        {deliveryLogs.length > 0 ? (

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
                    {/* Format it to "MM/DD/YYYY hh:mm A" and add 8 hours to it */}
                    {dayjs(log.dateTime).add(8, 'hour').format('MM/DD/YYYY hh:mm A')}
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
        ) : (
          <div className={styles.DeliveryLogsModal_logs_empty}>
            <Text
              className={styles.DeliveryLogsModal_logs_empty_text}
              colorClass={colorClasses.NEUTRAL['400']}
              type={textTypes.HEADING.SM}
            >
              No logs yet.
            </Text>
          </div>
        )}
      </div>
    </Modal>
  )
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
  deliveryLogs: PropTypes.arrayOf(PropTypes.shape({
    dateTime: PropTypes.string.isRequired,
    log: PropTypes.string.isRequired,
  })).isRequired,
  deliveryFee: PropTypes.number.isRequired,
}

export default DeliveryLogsModal;

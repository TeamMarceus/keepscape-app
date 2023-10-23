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
}) {

  const deliveryLogs = [
    {
      id: '11',
      dateTime: '2021-08-01 12:00:00',
      description: 'Product has been delivered',
    },
    {
      id: '12',
      dateTime: '2021-08-01 12:00:00',
      description: 'Product is out for delivery',
    },
    {
      id: '13',
      dateTime: '2021-08-01 12:00:00',
      description: 'Product is being prepared',
    },
    {
      id: '14',
      dateTime: '2021-08-01 12:00:00',
      description: 'Product has been approved',
    },
    {
      id: '1',
      dateTime: '2021-08-01 12:00:00',
      description: 'Product has been delivered',
    },
    {
      id: '2',
      dateTime: '2021-08-01 12:00:00',
      description: 'Product is out for delivery',
    },
    {
      id: '3',
      dateTime: '2021-08-01 12:00:00',
      description: 'Product is being prepared',
    },
    {
      id: '4',
      dateTime: '2021-08-01 12:00:00',
      description: 'Product has been approved',
    },
    {
      id: '5',
      dateTime: '2021-08-01 12:00:00',
      description: 'Product has been ordered',
    },
    {
      id: '6',
      dateTime: '2021-08-01 12:00:00',
      description: 'Product has been delivered',
    },
    {
      id: '7',
      dateTime: '2021-08-01 12:00:00',
      description: 'Product is out for delivery',
    },
    {
      id: '8',
      dateTime: '2021-08-01 12:00:00',
      description: 'Product is being prepared',
    },
    {
      id: '9',
      dateTime: '2021-08-01 12:00:00',
      description: 'Product has been approved',
    },
    {
      id: '10',
      dateTime: '2021-08-01 12:00:00',
      description: 'Product has been ordered',
    }
  ]

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
            {deliveryDetails?.contactNumber} 
          </Text>

          <Text colorClass={colorClasses.NEUTRAL['400']}>
            {deliveryDetails.fullAddress}
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
                  {log.dateTime}
                </Text>
              </div>

              <div className={styles.DeliveryLogsModal_logs_log_description}>
                <Text
                  colorClass={colorClasses.NEUTRAL['400']}
                >
                  {log.description}
                </Text>
              </div>
            </div>
          ))

          }
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
}

export default DeliveryLogsModal;

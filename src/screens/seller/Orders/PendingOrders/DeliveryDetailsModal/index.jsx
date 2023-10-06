import React from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';

import { colorClasses, modalPositions, modalSizes, textTypes } from '@/app-globals';

import { Modal, Text } from '@/components';


import styles from './styles.module.scss';

function DeliveryDetailsModal({
  isOpen,
  handleClose,
  deliveryDetails,
}) {

  return (
    <Modal
      className={styles.DeliveryDetailsModal}
      handleClose={handleClose}
      isOpen={isOpen}
      position={modalPositions.CENTER}
      size={modalSizes.XS}
      title='Delivery Address'
    >
      <div className={styles.DeliveryDetailsModal_delivery}>

        <Text
          className={styles.DeliveryDetailsModal_delivery_name}
          type={textTypes.HEADING.XXS}
        >
          {deliveryDetails?.fullName}
        </Text>

        <Text 
          className={styles.DeliveryDetailsModal_delivery_number}
          colorClass={colorClasses.NEUTRAL['400']}
        >
          {deliveryDetails?.contactNumber} 
        </Text>

        <Text colorClass={colorClasses.NEUTRAL['400']}>
          {deliveryDetails.fullAddress}
        </Text>
      </div>
    </Modal>
  )
}

DeliveryDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  deliveryDetails: PropTypes.object.isRequired,
}

export default DeliveryDetailsModal;

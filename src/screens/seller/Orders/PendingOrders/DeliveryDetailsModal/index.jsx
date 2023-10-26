import React from 'react';

import PropTypes from 'prop-types';

import { colorClasses, modalPositions, modalSizes, textTypes } from '@/app-globals';

import { Modal, Text } from '@/components';


import styles from './styles.module.scss';

function DeliveryDetailsModal({
  isOpen,
  handleClose,
  fullName,
  fullAddress,
  contactNumber,
  altNumber,
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
          {fullName} 
        </Text>

        <Text 
          className={styles.DeliveryDetailsModal_delivery_number}
          colorClass={colorClasses.NEUTRAL['400']}
        >
          {contactNumber} {altNumber && `| ${altNumber}`}
        </Text>

        <Text colorClass={colorClasses.NEUTRAL['400']}>
          {fullAddress}
        </Text>
      </div>
    </Modal>
  )
}

DeliveryDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  fullName: PropTypes.string.isRequired,
  fullAddress: PropTypes.string.isRequired,
  contactNumber: PropTypes.string.isRequired,
  altNumber: PropTypes.string,
}

export default DeliveryDetailsModal;

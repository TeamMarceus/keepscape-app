import React from 'react';

import PropTypes from 'prop-types';

import { colorClasses, modalPositions, modalSizes, textTypes } from '@/app-globals';
import { Card, Modal, Text } from '@/components';

import styles from './styles.module.scss';

function SellerModal({
  isOpen,
  handleClose,
  title,
  idImageUrl,
  sellerName,
  email,
  phoneNumber,
  description,
}) {

  return (
    <Modal
      className={styles.SellerModal}
      handleClose={handleClose}
      isOpen={isOpen}
      position={modalPositions.CENTER}
      size={modalSizes.SM}
      title={title}
    >
      <Card className={styles.SellerModal_profile}>
      <div className={styles.SellerModal_profile_info}>
        {/* eslint-disable-next-line @next/next/no-img-element  */}
        <img 
          alt={title}
          className={styles.SellerModal_id}
          height={100}
          src={idImageUrl}
          width={100}
        />
        
        <div className={styles.SellerModal_profile_name}>
          <Text 
            className={styles.SellerModal_profile_sellerName}
            type={textTypes.HEADING.XS}
          >
            {sellerName}
          </Text>

          <div className={styles.SellerModal_info}>
            <Text colorClass={colorClasses.NEUTRAL['400']}>
              Full Name:
            </Text>
            {sellerName}
          </div>

          <div className={styles.SellerModal_info}>
            <Text colorClass={colorClasses.NEUTRAL['400']}>
              Email: 
            </Text>
            {email}
          </div>

          <div className={styles.SellerModal_info}>
            <Text  colorClass={colorClasses.NEUTRAL['400']}>
              Mobile Number: 
            </Text>
            {phoneNumber}
          </div>
        </div>
      </div>

        <Text>
          {description}
        </Text>
      </Card>
    </Modal>
  )
}

SellerModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  idImageUrl: PropTypes.string.isRequired,
  sellerName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default SellerModal;

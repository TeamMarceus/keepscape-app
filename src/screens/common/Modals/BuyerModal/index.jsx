import React from 'react';

import PropTypes from 'prop-types';

import {
  colorClasses,
  modalPositions,
  modalSizes,
  textTypes,
} from '@/app-globals';
import { Card, Icon, Modal, Text } from '@/components';

import styles from './styles.module.scss';

function BuyerModal({ isOpen, handleClose, hasUserId, buyer, title }) {
  return (
    <Modal
      className={styles.BuyerModal}
      handleClose={handleClose}
      isOpen={isOpen}
      position={modalPositions.CENTER}
      size={modalSizes.SM}
      title={title}
    >
      <Card className={styles.BuyerModal_profile}>
        <div className={styles.BuyerModal_profile_info}>
          <Icon
            className={styles.BuyerModal_profile_icon}
            icon="account_circle"
          />

          <div className={styles.BuyerModal_profile_name}>
            <Text
              className={styles.BuyerModal_profile_buyerName}
              type={textTypes.HEADING.XS}
            >
              {buyer.fullName}
            </Text>

            <div className={styles.BuyerModal_info}>
              <Text colorClass={colorClasses.NEUTRAL['400']}>Email:</Text>
              {buyer.email}
            </div>

            <div className={styles.BuyerModal_info}>
              <Text colorClass={colorClasses.NEUTRAL['400']}>
                Mobile Number:
              </Text>
              {buyer.phoneNumber}
            </div>
          </div>
        </div>

        <Text>{buyer.description}</Text>
      </Card>

      <Text type={textTypes.HEADING.XXS}>Additional Information</Text>

      <div className={styles.BuyerModal_additionalContainer}>
        {hasUserId && (
          <div className={styles.BuyerModal_additionalInfo}>
            <Text colorClass={colorClasses.NEUTRAL['400']}>User ID:</Text>
            {buyer.id}
          </div>
        )}

        <div className={styles.BuyerModal_additionalInfo}>
          <Text colorClass={colorClasses.NEUTRAL['400']}>Preferences:</Text>
          {buyer.preferences}
        </div>

        <div className={styles.BuyerModal_additionalInfo}>
          <Text colorClass={colorClasses.NEUTRAL['400']}>Interests:</Text>
          {buyer.interests}
        </div>
      </div>
    </Modal>
  );
}

BuyerModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  hasUserId: PropTypes.bool.isRequired,
  buyer: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    preferences: PropTypes.string.isRequired,
    interests: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
};

export default BuyerModal;

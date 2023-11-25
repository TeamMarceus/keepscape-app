import React from 'react';

import PropTypes from 'prop-types';

import {
  colorClasses,
  modalPositions,
  modalSizes,
  textTypes,
} from '@/app-globals';
import { Card, Modal, Preloader, Text } from '@/components';
import { useSellers } from '@/hooks';

import styles from './styles.module.scss';

function SellerModal({ isOpen, handleClose, sellerId, title }) {
  const { isLoading: isSellerLoading, seller } = useSellers({ sellerId });

  return (
    <Modal
      className={styles.SellerModal}
      handleClose={handleClose}
      isOpen={isOpen}
      position={modalPositions.CENTER}
      size={modalSizes.SM}
      title={title}
    >
      {isSellerLoading ? (
        <Preloader />
      ) : (
        <>
          <Card className={styles.SellerModal_profile}>
            <div className={styles.SellerModal_profile_info}>
              {/* eslint-disable-next-line @next/next/no-img-element  */}
              <img
                alt={title}
                className={styles.SellerModal_id}
                height={100}
                src={seller.idImageUrl}
                width={100}
              />

              <div className={styles.SellerModal_profile_name}>
                <Text
                  className={styles.SellerModal_profile_sellerName}
                  type={textTypes.HEADING.XS}
                >
                  {seller.sellerName}
                </Text>

                <div className={styles.SellerModal_info}>
                  <Text colorClass={colorClasses.NEUTRAL['400']}>
                    Full Name:
                  </Text>
                  {seller.firstName} {seller.lastName}
                </div>

                <div className={styles.SellerModal_info}>
                  <Text colorClass={colorClasses.NEUTRAL['400']}>Email:</Text>
                  {seller.email}
                </div>

                <div className={styles.SellerModal_info}>
                  <Text colorClass={colorClasses.NEUTRAL['400']}>
                    Mobile Number:
                  </Text>
                  {seller.phoneNumber}
                </div>
              </div>
            </div>

            <Text>{seller.description}</Text>
          </Card>

          <Text type={textTypes.HEADING.XXS}>Additional Information</Text>

          <div className={styles.SellerModal_additionalContainer}>
            <div className={styles.SellerModal_additionalInfo}>
              <Text colorClass={colorClasses.NEUTRAL['400']}>
                Date Created:
              </Text>
              {seller.dateTimeCreated.split('T')[0]}
            </div>

            <div className={styles.SellerModal_additionalInfo}>
              <Text colorClass={colorClasses.NEUTRAL['400']}>
                Date Approved:
              </Text>
              {seller.dateTimeApproved.split('T')[0]}
            </div>

            <div className={styles.SellerModal_additionalInfo}>
              <Text colorClass={colorClasses.NEUTRAL['400']}>User ID:</Text>
              {seller.id}
            </div>

            <div className={styles.SellerModal_additionalInfo}>
              <Text colorClass={colorClasses.NEUTRAL['400']}>
                Seller Profile ID:
              </Text>
              {seller.sellerProfileId}
            </div>

            <div className={styles.SellerModal_additionalInfo}>
              <Text colorClass={colorClasses.NEUTRAL['400']}>
                Seller Application ID:
              </Text>
              {seller.sellerApplicationId}
            </div>
          </div>
        </>
      )}
    </Modal>
  );
}

SellerModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  sellerId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SellerModal;

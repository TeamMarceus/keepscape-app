import React from 'react';

import PropTypes from 'prop-types';

import { colorClasses, modalPositions, modalSizes, textTypes } from '@/app-globals';

import { Modal, Text } from '@/components';

import styles from './styles.module.scss';

function PaymentModal({
  isOpen,
  handleClose,
  paymentDetails,
  paymentMethod,
  paymentProfileImageUrl,
  title,
}) {
  return (
    <Modal
      className={styles.PaymentModal}
      handleClose={handleClose}
      isOpen={isOpen}
      position={modalPositions.CENTER}
      size={modalSizes.SM}
      title={title}
    >
      <div className={styles.PaymentModal_content}>
        <Text 
          className={styles.PaymentModal_text}
          colorClass={colorClasses.NEUTRAL['400']}
          type={textTypes.HEADING.XXXS}
        >
          Payment Method: <span className={styles.PaymentModal_text_span}>{paymentMethod}</span>
        </Text>

        <Text 
          className={styles.PaymentModal_text}
          colorClass={colorClasses.NEUTRAL['400']}
          type={textTypes.HEADING.XXXS}
        >
          Payment Details: <span className={styles.PaymentModal_text_span}>{paymentDetails}</span>
        </Text>

        <Text 
          className={styles.PaymentModal_proof}
          type={textTypes.HEADING.XXS}
        >
          Payment Proof
        </Text>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          alt="Payment Proof"
          className={styles.PaymentModal_image}
          height={400}
          src={paymentProfileImageUrl}
          width={400}
        />
      </div>
    </Modal>
  )
}

PaymentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  paymentDetails: PropTypes.string.isRequired,
  paymentMethod: PropTypes.string.isRequired,
  paymentProfileImageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default PaymentModal;

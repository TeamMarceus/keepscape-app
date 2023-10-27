import React from 'react';

import cn from 'classnames';
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
  const splittedPaymentDetails = paymentDetails.split(', ');

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
          Payment Method: <span className={styles.PaymentModal_text_method}>{paymentMethod}</span>
        </Text>

        <Text 
          className={cn(styles.PaymentModal_text,styles.PaymentModal_text_details)}
          colorClass={colorClasses.NEUTRAL['400']}
          type={textTypes.HEADING.XXXS}
        >
          Payment Details:
            
          <span className={styles.PaymentModal_text_span}>
            {splittedPaymentDetails.map((detail, index) => (
              <span key={index} className={styles.PaymentModal_text_span_detail}>
                {detail}
              </span>
            ))}
          </span>
        </Text>

        {paymentProfileImageUrl && (
          <>
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
              src={paymentProfileImageUrl}
            />
          </>
        )}
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

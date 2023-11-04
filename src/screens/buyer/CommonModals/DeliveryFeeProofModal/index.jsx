import React from 'react';

import PropTypes from 'prop-types';

import { modalPositions, modalSizes } from '@/app-globals';

import { Button, Modal } from '@/components';

import styles from './styles.module.scss';

function DeliveryFeeProofModal({
  isOpen,
  handleClose,
  proof,
  title,
}) {
  return (
    <Modal
      className={styles.DeliveryFeeProofModal}
      handleClose={handleClose}
      isOpen={isOpen}
      position={modalPositions.CENTER}
      size={modalSizes.SM}
      title={title}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        alt="Proof of delivery fee"
        className={styles.DeliveryFeeProofModal_proof}
        src={proof}
      />
  </Modal>
  )
}

DeliveryFeeProofModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  proof: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default DeliveryFeeProofModal;

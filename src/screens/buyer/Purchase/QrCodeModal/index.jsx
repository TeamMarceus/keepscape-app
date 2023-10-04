import React from 'react';

import PropTypes from 'prop-types';

import { modalPositions, modalSizes } from '@/app-globals';

import { Modal } from '@/components';

import styles from './styles.module.scss';

function QrCodeModal({
  isOpen,
  handleClose,
  qrCode,
  title,
}) {
  return (
    <Modal
      className={styles.QrCodeModal}
      handleClose={handleClose}
      isOpen={isOpen}
      position={modalPositions.CENTER}
      size={modalSizes.SM}
      title={title}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        alt="QR Code"
        className={styles.QrCodeModal_qrCode}
        src={qrCode}
      />
    </Modal>
  )
}

QrCodeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  qrCode: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default QrCodeModal;

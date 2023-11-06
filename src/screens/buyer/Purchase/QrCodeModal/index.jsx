import React from 'react';

import PropTypes from 'prop-types';

import { modalPositions, modalSizes } from '@/app-globals';

import { Button, Modal } from '@/components';

import { toastSuccess } from '@/utils/toasts';

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
        alt="Generating QR Code..."
        className={styles.QrCodeModal_qrCode}
        src={qrCode}
      />

      <Button
        className={styles.QrCodeModal_button}
        onClick={() => {
          navigator.clipboard.writeText(qrCode);
          toastSuccess('Copied to clipboard');
        }}
      >
        Share QR Code
      </Button>
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

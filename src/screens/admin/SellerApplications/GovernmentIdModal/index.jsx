import React from 'react';

import PropTypes from 'prop-types';

import { modalPositions, modalSizes } from '@/app-globals';

import { Modal } from '@/components';

import styles from './styles.module.scss';

function GovernmentIdModal({
  isOpen,
  handleClose,
  governmentId,
  title,
}) {
  return (
    <Modal
      className={styles.GovernmentIdModal}
      handleClose={handleClose}
      isOpen={isOpen}
      position={modalPositions.CENTER}
      size={modalSizes.SM}
      title={title}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        alt="Government Id"
        className={styles.GovernmentIdModal_id}
        src={governmentId}
      />
    </Modal>
  )
}

GovernmentIdModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  governmentId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default GovernmentIdModal;

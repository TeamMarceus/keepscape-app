import React from 'react';

import PropTypes from 'prop-types';

import { modalPositions, modalSizes } from '@/app-globals';

import { Modal } from '@/components';

import styles from './styles.module.scss';

function IdModal({ isOpen, handleClose, image, title }) {
  return (
    <Modal
      className={styles.IdModal}
      handleClose={handleClose}
      isOpen={isOpen}
      position={modalPositions.CENTER}
      size={modalSizes.SM}
      title={title}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt={title} className={styles.IdModal_id} src={image} />
    </Modal>
  );
}

IdModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default IdModal;

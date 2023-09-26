import React from 'react';

import ReactModal from 'react-modal';

import Spinner from '../Spinner';

import styles from './styles.module.scss';

function ModalLoader() {
  return (
    <ReactModal
      isOpen
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <Spinner />
    </ReactModal>
  );
}

ReactModal.setAppElement('body');

export default ModalLoader;

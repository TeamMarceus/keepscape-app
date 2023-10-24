import React from 'react';

import PropTypes from 'prop-types';

import {
  colorClasses,
  buttonTypes, 
  buttonGroupDirections, 
  modalPositions, 
  modalSizes,
  textTypes 
  } from '@/app-globals';

import Button from '../Button';
import ButtonGroup from '../Button/Group';
import ButtonLink from '../Button/Link';
import Modal from '../Modal';
import Text from '../Text';

import styles from './styles.module.scss';

function ConfirmModal({ isOpen, handleClose, title, body, actions, link }) {
  return (
    <Modal
      className={styles.ConfirmModal}
      handleClose={handleClose}
      hasCloseButton={false}
      isOpen={isOpen}
      position={modalPositions.CENTER}
      size={modalSizes.XS}
    >
      <div className={styles.ConfirmModal_content}>
        <div className={styles.ConfirmModal_text}>
          <Text
            className={styles.ConfirmModal_text_title}
            type={textTypes.HEADING.XS}
          >
            {title}
          </Text>
          <Text
            className={styles.ConfirmModal_text_info}
            colorClass={colorClasses.NEUTRAL['400']}
            type={textTypes.BODY.SM}
          >
            {body}
          </Text>
        </div>
        {actions && (
          <ButtonGroup
            buttons={actions}
            direction={buttonGroupDirections.VERTICAL}
          />
        )}
        {link && (
          <ButtonLink to={link}>
            <Text>Continue</Text>
          </ButtonLink>
        )}
        {!link && !actions && (
          <Button onClick={handleClose}>
            <Text>Continue</Text>
          </Button>
        )}
      </div>
    </Modal>
  );
}

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
        .isRequired,
      type: PropTypes.oneOf([
        buttonTypes.PRIMARY.YELLOW,
        buttonTypes.PRIMARY.RED,
        buttonTypes.TEXT.WHITE,
        buttonTypes.TEXT.YELLOW,
        buttonTypes.TEXT.RED,
        buttonTypes.TEXT.GRAY,
      ]),
      disabled: PropTypes.bool,
      onClick: PropTypes.func.isRequired,
    })
  ),
  link: PropTypes.string,
};

export default ConfirmModal;

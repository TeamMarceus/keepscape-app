import cn from 'classnames';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import {
  buttonKinds,
  buttonTypes,
  modalSizes,
  modalPositions,
  textTypes,
  colorClasses,
} from '@/app-globals';

import ButtonGroup from '../Button/Group';

import Icon from '../Icon';
import Text from '../Text';

import styles from './styles.module.scss';

function Modal({
  className = null,
  size = modalSizes.SM,
  children,
  position = modalPositions.CENTER,
  handleClose = null,
  hasCloseButton = true,
  isOpen,
  actions = null,
  parentSelector = null,
  title,
  noPadding = false,
}) {

  return <ReactModal
    ariaHideApp
    shouldCloseOnEsc
    shouldCloseOnOverlayClick
    shouldFocusAfterRender
    shouldReturnFocusAfterClose
    bodyOpenClassName={styles.Modal_body___open}
    className={cn(
      className,
      styles[`Modal___${size}`],
      styles[`Modal___${position}`]
    )}
    contentLabel="Modal"
    htmlOpenClassName={styles.Modal_html___open}
    isOpen={isOpen}
    overlayClassName={styles[`Modal_overlay___${position}`]}
    parentSelector={
      parentSelector
        ? () => document.querySelector(parentSelector)
        : () => document.querySelector('body')
    }
    portalClassName={styles.Modal_portal}
    onRequestClose={handleClose}
  >
    <Text
      className={styles.Modal_title}
      colorClass={colorClasses.NEUTRAL['0']}
      type={textTypes.HEADING.XXS}
    >
      {title}

      {hasCloseButton && (
        <button
          className={styles.Modal_close}
          id="closeModal"
          type="button"
          onClick={handleClose}
        >
          <Icon className={styles.Modal_close_icon} icon="close" />
        </button>
      )}
    </Text>

    <div
      className={cn(styles.Modal_content, {
        [styles.Modal_content_noPadding]: noPadding,
      })}
    >
      {children}
    </div>

    {actions && (
      <div className={styles.Modal_footer}>
        <ButtonGroup buttons={actions} />
      </div>
    )}
  </ReactModal>
}

ReactModal.setAppElement('body');

Modal.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf([
    modalSizes.LG,
    modalSizes.MD,
    modalSizes.SM,
    modalSizes.XS,
  ]),
  position: PropTypes.oneOf([modalPositions.CENTER, modalPositions.TOP]),
  children: PropTypes.node.isRequired,
  handleClose: PropTypes.func,
  hasCloseButton: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,

  // for mapping the buttons at the bottom of the modal
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
        .isRequired,
      type: PropTypes.oneOf([
        buttonTypes.PRIMARY.VIOLET,
        buttonTypes.PRIMARY.BLUE,
        buttonTypes.PRIMARY.RED,
        buttonTypes.PRIMARY.GREEN,
        buttonTypes.PRIMARY.YELLOW,
        buttonTypes.SECONDARY.VIOLET,
        buttonTypes.SECONDARY.BLUE,
        buttonTypes.SECONDARY.RED,
        buttonTypes.SECONDARY.GREEN,
        buttonTypes.SECONDARY.YELLOW,
        buttonTypes.TEXT.VIOLET,
        buttonTypes.TEXT.BLUE,
        buttonTypes.TEXT.RED,
        buttonTypes.TEXT.GREEN,
        buttonTypes.TEXT.YELLOW,
        buttonTypes.TERTIARY,
      ]),
      kind: PropTypes.oneOf([
        buttonKinds.BUTTON,
        buttonKinds.SUBMIT,
        buttonKinds.RESET,
      ]),
      disabled: PropTypes.bool,
      onClick: PropTypes.func.isRequired,
    })
  ),

  parentSelector: PropTypes.string,
  title: PropTypes.string.isRequired,
  noPadding: PropTypes.bool,
};

export default Modal;

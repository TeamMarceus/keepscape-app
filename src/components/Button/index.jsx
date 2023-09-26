import cn from 'classnames';
import PropTypes from 'prop-types';

import { buttonKinds, buttonTypes } from '@/app-globals';

import Icon from '../Icon';

import styles from './styles.module.scss';

function Button({
  children,
  type = buttonTypes.PRIMARY.BLUE,
  kind = buttonKinds.BUTTON,
  className = null,
  onClick,
  disabled = false,
  tabIndex = 0,
  icon = null,
  iconPosition = 'left',
}) {
  return <button
    className={cn(className, styles[`Button___${type}`], {
      [styles.Button___withIcon]: icon !== null,
    })}
    data-test="button"
    disabled={disabled}
    tabIndex={tabIndex}
    type={kind}
    onClick={onClick}
  >
    {iconPosition === 'left' && icon && (
      <Icon className={styles.Button___withIcon_iconLeft} icon={icon} />
    )}

    {children}

    {iconPosition === 'right' && icon && (
      <Icon className={styles.Button___withIcon_iconRight} icon={icon} />
    )}
  </button>
}

Button.propTypes = {
  children: PropTypes.any.isRequired,
  type: PropTypes.oneOf([
    buttonTypes.PRIMARY.VIOLET,
    buttonTypes.PRIMARY.BLUE,
    buttonTypes.PRIMARY.RED,
    buttonTypes.PRIMARY.GREEN,
    buttonTypes.PRIMARY.YELLOW,
    buttonTypes.PRIMARY.NEUTRAL,
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
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  tabIndex: PropTypes.number,
  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf(['left', 'right']),
};

export default Button;

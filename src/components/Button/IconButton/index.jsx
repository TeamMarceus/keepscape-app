import cn from 'classnames';
import PropTypes from 'prop-types';

import { buttonKinds, iconButtonTypes } from '@/app-globals';

import Icon from '../../Icon';

import styles from '../icon.module.scss';

function IconButton({
  icon,
  className = null,
  iconClassName= null,
  style= null,
  onClick = null,
  disabled = false,
  type = iconButtonTypes.SOLID.SM,
  tabIndex = 0,
  kind = buttonKinds.BUTTON,
}) {
  return <button
    className={cn(className, styles[`IconButton___${type}`])}
    data-test="button"
    disabled={disabled}
    tabIndex={tabIndex}
    type={kind}
    onClick={disabled === false ? onClick || (() => {}) : null}
  >
    <Icon
      className={cn(styles.IconButton_icon, iconClassName)}
      icon={icon}
      style={style}
    />
  </button>
}

IconButton.propTypes = {
  type: PropTypes.oneOf([
    iconButtonTypes.SOLID.LG,
    iconButtonTypes.SOLID.MD,
    iconButtonTypes.SOLID.SM,
    iconButtonTypes.SOLID.XS,
    iconButtonTypes.OUTLINE.LG,
    iconButtonTypes.OUTLINE.MD,
    iconButtonTypes.OUTLINE.SM,
    iconButtonTypes.OUTLINE.XS,
  ]),
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  style: PropTypes.object,
  onClick: PropTypes.func,
  iconClassName: PropTypes.string,
  disabled: PropTypes.bool,
  tabIndex: PropTypes.number,
  kind: PropTypes.oneOf([
    buttonKinds.BUTTON,
    buttonKinds.SUBMIT,
    buttonKinds.RESET,
  ]),
};

export default IconButton;

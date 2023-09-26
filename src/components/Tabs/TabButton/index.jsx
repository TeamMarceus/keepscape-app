import cn from 'classnames';
import PropTypes from 'prop-types';

import { iconButtonTypes, tabTypes } from '@/app-globals';

import IconButton from '../../Button/IconButton';

import styles from '../tabs.module.scss';

function TabButton({
  className = null,
  children,
  type = tabTypes.HORIZONTAL.LG,
  active = false,
  onClick,
  closeAction = null,
  id = null,
}) {
  return <button
    className={cn(className, {
      [styles[`Tab___${type}___active`]]: active,
      [styles[`Tab___${type}`]]: !active,
      [styles.Tab___withClose]: closeAction && active,
    })}
    data-test="tabButton"
    id={id}
    type="button"
    onClick={onClick}
  >
    {children}
    {closeAction && active && (
      <IconButton
        className={styles.Tab_close}
        data-test="closeButton"
        icon="close"
        type={iconButtonTypes.SOLID.XS}
        onClick={closeAction}
      />
    )}
  </button>
}

TabButton.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf([
    tabTypes.HORIZONTAL.LG,
    tabTypes.HORIZONTAL.SM,
    tabTypes.VERTICAL.LG,
    tabTypes.VERTICAL.SM,
  ]),
  closeAction: PropTypes.func,
  id: PropTypes.string,
};

export default TabButton;

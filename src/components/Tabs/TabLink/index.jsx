import cn from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { iconButtonTypes, tabTypes } from '@/app-globals';

import IconButton from '../../Button/IconButton';

import styles from '../tabs.module.scss';


function TabLink({
  className = null,
  children,
  type = tabTypes.HORIZONTAL.LG,
  active = false,
  to = '#',
  target = '_self',
  closeAction = null,
  id = null,
}) {

  return <Link
    className={cn(className, {
      [styles[`Tab___${type}___active`]]: active,
      [styles[`Tab___${type}`]]: !active,
      [styles.Tab___withClose]: closeAction && active,
    })}
    data-test="tabLink"
    href={to}
    id={id}
    target={target}
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
  </Link>
}

TabLink.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
  to: PropTypes.string,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf([
    tabTypes.HORIZONTAL.LG,
    tabTypes.HORIZONTAL.SM,
    tabTypes.VERTICAL.LG,
    tabTypes.VERTICAL.SM,
  ]),
  closeAction: PropTypes.func,
  id: PropTypes.string,
  target: PropTypes.oneOf(['_blank', '_self']),  
};

export default TabLink;

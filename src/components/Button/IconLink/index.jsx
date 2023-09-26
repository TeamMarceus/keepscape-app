import cn from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { iconButtonTypes } from '@/app-globals';

import Icon from '../../Icon';

import styles from '../icon.module.scss';

function IconLink({
  icon,
  className = null,
  style = null,
  iconClassName = null,
  to,
  disabled = false,
  type = iconButtonTypes.SOLID.SM,
  tabIndex = 0,
  target = '_self',
}) {
  return <Link
    className={cn(className, styles[`IconButton___${type}`], {
      [styles.Button___withIcon]: icon !== null,
      [styles.Button___disabled]: disabled,
    })}
    href={to}
    tabIndex={tabIndex}
    target={target}
  >
    <Icon
      className={cn(styles.IconButton_icon, iconClassName)}
      icon={icon}
      style={style}
    />
  </Link>
}

IconLink.propTypes = {
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
  to: PropTypes.string.isRequired,
  iconClassName: PropTypes.string,
  disabled: PropTypes.bool,
  tabIndex: PropTypes.number,
  target: PropTypes.oneOf(['_blank', '_self']),
};

export default IconLink;

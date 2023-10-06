import cn from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { buttonTypes } from '@/app-globals';

import Icon from '../../Icon';

import styles from '../styles.module.scss';


function ButtonLink({
  children,
  type = buttonTypes.PRIMARY.BLUE,
  className = null,
  to,
  target = '_self',
  tabIndex = 0,
  disabled = false,
  icon = null,
  iconPosition = 'left',
  onClick = () => {},
}) {

  const allChildren = (
    <>
      {iconPosition === 'left' && icon && (
        <Icon className={styles.Button___withIcon_iconLeft} icon={icon} />
      )}

      {children}

      {iconPosition === 'right' && icon && (
        <Icon className={styles.Button___withIcon_iconRight} icon={icon} />
      )}
    </>
  )

  const anchorClassNames = cn(className, styles[`Button___${type}`], {
    [styles.Button___withIcon]: icon !== null,
    [styles.Button___disabled]: disabled,
  });

  const link = to.startsWith('http') ? (
    <a
    className={anchorClassNames}
    data-test="nativeAnchor"
    href={to}
    rel="noreferrer"
    tabIndex={tabIndex}
    target="_blank"
    onClick={onClick}
  >
    {allChildren}
  </a>
 ): (
  <Link
    className={anchorClassNames}
    href={to}
    tabIndex={tabIndex}
    target={target}
    onClick={onClick}
  >
  {allChildren}
  </Link>
 )
  
  return link;
}


ButtonLink.propTypes = {
  children: PropTypes.any.isRequired,
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
    buttonTypes.TEXT.NEUTRAL,
    buttonTypes.TERTIARY,
  ]),
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  tabIndex: PropTypes.number,
  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  onClick: PropTypes.func,
  target: PropTypes.oneOf(['_blank', '_self']),
};

export default ButtonLink;

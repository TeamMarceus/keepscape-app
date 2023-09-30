import React from 'react';

import classNames from 'classnames';

import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';

function CardLink({ id, children, className, to = '#', target, onClick, onMouseEnter, onMouseLeave }) {
  return (
    <Link
      className={classNames(styles.Card, styles.Card___clickable, className)}
      href={to}
      id={id}
      tabIndex={0}
      target={target}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Link>
  );
}

CardLink.propTypes = {
  id: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  to: PropTypes.string,
  target: PropTypes.string,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

CardLink.displayName = 'CardLink';

export default CardLink;

import React from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

function Label({ children, htmlFor, disabled, className }) {
  return <label
    className={cn(className, {
      [styles.Label]: !disabled,
      [styles.Label___disabled]: disabled,
    })}
    htmlFor={htmlFor}
    type="radio"
  >
    {children}
  </label>
}

Label.defaultProps = {
  disabled: false,
  className: null,
};

Label.propTypes = {
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Label;

import React from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';

import Label from '../Label';

import styles from './styles.module.scss';


function Checkbox({ name, label, checked, className, onChange, disabled }) {
  return <div
    className={cn(className, styles.Checkbox, {
      [styles.Checkbox___disabled]: disabled,
    })}
  >
    <input
      checked={checked}
      className={styles.Checkbox_input}
      data-test="checkbox"
      disabled={disabled}
      id={name}
      name={name}
      type="checkbox"
      onChange={onChange}
    />
    <Label
      className={styles.Checkbox_label}
      disabled={disabled}
      htmlFor={name}
      id={`${name}-label`}
    >
      {label}
    </Label>
  </div>
}

Checkbox.defaultProps = {
  checked: false,
  className: null,
  disabled: false,
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  checked: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Checkbox;

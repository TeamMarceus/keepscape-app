import React from 'react';

import PropTypes from 'prop-types';
import { components } from 'react-select';

import styles from './styles.module.scss';

const { Option } = components;

/* eslint-disable react/jsx-props-no-spreading  */
function CustomOption(props) {
  const {
    data: { icon, label },
  } = props;

  return (
    <Option {...props} className={styles.CustomOption}>
      {icon && <span className={styles.CustomOption_icon}>{icon}</span>}
      {label}
    </Option>
  );
}

CustomOption.propTypes = {
  data: PropTypes.shape({
    icon: PropTypes.element,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default CustomOption;

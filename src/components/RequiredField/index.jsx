import React from 'react';

import PropTypes from 'prop-types';

import styles from './styles.module.scss';

function RequiredField({ placeholder }) {
  return (
    <>
      {placeholder}
      <span className={styles.asterisk}>*</span>
    </>
  );
}

RequiredField.propTypes = {
  placeholder: PropTypes.string,
};

export default RequiredField;

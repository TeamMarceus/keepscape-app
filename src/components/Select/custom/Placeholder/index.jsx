import React from 'react';

import PropTypes from 'prop-types';
import { components } from 'react-select';

const { Placeholder } = components;

/* eslint-disable react/jsx-props-no-spreading  */
function CustomPlaceholder({ children, ...rest }) {
  return <Placeholder {...rest}>
    <h3>{children}</h3>
  </Placeholder>
}

CustomPlaceholder.propTypes = {
  children: PropTypes.any,
  data: PropTypes.shape({
    icon: PropTypes.element,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default CustomPlaceholder;

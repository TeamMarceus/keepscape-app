import React from 'react';

import PropTypes from 'prop-types';

import Effects from './effects';

export default function AuthenticationLayout({ children }) {
  return <Effects>{children}</Effects>;
}

AuthenticationLayout.propTypes = {
  children: PropTypes.node,
};

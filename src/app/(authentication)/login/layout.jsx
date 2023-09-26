import React from 'react';

import PropTypes from 'prop-types';

import LoginEffects from './effects';

export const metadata = {
  title: 'Login | keepscape',
};

export default function LoginLayout({ children }) {
  return <LoginEffects>{children}</LoginEffects>;
}

LoginLayout.propTypes = {
  children: PropTypes.any,
};

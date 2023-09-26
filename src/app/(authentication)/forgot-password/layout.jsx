import React from 'react';

import PropTypes from 'prop-types';

import ForgotPasswordEffects from './effects';

export const metadata = {
  title: 'Forgot Password | keepscape',
};

export default function ForgotPasswordLayout({ children }) {
  return <ForgotPasswordEffects>{children}</ForgotPasswordEffects>;
}

ForgotPasswordLayout.propTypes = {
  children: PropTypes.any,
};

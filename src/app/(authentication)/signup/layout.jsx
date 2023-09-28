import React from 'react';

import PropTypes from 'prop-types';

import SignupEffects from './effects';

export const metadata = {
  title: 'Sign Up | Keepscape',
};

export default function SignupLayout({ children }) {
  return <SignupEffects>{children}</SignupEffects>;
}

SignupLayout.propTypes = {
  children: PropTypes.any,
};

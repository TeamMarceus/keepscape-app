import React from 'react';

import PropTypes from 'prop-types';

import LandingEffects from './effects';

export const metadata = {
  title: 'Keepscape Philippines | Souvenir Shop',
};

export default function LandingLayout({ children }) {
  return <LandingEffects>{children}</LandingEffects>;
}

LandingLayout.propTypes = {
  children: PropTypes.any,
};

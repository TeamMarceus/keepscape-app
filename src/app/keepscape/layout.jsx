import React from 'react';

import PropTypes from 'prop-types';

import KeepscapeEffects from './effects';

export const metadata = {
  title: 'Keepscape Philippines | Souvenir Shop',
};

export default function KeepscapeLayout({ children }) {
  return <KeepscapeEffects>{children}</KeepscapeEffects>;
}

KeepscapeLayout.propTypes = {
  children: PropTypes.any,
};

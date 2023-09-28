import React from 'react';

import PropTypes from 'prop-types';

import GiftGiverEffects from './effects';

export const metadata = {
  title: 'Keepscape Philippines | Buyer',
};

export default function GiftGiverLayout({ children }) {
  return <GiftGiverEffects>{children}</GiftGiverEffects>;
}

GiftGiverLayout.propTypes = {
  children: PropTypes.any,
};

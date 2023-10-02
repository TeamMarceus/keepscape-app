import React from 'react';

import PropTypes from 'prop-types';

import BuyerEffects from './effects';

export const metadata = {
  title: 'Keepscape Philippines | Buyer',
};

export default function BuyerLayout({ children }) {
  return <BuyerEffects>{children}</BuyerEffects>;
}

BuyerLayout.propTypes = {
  children: PropTypes.any,
};

import React from 'react';

import PropTypes from 'prop-types';

import SellerEffects from './effects';

export const metadata = {
  title: 'Keepscape Philippines | Seller',
};

export default function SellerLayout({ children }) {
  return <SellerEffects>{children}</SellerEffects>;
}

SellerLayout.propTypes = {
  children: PropTypes.any,
};

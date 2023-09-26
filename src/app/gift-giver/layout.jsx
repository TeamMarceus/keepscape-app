import React from 'react';

import PropTypes from 'prop-types';

import GiftGiverEffects from './effects';

export const metadata = {
  title: 'Gift Giver | keepscape',
};

export default function GiftGiverLayout({ children }) {
  return <GiftGiverEffects>{children}</GiftGiverEffects>;
}

GiftGiverLayout.propTypes = {
  children: PropTypes.any,
};

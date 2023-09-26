import React from 'react';

import PropTypes from 'prop-types';

import GiftEffects from './effects';

export const metadata = {
  title: 'Gift | keepscape',
};

export default function GiftLayout({ children }) {
  return <GiftEffects>{children}</GiftEffects>;
}

GiftLayout.propTypes = {
  children: PropTypes.any,
};

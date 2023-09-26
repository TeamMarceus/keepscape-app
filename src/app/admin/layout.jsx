import React from 'react';

import PropTypes from 'prop-types';

import AdminEffects from './effects';

export const metadata = {
  title: 'Admin | keepscape',
};

export default function AdminLayout({ children }) {
  return <AdminEffects>{children}</AdminEffects>;
}

AdminLayout.propTypes = {
  children: PropTypes.any,
};

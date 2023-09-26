'use client';

import PropTypes from 'prop-types';

export default function ErrorPage({ error }) {
  return error;
}

ErrorPage.propTypes = {
  error: PropTypes.any,
};

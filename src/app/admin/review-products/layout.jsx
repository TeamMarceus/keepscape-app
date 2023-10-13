import PropTypes from 'prop-types';

export const metadata = {
  title: 'Review Products | Admin',
};

export default function ReviewProductsLayout({ children }) {
  return children;
}

ReviewProductsLayout.propTypes = {
  children: PropTypes.any,
};

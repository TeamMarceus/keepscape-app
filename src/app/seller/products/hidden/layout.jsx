import PropTypes from 'prop-types';

export const metadata = {
  title: 'Hidden Products | Seller',
};

export default function HiddenProductsLayout({ children }) {
  return children;
}

HiddenProductsLayout.propTypes = {
  children: PropTypes.any,
};

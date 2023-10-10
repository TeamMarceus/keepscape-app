import PropTypes from 'prop-types';

export const metadata = {
  title: 'Product | Seller',
};

export default function ProductLayout({ children }) {
  return children;
}

ProductLayout.propTypes = {
  children: PropTypes.any,
};

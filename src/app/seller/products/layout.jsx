import PropTypes from 'prop-types';

export const metadata = {
  title: 'Products | Seller',
};

export default function ProductsLayout({ children }) {
  return children;
}

ProductsLayout.propTypes = {
  children: PropTypes.any,
};

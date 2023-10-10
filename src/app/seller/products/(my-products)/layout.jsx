import PropTypes from 'prop-types';

export const metadata = {
  title: 'My Products | Seller',
};

export default function MyProductsLayout({ children }) {
  return children;
}

MyProductsLayout.propTypes = {
  children: PropTypes.any,
};

import PropTypes from 'prop-types';

export const metadata = {
  title: 'My Orders | Seller',
};

export default function MyOrdersLayout({ children }) {
  return children;
}

MyOrdersLayout.propTypes = {
  children: PropTypes.any,
};

import PropTypes from 'prop-types';

export const metadata = {
  title: 'Orders | Seller',
};

export default function OrdersLayout({ children }) {
  return children;
}

OrdersLayout.propTypes = {
  children: PropTypes.any,
};

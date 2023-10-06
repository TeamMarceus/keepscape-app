import PropTypes from 'prop-types';

export const metadata = {
  title: 'Order History | Seller',
};

export default function HistoryOrdersLayout({ children }) {
  return children;
}

HistoryOrdersLayout.propTypes = {
  children: PropTypes.any,
};

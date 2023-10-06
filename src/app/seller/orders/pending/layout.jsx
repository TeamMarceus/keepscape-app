import PropTypes from 'prop-types';

export const metadata = {
  title: 'Pending Orders | Seller',
};

export default function PendingOrdersLayout({ children }) {
  return children;
}

PendingOrdersLayout.propTypes = {
  children: PropTypes.any,
};

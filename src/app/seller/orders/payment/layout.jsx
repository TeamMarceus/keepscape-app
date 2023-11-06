import PropTypes from 'prop-types';

export const metadata = {
  title: 'Pending Payments | Seller',
};

export default function PendingPaymentsLayout({ children }) {
  return children;
}

PendingPaymentsLayout.propTypes = {
  children: PropTypes.any,
};

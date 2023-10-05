import PropTypes from 'prop-types';

export const metadata = {
  title: 'Dashboard | Seller',
};

export default function SellerDashboardLayout({ children }) {
  return children;
}

SellerDashboardLayout.propTypes = {
  children: PropTypes.any,
};

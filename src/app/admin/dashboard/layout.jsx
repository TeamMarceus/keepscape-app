import PropTypes from 'prop-types';

export const metadata = {
  title: 'Dashboard | Admin',
};

export default function AdminDashboardLayout({ children }) {
  return children;
}

AdminDashboardLayout.propTypes = {
  children: PropTypes.any,
};

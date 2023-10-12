import PropTypes from 'prop-types';

export const metadata = {
  title: 'Seller Applications | Admin',
};

export default function SellerApplicationsLayout({ children }) {
  return children;
}

SellerApplicationsLayout.propTypes = {
  children: PropTypes.any,
};

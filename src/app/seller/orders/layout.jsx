import PropTypes from 'prop-types';

export const metadata = {
  title: 'Orders | Seller',
};

export default function OrderLayout({ children }) {
  return children;
}

OrderLayout.propTypes = {
  children: PropTypes.any,
};

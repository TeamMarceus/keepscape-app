import PropTypes from 'prop-types';

export const metadata = {
  title: 'Keepscape Checkout | Buyer',
};

export default function CheckoutLayout({ children }) {
  return children;
}

CheckoutLayout.propTypes = {
  children: PropTypes.any,
};

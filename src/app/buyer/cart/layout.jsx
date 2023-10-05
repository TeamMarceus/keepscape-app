import PropTypes from 'prop-types';

export const metadata = {
  title: 'Keepscape Cart | Buyer',
};

export default function CartLayout({ children }) {
  return children;
}

CartLayout.propTypes = {
  children: PropTypes.any,
};

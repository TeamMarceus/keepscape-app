import PropTypes from 'prop-types';

export const metadata = {
  title: 'Buyers | Admin',
};

export default function BuyersLayout({ children }) {
  return children;
}

BuyersLayout.propTypes = {
  children: PropTypes.any,
};

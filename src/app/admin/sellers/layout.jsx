import PropTypes from 'prop-types';

export const metadata = {
  title: 'Sellers | Admin',
};

export default function SellersLayout({ children }) {
  return children;
}

SellersLayout.propTypes = {
  children: PropTypes.any,
};

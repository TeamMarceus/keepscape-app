import PropTypes from 'prop-types';

export const metadata = {
  title: 'Account Information | Seller',
};

export default function AccountLayout({ children }) {
  return children;
}

AccountLayout.propTypes = {
  children: PropTypes.any,
};

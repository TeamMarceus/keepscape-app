import PropTypes from 'prop-types';

export const metadata = {
  title: 'Account Information | Buyer',
};

export default function AccountLayout({ children }) {
  return children;
}

AccountLayout.propTypes = {
  children: PropTypes.any,
};

import PropTypes from 'prop-types';

export const metadata = {
  title: 'Paid Finance | Admin',
};

export default function PaidFinanceLayout({ children }) {
  return children;
}

PaidFinanceLayout.propTypes = {
  children: PropTypes.any,
};

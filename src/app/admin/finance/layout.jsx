import PropTypes from 'prop-types';

export const metadata = {
  title: 'Finance | Admin',
};

export default function FinanceLayout({ children }) {
  return children;
}

FinanceLayout.propTypes = {
  children: PropTypes.any,
};

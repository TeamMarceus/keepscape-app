import PropTypes from 'prop-types';

export const metadata = {
  title: 'Review Orders | Admin',
};

export default function ReviewOrdersLayout({ children }) {
  return children;
}

ReviewOrdersLayout.propTypes = {
  children: PropTypes.any,
};

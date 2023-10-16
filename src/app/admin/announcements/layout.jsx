import PropTypes from 'prop-types';

export const metadata = {
  title: 'Announcements | Admin',
};

export default function AnnouncementsLayout({ children }) {
  return children;
}

AnnouncementsLayout.propTypes = {
  children: PropTypes.any,
};

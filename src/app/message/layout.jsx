import PropTypes from 'prop-types';

import styles from './styles.module.scss';

export const metadata = {
  title: 'Keepscape Philippines | Message',
};

export default function MessageLayout({ children }) {
  return <section className={styles.container}>
    {children}
  </section>;
}

MessageLayout.propTypes = {
  children: PropTypes.any,
};

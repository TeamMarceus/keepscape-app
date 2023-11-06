import PropTypes from 'prop-types';

import styles from './styles.module.scss';

export const metadata = {
  title: 'Keepscape Philippines | Gift',
};

export default function GiftLayout({ children }) {
  return <section className={styles.container}>
    {children}
  </section>;
}

GiftLayout.propTypes = {
  children: PropTypes.any,
};

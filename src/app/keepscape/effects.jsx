'use client';

import PropTypes from 'prop-types';

import styles from './styles.module.scss';

export default function GiftEffects({ children }) {

  return (
  <section className={styles.container}>
    {children}
  </section>
  );
}

GiftEffects.propTypes = {
  children: PropTypes.node,
};
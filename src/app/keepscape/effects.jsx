'use client';

import PropTypes from 'prop-types';

import { Navbar } from '@/components';

import styles from './styles.module.scss';

export default function KeepscapeEffects({ children }) {

  return (
  <section className={styles.container}>
    <Navbar />
    {children}
  </section>
  );
}

KeepscapeEffects.propTypes = {
  children: PropTypes.node,
};
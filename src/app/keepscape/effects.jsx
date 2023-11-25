'use client';

import PropTypes from 'prop-types';

import { Footer, Navbar } from '@/components';

import styles from './styles.module.scss';

export default function KeepscapeEffects({ children }) {
  return (
    <>
      <Navbar />
      <section className={styles.container}>{children}</section>
      <Footer />
    </>
  );
}

KeepscapeEffects.propTypes = {
  children: PropTypes.node,
};

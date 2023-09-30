'use client';

import PropTypes from 'prop-types';

import { userTypes } from '@/app-globals';
import { Footer, Navbar } from '@/components';
import { usePrivateRoute } from '@/hooks';

import styles from './styles.module.scss';

export default function GiftGiverEffects({ children }) {
  usePrivateRoute({ forUserType: userTypes.BUYER });

  return (
    <>
      <Navbar />
      <section className={styles.container}>
        {children}
      </section>
      <Footer />
    </>
  );
}

GiftGiverEffects.propTypes = {
  children: PropTypes.node,
};
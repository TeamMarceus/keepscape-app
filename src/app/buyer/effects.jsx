'use client';

import PropTypes from 'prop-types';

import { userTypes } from '@/app-globals';
import { usePrivateRoute } from '@/hooks';

import styles from './styles.module.scss';

export default function GiftGiverEffects({ children }) {
  usePrivateRoute({ forUserType: userTypes.BUYER });

  return (
  <section className={styles.container}>
    {children}
  </section>
  );
}

GiftGiverEffects.propTypes = {
  children: PropTypes.node,
};
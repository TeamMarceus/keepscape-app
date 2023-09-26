'use client';

import PropTypes from 'prop-types';

import { userTypes } from '@/app-globals';
import { usePrivateRoute } from '@/hooks';

import styles from './styles.module.scss';

export default function AdminEffects({ children }) {
  usePrivateRoute({ forUserType: userTypes.ADMIN });

  return (
  <section className={styles.container}>
    {children}
  </section>
  );
}

AdminEffects.propTypes = {
  children: PropTypes.node,
};
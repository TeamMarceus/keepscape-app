'use client';

import React from 'react';

import Image from 'next/image';

import Hero from '%/images/Misc/hero.png';

import { colorClasses, textTypes } from '@/app-globals';
import { ButtonLink, Navbar, Text } from '@/components';
import { actions as questionsActions } from '@/ducks/reducers/questions';
import { actions as productsActions } from '@/ducks/reducers/suggestions';
import { useActionDispatch } from '@/hooks';

import styles from './styles.module.scss';

export default function LandingPage() {

  const productsRestart = useActionDispatch(
    productsActions.productActions.productRestart
  );

  const questionsRestart = useActionDispatch(
    questionsActions.questionActions.questionRestart
  );

 return (
  <>
    <Navbar />
    <section className={styles.LandingPage}>
        test
    </section>
  </>
  );
}

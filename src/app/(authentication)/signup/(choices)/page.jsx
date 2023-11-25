'use client';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Keychain from '%/images/Misc/keychain.png';
import Cart from '%/images/Misc/shopping-cart.png';

import { buttonTypes, colorClasses, textTypes } from '@/app-globals';
import { ButtonLink, Card, CardLink, Icon, Text } from '@/components';

import styles from './styles.module.scss';

export default function ChoicesPage() {
  const router = useRouter();

  return (
    <section className={styles.ChoicesPage}>
      <Text type={textTypes.HEADING.SM}>Which type of Keepscaper are you?</Text>

      <div className={styles.ChoicesPage_choices}>
        <div className={styles.ChoicesPage_choice}>
          <Card
            isClickable
            className={styles.ChoicesPage_choice_card}
            onClick={() => router.push('/signup/seller')}
          >
            <Image alt="Keychain" height={200} src={Keychain} width={200} />
          </Card>
          <Text type={textTypes.HEADING.XXS}>
            I am interested in selling souvenirs
          </Text>
        </div>

        <div className={styles.ChoicesPage_choice}>
          <Card
            isClickable
            className={styles.ChoicesPage_choice_card}
            onClick={() => router.push('/signup/buyer')}
          >
            <Image alt="Shopping Cart" height={200} src={Cart} width={200} />
          </Card>
          <Text type={textTypes.HEADING.XXS}>
            I am interested in buying souvenirs
          </Text>
        </div>
      </div>

      <ButtonLink
        className={styles.ChoicesPage_back}
        icon="arrow_back"
        to="/login"
        type={buttonTypes.TEXT.BLUE}
      >
        Back to Login
      </ButtonLink>
    </section>
  );
}

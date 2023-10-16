'use client';

import React from 'react';

import { textTypes, userStatus } from '@/app-globals';
import { ButtonLink, Text } from '@/components';

import styles from './styles.module.scss';


export default function SellerApplication() {
  const status = 'pending';

  return (
    <section className={styles.SellerApplication}>
        <Text 
          className={styles.SellerApplication_header}
          type={textTypes.HEADING.MD}
        >
           {status === userStatus.PENDING && 'Seller Application'}
           {status === userStatus.DENIED && 'Application Denied'}
        </Text>

        <Text 
           className={styles.SellerApplication_body}
          type={textTypes.BODY.LG}
        >
          {status === userStatus.PENDING &&
           'Your application has been sent. We will contact you via email about the status of your application as soon as possible.'}

          {status === userStatus.DENIED  &&
            'If you believe this is mistaken, please contact us through our email with your appeal, and refer us with the ID: 1234567890'}
        </Text>

        <ButtonLink
          className={styles.SellerApplication_button}
          icon="arrow_back"
          to="/login"
        >
          Back to Login
        </ButtonLink>
    </section>
  );
}
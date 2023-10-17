'use client';

import React from 'react';

import { useSearchParams } from 'next/navigation';

import { textTypes, userStatus } from '@/app-globals';
import { ButtonLink, Text } from '@/components';

import styles from './styles.module.scss';


export default function SellerApplication() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');

  return (
    <section className={styles.SellerApplication}>
        <Text 
          className={styles.SellerApplication_header}
          type={textTypes.HEADING.MD}
        >
           {status === userStatus.PENDING && 'Seller Application'}
           {status === userStatus.REJECTED && 'Application Denied'}
           {status === userStatus.BANNED && 'Account Banned'}
        </Text>

        <Text 
           className={styles.SellerApplication_body}
          type={textTypes.BODY.LG}
        >
          {status === userStatus.PENDING &&
           'Your application has been sent. We will contact you via email about the status of your application as soon as possible.'}

          {(status === userStatus.REJECTED || status === userStatus.BANNED ) &&
            'If you believe this is mistaken, please contact us through our email keepscale.ecommerce@gmail.com with your appeal '}
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
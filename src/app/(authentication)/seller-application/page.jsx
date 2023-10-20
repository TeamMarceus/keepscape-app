'use client';

import React from 'react';

import { useSelector } from 'react-redux';

import { colorClasses, textTypes, userStatus } from '@/app-globals';
import { ButtonLink, Text } from '@/components';

import { getUser } from '@/ducks';

import styles from './styles.module.scss';


export default function SellerApplication() {
  const user = useSelector((store) => getUser(store));
  console.log(user)

  return (
    <section className={styles.SellerApplication}>
        <Text 
          className={styles.SellerApplication_header}
          type={textTypes.HEADING.MD}
        >
           {user.userStatus === userStatus.PENDING && 'Seller Application'}
           {user.userStatus === userStatus.REJECTED && 'Application Rejected'}
           {user.userStatus === userStatus.BANNED && 'Account Banned'}
        </Text>

        <Text
          className={styles.SellerApplication_reason}
          colorClass={colorClasses.NEUTRAL['400']}
          type={textTypes.HEADING.XXS}
        >
          {user.reason}
        </Text>

        <Text 
           className={styles.SellerApplication_body}
          type={textTypes.BODY.LG}
        >
          {user.userStatus === userStatus.PENDING &&
           'Your application has been sent. We will contact you via email about the status of your application as soon as possible.'}

          {(user.userStatus === userStatus.REJECTED || user.userStatus === userStatus.BANNED ) &&
              (
                <>
                  If you believe this is mistaken, please contact us through our email {' '}
                  <span className={styles.SellerApplication_span}>
                    keepscale.ecommerce@gmail.com   
                  </span> {' '}
                  with your appeal 
                </>
              )
            }
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
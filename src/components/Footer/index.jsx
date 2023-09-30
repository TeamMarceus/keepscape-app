import React from 'react';

import Image from 'next/image';
import { Link } from 'react-scroll';

import Logo from '%/images/Logo/logo-name.svg'

import ph from '%/images/Misc/ph.png'
import { Text } from '@/components';

import styles from './styles.module.scss';

function Footer() {
  return (
    <footer className={styles.Footer}>
      <div className={styles.Footer_container}>
        <Link
          smooth
          className={styles.Footer_logo}
          duration={700}
          offset={-200}
          to="home"
        >
          <Image
            alt="Logo"
            className={styles.Footer_logo_img}
            height={40}
            src={Logo}
          />
        </Link>

          <Text className={styles.Footer_info_text}>
            Contact us at keepscape.ecommerce@gmail.com | All Rights Reserved 2023{' '}
            <Image
              alt="🇵🇭"
              className={styles.Footer_info_text_flag}
              height={16}
              src={ph}
              width={16}
            />
          </Text>
      </div>
    </footer>
  );
}
export default Footer;

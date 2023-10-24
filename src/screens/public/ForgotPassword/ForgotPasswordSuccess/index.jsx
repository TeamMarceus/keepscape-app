import Image from 'next/image';

import Success from '%/images/Misc/success.png';
import { textTypes } from '@/app-globals';
import { ButtonLink, Text } from '@/components';

import styles from './styles.module.scss';

function ForgotPasswordSuccess() {
  return (
    <div className={styles.ForgotPasswordSuccess}>
      <Image
        alt='Success'
        className={styles.ForgotPasswordSuccess_image}
        src={Success}
      />

      <div className={styles.ForgotPasswordSuccess_header}>
        <Text type={textTypes.HEADING.LG} >
          Success!
        </Text>

        <Text type={textTypes.BODY.LG}>
          You have successfully changed your password. You can now <br/>
          login with that new password
        </Text>
      </div>

      <ButtonLink 
        className={styles.ForgotPasswordSuccess_button}
        to='/login' 
      >
        Go To Login
      </ButtonLink>
    </div>
  );
};


export default ForgotPasswordSuccess;

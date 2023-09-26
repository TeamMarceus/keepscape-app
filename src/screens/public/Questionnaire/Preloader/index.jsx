
import PropTypes from 'prop-types'; 

import { textTypes } from '@/app-globals';
import { Text } from '@/components';

import styles from './styles.module.scss';

function Preloader({name}) {

  return (
    <section className={styles.Preloader}>
      <div className={styles.Preloader_spinner} />
      <Text type={textTypes.HEADING.LG}>
        We are generating the{' '}
        <span className={styles.Preloader_blue}>
          top 3 gift <br /> suggestions
        </span>{' '}
        for <span className={styles.Preloader_blue}>{name}</span>
      </Text>
    </section>
  );
}

Preloader.propTypes = {
    name: PropTypes.string.isRequired
}

export default Preloader;
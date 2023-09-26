import Image from 'next/image';

import PropTypes from 'prop-types';

import NoResults from '%/images/Misc/no-results.webp';
import { colorClasses, textTypes } from '@/app-globals';

import { ButtonLink, Text } from '@/components';


import styles from './styles.module.scss';

function PageNotFound({buttonText, buttonLink}) {
  return (
    <div className={styles.PageNotFound}>
      <Image
        alt="No Contacts"
        className={styles.PageNotFound_image}
        height={300}
        src={NoResults}
        width={380}
      />
      <Text
        className={styles.PageNotFound_404}
        colorClass={colorClasses.NEUTRAL['400']}
        type={textTypes.HEADING.XXL}
      >
        404
      </Text>
      <Text colorClass={colorClasses.BLUE['400']} type={textTypes.HEADING.XS}>
        PAGE NOT FOUND
      </Text>

      <ButtonLink
        className={styles.PageNotFound_button}
        icon="arrow_back"
        to={buttonLink}
      >
        {buttonText}
      </ButtonLink>
    </div>
  );
}

PageNotFound.propTypes = {
  buttonText: PropTypes.string.isRequired,
  buttonLink: PropTypes.string.isRequired,
};


export default PageNotFound;

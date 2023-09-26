import Link from 'next/link';
import PropTypes from 'prop-types';

import { textTypes } from '@/app-globals';

import Text from '../Text';

import styles from './styles.module.scss';

function Breadcrumbs({ pageTitle, pages, target = '_self' }) {
  return <div className={styles.Breadcrumbs}>
    <Text type={textTypes.HEADING.XS}>{pageTitle}</Text>

    <div className={styles.Breadcrumbs_links}>
      {pages.map(({ name, link }, index) => (
        <div key={index} className={styles.Breadcrumbs_links_keyWrapper}>
          <Link className={styles.Breadcrumbs_links_link} href={link} target={target}>
            {name}
          </Link>
          <Text className={styles.Breadcrumbs_links_linkSeparator}>/</Text>
        </div>
      ))}
      {pageTitle}
    </div>
  </div>
}

Breadcrumbs.propTypes = {
  // Current page name
  pageTitle: PropTypes.string.isRequired,
  // Pages excluding the current page
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ),
  target: PropTypes.oneOf(['_blank', '_self']),
};

export default Breadcrumbs;

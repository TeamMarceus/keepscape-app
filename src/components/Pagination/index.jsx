import React from 'react';

import cn from 'classnames';

import PropTypes from 'prop-types';

import IconButton from '../Button/IconButton';

import Numbers from './Numbers';

import styles from './styles.module.scss';

const SKIP_NAVIGATE_STEP = 5;

function Pagination({
  className,
  currentPage,
  totalPages,
  pageJump,
  hasNewUnloadedData = false,
}) {
  return (
    totalPages > 1 && (
      <div className={cn(styles.Pagination, className)}>
        <IconButton
          className={styles.Pagination_iconButton}
          disabled={currentPage === 1}
          icon="first_page"
          onClick={() => {
            pageJump(
              currentPage - SKIP_NAVIGATE_STEP >= 1
                ? currentPage - SKIP_NAVIGATE_STEP
                : 1
            );
          }}
        />

        <IconButton
          className={styles.Pagination_iconButton}
          disabled={currentPage === 1}
          icon="chevron_left"
          id="chevronLeftButton"
          onClick={() => {
            pageJump(currentPage - 1 === 0 ? 1 : currentPage - 1);
          }}
        />

        <Numbers
          currentPage={currentPage}
          hasNewUnloadedData={hasNewUnloadedData}
          pageJump={pageJump}
          totalPages={totalPages}
        />

        <IconButton
          className={styles.Pagination_iconButton}
          disabled={currentPage === totalPages}
          icon="chevron_right"
          id="chevronRightButton"
          onClick={() => {
            pageJump(
              currentPage + 1 > totalPages ? totalPages : currentPage + 1
            );
          }}
        />

        <IconButton
          className={styles.Pagination_iconButton}
          disabled={currentPage === totalPages}
          icon="last_page"
          id="lastPageButton"
          onClick={() => {
            pageJump(
              currentPage + SKIP_NAVIGATE_STEP <= totalPages
                ? currentPage + SKIP_NAVIGATE_STEP
                : totalPages
            );
          }}
        />
      </div>
    )
  );
}

Pagination.propTypes = {
  className: PropTypes.string,
  // the current page number being accessed (1 - based)
  currentPage: PropTypes.number.isRequired,

  // the total number of pages
  totalPages: PropTypes.number.isRequired,

  // function that updates the current page number
  pageJump: PropTypes.func.isRequired,

  // true if there is new unloaded data in page 1
  hasNewUnloadedData: PropTypes.bool,
};

export default Pagination;

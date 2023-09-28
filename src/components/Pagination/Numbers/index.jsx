import React from 'react';

import classNames from 'classnames';

import PropTypes from 'prop-types';

import styles from './styles.module.scss';

function Numbers({ totalPages, currentPage, pageJump, hasNewUnloadedData }) {
  const pageNumbers = [];
  let start = null;
  let end = null;

  // checks if total number of pages is more than 5
  if (totalPages > 5) {
    // ternary operator that decides from which page number to start rendering
    start = currentPage > 2 ? currentPage - 2 : 1;
    // ternary operator that decides from which page number to stop rendering
    end = currentPage + 2 < totalPages ? currentPage + 2 : totalPages;
    // loop for adding page numbers to array
    for (let i = start; i <= end; i++) {
      const number = (
        <button
          key={`Number-Item-${i}`}
          className={classNames({
            [styles.Numbers_number___hasNewUnloadedData]:
              hasNewUnloadedData && i === 1,
            [styles.Numbers___active]: currentPage === i,
            [styles.Numbers]: currentPage !== i,
          })}
          data-test={`button-${i}`}
          id={`Number-Item-${i}`}
          // when clicked, will jump to the page number it points to
          type="button"
          onClick={currentPage !== i ? () => pageJump(i) : null}
        >
          {i}
        </button>
      );
      // pushes page number to final list array of page numbers
      pageNumbers.push(number);
    }

    // if first check failed, that means the totalPages is less than or equal to 5,
    // so we need to make sure if it actually has content greater than or equal to 1 page
  } else if (totalPages >= 1) {
    // this time, we wouldn't need a start and end since we are sure that the totalPages
    // is less than or equal to 5
    // loop for adding page numbers to array
    for (let i = 1; i <= totalPages; i++) {
      const number = (
        <button
          key={`Number-Item-${i}`}
          className={classNames({
            [styles.Numbers_number___hasNewUnloadedData]:
              hasNewUnloadedData && i === 1,
            [styles.Numbers___active]: currentPage === i,
            [styles.Numbers]: currentPage !== i,
          })}
          data-test={`button-${i}`}
          id={`Number-Item-${i}`}
          // when clicked, will jump to the page number it points to
          type="button"
          onClick={currentPage !== i ? () => pageJump(i) : null}
        >
          {i}
        </button>
      );
      pageNumbers.push(number);
    }
  }

  return pageNumbers;
}

Numbers.propTypes = {
  // the total number of pages to be displayed
  totalPages: PropTypes.number.isRequired,

  // the current page number being accessed
  currentPage: PropTypes.number.isRequired,

  // function that will go to a certain page given
  // the page number
  pageJump: PropTypes.func.isRequired,

  // true if there is new data in page 1
  hasNewUnloadedData: PropTypes.bool.isRequired,
};

export default Numbers;

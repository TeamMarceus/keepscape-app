import React, { useState } from 'react';

import cn from 'classnames';
import { isEmpty } from 'lodash-es';
import { useRouter, useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';

import { buttonKinds, buttonTypes, colorClasses, inputKinds, textTypes } from '@/app-globals';

import Button from '../Button';
import Checkbox from '../Checkbox';
import Icon from '../Icon';
import ControlledInput from '../Input/Controlled';
import  RatingStars from '../RatingStars';
import Text from '../Text';

import styles from './styles.module.scss';

const validate = (values) => {
  const errors = {};

  if (!values.minimumPrice || !values.maximumPrice) {
    errors.overall = 'Please fill out all fields.';
  }

  if (Number(values.minimumPrice) > Number(values.maximumPrice)) {
    errors.overall = 'Please input valid price range.';
  }

  return errors;
};

function Filters({
  className = null,
  icon = null,
  title,
  type,
  checkboxes = null,
  hasRatings = false,
  hasPriceRange = false,
  category = null,
  province = null,
  route,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams.toString());

  let checkboxSearch = null;
  
  if (province) { 
    checkboxSearch = 'category';
  }
  if (category) {
    checkboxSearch = 'province';
  }

  const checkBoxParams = newSearchParams.getAll(checkboxSearch);

  const ratings = newSearchParams.get('ratings');
  const minimumPriceParam = newSearchParams.get('minimumPrice');
  const maximumPriceParam = newSearchParams.get('maximumPrice');

  const [ minimumPrice, setMinimumPrice ] = useState(minimumPriceParam || 0);
  const [ maximumPrice, setMaximumPrice ] = useState(maximumPriceParam || 0);
  const [ errors, setErrors ] = useState({});

  return (
    <div className={cn(styles.Filters, className)}>
      <div className={styles.Filters_header}>
        <Icon 
          className={styles.Filters_header_icon}
          icon={icon}
        />

        <Text type={textTypes.HEADING.XXS}>
          {title}
        </Text>
      </div>

      {checkboxes != null &&
        <div className={styles.Filters_checkboxes}>
          <Text type={textTypes.HEADING.XXXS}>
            {type}
          </Text>

          {checkboxes && checkboxes.map((checkbox) => (
            <Checkbox
              key={checkbox.name}
              checked={checkbox.isChecked}
              className={styles.Filters_checkboxes_checkbox}
              label={checkbox.label}
              name={checkbox.name}
              onChange={() => {
                if (checkBoxParams.includes(checkbox.name)) {
                  newSearchParams.delete(checkboxSearch, checkbox.name);
                } else {
                  newSearchParams.append(checkboxSearch, checkbox.name);
                }

                router.push(`${route}?${newSearchParams.toString()}`, { scroll: false })
              }}
            />
          ))}
        </div>
      }

      {hasRatings && (
        <div className={styles.Filters_ratings}>
          <Text type={textTypes.HEADING.XXXS}>
            By Ratings
          </Text>

          <Button
            className={cn(styles.Filters_ratings_stars, 
                      ratings === '5' && styles.Filters_ratings_stars_active)}
            onClick={() => {
              if (ratings === '5') {
                newSearchParams.delete('ratings');
              } else {
                newSearchParams.delete('ratings');
                newSearchParams.append('ratings', '5');
              }
              router.push(`${route}?${newSearchParams.toString()}`, { scroll: false })
            }}
          >
            <RatingStars className={styles.Filters_ratings_stars_last} rating={5} />
          </Button>

          <Button
            className={cn(styles.Filters_ratings_stars, 
                      ratings === '4' && styles.Filters_ratings_stars_active)}
            onClick={() => {
              if (ratings === '4') {
                newSearchParams.delete('ratings');
              } else {
                newSearchParams.delete('ratings');
                newSearchParams.append('ratings', '4');
              }
              router.push(`${route}?${newSearchParams.toString()}`, { scroll: false })
            }}
          >
            <RatingStars className={styles.Filters_ratings_stars_last} rating={4} /> & Up
          </Button>

          <Button
            className={cn(styles.Filters_ratings_stars, 
                      ratings === '3' && styles.Filters_ratings_stars_active)}
            onClick={() => {
              if (ratings === '3') {
                newSearchParams.delete('ratings');
              } else {
                newSearchParams.delete('ratings');
                newSearchParams.append('ratings', '3');
              }
              router.push(`${route}?${newSearchParams.toString()}`, { scroll: false })
            }}
          >
            <RatingStars className={styles.Filters_ratings_stars_last} rating={3} />& Up
          </Button>

          <Button
            className={cn(styles.Filters_ratings_stars, 
                      ratings === '2' && styles.Filters_ratings_stars_active)}
            onClick={() => {
              if (ratings === '2') {
                newSearchParams.delete('ratings');
              } else {
                newSearchParams.delete('ratings');
                newSearchParams.append('ratings', '2');
              }
              router.push(`${route}?${newSearchParams.toString()}`, { scroll: false })
            }}
          >
            <RatingStars className={styles.Filters_ratings_stars_last} rating={2} /> & Up
          </Button>

          <Button
            className={cn(styles.Filters_ratings_stars, 
                      ratings === '1' && styles.Filters_ratings_stars_active)}
            onClick={() => {
              if (ratings === '1') {
                newSearchParams.delete('ratings');
              } else {
                newSearchParams.delete('ratings');
                newSearchParams.append('ratings', '1');
              }
              router.push(`${route}?${newSearchParams.toString()}`, { scroll: false })
            }}
          >
            <RatingStars className={styles.Filters_ratings_stars_last} rating={1} /> & Up
          </Button>
        </div>
      )}

      {hasPriceRange && (
        <div className={styles.Filters_priceRange}>
          <Text type={textTypes.HEADING.XXXS}>
            By Price Range
          </Text>

          <form 
            onSubmit={(event) => {
                event.preventDefault();

                const currentErrors = validate({ minimumPrice, maximumPrice });
                if (!isEmpty(currentErrors)) {
                  setErrors(currentErrors);
                  return;
                }

                newSearchParams.delete('minimumPrice');
                newSearchParams.delete('maximumPrice');
                newSearchParams.append('minimumPrice', minimumPrice);
                newSearchParams.append('maximumPrice', maximumPrice);
                router.push(`${route}?${newSearchParams.toString()}`, { scroll: false })
                
              }
            }
          >
            <div className={styles.Filters_priceRange_inputs}>
              <ControlledInput
                className={styles.Filters_priceRange_input}
                kind={inputKinds.NUMBER}
                name="minimumPrice"
                placeholder="₱MIN"
                value={minimumPrice}
                onChange={(event) => {
                  setErrors({});
                  setMinimumPrice(event.target.value);
                }}
              />
              
              -

              <ControlledInput
                className={styles.Filters_priceRange_input}
                kind={inputKinds.NUMBER}
                name="maximumPrice"
                placeholder="₱MAX"
                value={maximumPrice}
                onChange={(event) => {
                  setErrors({});
                  setMaximumPrice(event.target.value);
                }}
              />
            </div>

            {errors.overall && (
              <Text
                className={styles.Filters_priceRange_input_errorMessage}
                colorClass={colorClasses.RED['400']}
                type={textTypes.BODY.XS}
              >
                {errors.overall}
              </Text>
            )}

            <Button
              className={styles.Filters_priceRange_button}
              kind={buttonKinds.SUBMIT}
              onClick={()=>{}}
            >
              Apply
            </Button>
          </form>

          <Button
              className={styles.Filters_clear}
              type={buttonTypes.SECONDARY.BLUE}
              onClick={()=>{
                // Delete all filters
                newSearchParams.delete('minimumPrice');
                newSearchParams.delete('maximumPrice');
                newSearchParams.delete('ratings');
                newSearchParams.delete('province');
                newSearchParams.delete('category');
                router.push(`${route}?${newSearchParams.toString()}`, { scroll: false })
              }}
            >
             Clear All
          </Button>
        </div>
      )}
    </div>
  )
}

Filters.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  checkboxes: PropTypes.arrayOf(PropTypes.shape({
    checked: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
  })),
  hasRatings: PropTypes.bool,
  hasPriceRange: PropTypes.bool,
  category: PropTypes.string,
  province: PropTypes.string,
  route: PropTypes.string.isRequired,
}

export default Filters
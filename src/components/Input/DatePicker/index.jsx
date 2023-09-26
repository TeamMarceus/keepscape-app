import React from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { colorClasses, inputTypes, textTypes } from '@/app-globals';

import { Icon, Text } from '@/components';

import styles from '../input.module.scss';

function DatePicker({
  className = null,
  inputClassName = null,
  dateFormat,
  label = null,
  type = inputTypes.FORM,
  icon = null,
  name,
  selected = null,
  placeholder = null,
  helperText = null,
  success = null,
  error = null,
  disabled = false,
  onChange,
  onBlur = () => {},
  tabIndex = null,
  minDate,
  disableFutureDates = false,
}) {
  return <div className={cn(className, styles.Input_container)}>
    {label && type === inputTypes.SLIM && (
      <Text
        className={styles.Input___slim_label}
        colorClass={colorClasses.NEUTRAL['700']}
        type={textTypes.BODY.MD}
      >
        {label}
      </Text>
    )}

    <ReactDatePicker
      className={cn(inputClassName, styles[`Input___${type}`], {
        [styles[`Input___${type}___icon`]]: icon !== null,
        [styles.Input___success]: success !== null,
        [styles.Input___error]: error !== null,
      })}
      dateFormat={dateFormat}
      disabled={disabled}
      id={name}
      maxDate={disableFutureDates ? new Date() : undefined}
      minDate={minDate}
      name={name}
      selected={selected}
      tabIndex={tabIndex}
      onBlur={onBlur}
      onChange={onChange}
    />

    {placeholder && type === inputTypes.FORM && (
      <Text
        className={cn(styles.Input___form_label, {
          [styles.Input___form_label___active]: selected !== '',
        })}
        colorClass={colorClasses.NEUTRAL['500']}
        type={textTypes.BODY.MD}
      >
        {placeholder}
      </Text>
    )}

    {icon && <Icon className={styles[`Input___${type}_icon`]} icon={icon} />}

    {(helperText || success || error) && (
      <div className={styles.Input_helperTextContainer}>
        {helperText && (
          <Text
            colorClass={colorClasses.NEUTRAL['500']}
            type={textTypes.BODY.XS}
          >
            {helperText}
          </Text>
        )}

        {error && (
          <Text colorClass={colorClasses.RED['400']} type={textTypes.BODY.XS}>
            {error}
          </Text>
        )}

        {success && (
          <Text colorClass={colorClasses.GREEN['400']} type={textTypes.BODY.XS}>
            {success}
          </Text>
        )}
      </div>
    )}
  </div>
}

DatePicker.propTypes = {
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  dateFormat: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.oneOf([inputTypes.FORM, inputTypes.SLIM]),
  icon: PropTypes.string,
  name: PropTypes.string.isRequired,
  selected: PropTypes.instanceOf(Date),
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  success: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  tabIndex: PropTypes.number,
  minDate: PropTypes.instanceOf(Date),
  disableFutureDates: PropTypes.bool,
};

export default DatePicker;

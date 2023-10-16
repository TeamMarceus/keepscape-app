import React from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';
import Select from 'react-select';

import { colorClasses, selectTypes, textTypes } from '@/app-globals';

import Text from '../../Text'
import CustomOption from '../custom/Option';
import CustomSingleValue from '../custom/SingleValue';
import CustomValueContainer from '../custom/ValueContainer';
import formStyles from '../styles/formStyles';

import styles from './styles.module.scss';

function ControlledSelect({
  className,
  options,
  isMulti,
  name,
  type,
  label,
  value,
  placeholder,
  helperText,
  error,
  onChange,
  isClearable,
  disabled,
}) {
  return <div className={cn(className, styles.Select)} id={name}>
    {label && type === selectTypes.SLIM && (
      <Text
        className={styles.Select___slim_label}
        colorClass={colorClasses.NEUTRAL['700']}
        type={textTypes.BODY.MD}
      >
        {label}
      </Text>
    )}

    <Select
      className={cn(className, {
        [styles.Select___error]: error,
      })}
      components={{
        Option: CustomOption,
        SingleValue: CustomSingleValue,
        // eslint-disable-next-line react/display-name
        ValueContainer: (valueContainerProps) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <CustomValueContainer type={type} {...valueContainerProps} />
        ),
        IndicatorSeparator: null,
      }}
      isClearable={isClearable}
      isDisabled={disabled}
      isMulti={isMulti}
      isSearchable={false}
      menuPosition="fixed"
      name={name}
      options={options}
      placeholder={placeholder}
      styles={formStyles}
      value={value}
      onChange={onChange}
    />

    {(helperText || error) && (
      <div className={styles.Select_helperTextContainer}>
        {helperText && (
          <Text
            className={styles.Select_helperText}
            colorClass={colorClasses.NEUTRAL['400']}
            type={textTypes.BODY.XS}
          >
            {helperText}
          </Text>
        )}
        {error && (
          <Text
            colorClass={colorClasses.RED['400']}
            data-test="inputError"
            type={textTypes.BODY.XS}
          >
            {error}
          </Text>
        )}
      </div>
    )}
  </div>
}

ControlledSelect.defaultProps = {
  className: null,
  type: selectTypes.FORM,
  label: null,
  value: null,
  isMulti: false,
  placeholder: null,
  helperText: null,
  error: null,
  isClearable: false,
  disabled: false,
};

ControlledSelect.propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
        PropTypes.object,
      ]).isRequired,
      label: PropTypes.string.isRequired,

      // custom icon in each option (a custom component)
      icon: PropTypes.element,
    })
  ).isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([selectTypes.FORM, selectTypes.SLIM]),
  label: PropTypes.string,
  isMulti: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
        PropTypes.object,
      ]).isRequired,
      label: PropTypes.string.isRequired,

      // custom icon in each option (a custom component)
      icon: PropTypes.element,
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.bool,
        ]).isRequired,
        label: PropTypes.string.isRequired,

        // custom icon in each option (a custom component)
        icon: PropTypes.element,
      })
    ),
  ]),
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  isClearable: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default ControlledSelect;

import React from 'react';

import { DateTimePicker } from '@mui/x-date-pickers';

import PropTypes from 'prop-types';

import './styles.scss';
import { colorClasses } from '@/app-globals';

import Text from '../Text';
import { textAreaTypes } from '../TextArea/constants';


function DateTimePickerWrapper({ value, label, onChange, disabled, error}) {
  return  (
    <>
      <div className="datetimePicker">
        <DateTimePicker
          disabled={disabled}
          label={label}
          value={value}
          onChange={onChange}
        /> 
      </div>
        {error && (
          <Text
            colorClass={colorClasses.RED['200']}
            type={textAreaTypes.BODY.XS}
          >
            {error}
          </Text>
        )}
    </>
  )
}

DateTimePickerWrapper.defaultProps = {
  value: null,
  label: null,
  disabled: false,
};

DateTimePickerWrapper.propTypes = {
  // the label of the input
  label: PropTypes.string,
  // moment object of the time value
  value: PropTypes.object,
  // function that handles the changes in the values.
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
};

export default DateTimePickerWrapper;

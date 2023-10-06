import React from 'react';

import { DateTimePicker } from '@mui/x-date-pickers';

import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import './styles.scss';

function DateTimePickerWrapper({ value, label, onChange, disabled, disableFutureDateTime }) {
  return  (
    <div className="datetimePicker">
      <DateTimePicker
        disabled={disabled}
        label={label}
        maxDateTime={disableFutureDateTime ? dayjs() : undefined}
        value={value}
        onChange={onChange}
      /> 
    </div>
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
  disableFutureDateTime: PropTypes.bool,
};

export default DateTimePickerWrapper;

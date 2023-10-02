import React from 'react';

import classNames from 'classnames';

import PropTypes from 'prop-types';


import { colorClasses, textTypes } from '@/app-globals';
import RequiredField from '@/components/RequiredField';

import Icon from '../../Icon';
import Text from '../../Text';


import textAreaTypes from '../constants/textAreaTypes';
import styles from '../styles.module.scss';

function ControlledTextArea({
  className,
  disabled = false,
  error = null,
  helperText,
  icon,
  id,
  inputClassName,
  isErrorMessageHidden = false,
  isRequired,
  label,
  labelClassName,
  name,
  placeholder,
  readOnly = false,
  success = null,
  type = textAreaTypes.FORM,
  value = '',
  onBlur,
  onChange,
}) {
  const hasErrorWithMessage = error && !isErrorMessageHidden;
  return (
    <div className={classNames(className, styles.TextArea_container)}>
      {label && type !== textAreaTypes.FORM && (
        <Text
          className={classNames(styles.label, labelClassName)}
          colorClass={colorClasses.NEUTRAL['400']}
          element="label"
          type={textTypes.BODY.MD}
        >
          {isRequired ? <RequiredField placeholder={label} /> : label}
        </Text>
      )}

      <textarea
        className={classNames(styles[`TextArea___${type}`], inputClassName, {
          [styles.TextArea___icon]: icon !== null,
          [styles.TextArea___success]: success !== null,
          [styles.TextArea___error]: error !== null,
        })}
        data-test="textArea"
        disabled={disabled}
        id={id}
        name={name}
        placeholder={type !== textAreaTypes.FORM ? placeholder : ''}
        readOnly={readOnly}
        value={value || ''}
        onBlur={onBlur}
        onChange={onChange}
      />

      {placeholder && type === textAreaTypes.FORM && (
        <Text
          className={classNames(styles.TextArea___form_placeholder, {
            [styles.TextArea___form_placeholder___active]: value !== '',
          })}
          colorClass={colorClasses.NEUTRAL['500']}
          type={textTypes.BODY.MD}
        >
          {isRequired ? (
            <RequiredField placeholder={placeholder} />
          ) : (
            placeholder
          )}
        </Text>
      )}

      {icon && <Icon className={styles.TextArea_icon} name={icon} />}

      {(helperText || success || hasErrorWithMessage) && (
        <div className={styles.TextArea_helperTextContainer}>
          {helperText && (
            <Text
              className={styles.TextArea_helperText}
              colorClass={colorClasses.NEUTRAL['500']}
              type={textTypes.BODY.XS}
            >
              {helperText}
            </Text>
          )}

          {hasErrorWithMessage && (
            <Text
              colorClass={colorClasses.RED['200']}
              type={textTypes.BODY.XS}
            >
              {error}
            </Text>
          )}

          {success && (
            <Text
              colorClass={colorClasses.GREEN['500']}
              type={textTypes.BODY.XS}
            >
              {success}
            </Text>
          )}
        </div>
      )}
    </div>
  );
}

ControlledTextArea.propTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf([
    textAreaTypes.FORM,
    textAreaTypes.SLIM,
  ]),
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  success: PropTypes.string,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.string,
  helperText: PropTypes.string,
  readOnly: PropTypes.bool,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  isErrorMessageHidden: PropTypes.bool,
};

export default ControlledTextArea;

import cn from 'classnames';
import PropTypes from 'prop-types';

import {
  colorClasses,
  inputKinds,
  inputTypes,
  textTypes,
} from '@/app-globals';

import Icon from '../../Icon';
import Text from '../../Text';

import styles from '../input.module.scss';

function ControlledInput({
  type = inputTypes.FORM,
  kind = inputKinds.TEXT,
  className = null,
  placeholder = null,
  error = null,
  success = null,
  name,
  label = null,
  disabled = false,
  value = '',
  onChange = () => {},
  onBlur = () => {},
  maxLength = null,
  autoComplete = 'off',
  helperText = null,
  icon = null,
  step = null,
  tabIndex = null,
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

    <input
      autoComplete={autoComplete}
      className={cn(styles[`Input___${type}`], {
        [styles[`Input___${type}___icon`]]: icon !== null,
        [styles.Input___success]: success !== null,
        [styles.Input___error]: error !== null,
        [styles.Input___disabled]: disabled,
      })}
      disabled={disabled}
      id={name}
      maxLength={maxLength}
      name={name}
      placeholder={type === inputTypes.SLIM && placeholder ? placeholder : null}
      step={step}
      tabIndex={tabIndex}
      type={kind}
      value={value || ''}
      onBlur={onBlur}
      onChange={onChange}
    />

    {placeholder && type === inputTypes.FORM && (
      <Text
        className={cn(styles.Input___form_label, {
          [styles.Input___form_label___active]: value !== '',
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
          <Text colorClass={colorClasses.RED['200']} type={textTypes.BODY.XS}>
            {error}
          </Text>
        )}

        {success && (
          <Text colorClass={colorClasses.GREEN['200']} type={textTypes.BODY.XS}>
            {success}
          </Text>
        )}
      </div>
    )}
  </div>
}

ControlledInput.propTypes = {
  type: PropTypes.oneOf([inputTypes.FORM, inputTypes.SLIM]),
  kind: PropTypes.oneOf([
    inputKinds.NUMBER,
    inputKinds.PASSWORD,
    inputKinds.TEXT,
  ]),
  className: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  success: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  icon: PropTypes.string,
  maxLength: PropTypes.number,
  autoComplete: PropTypes.string,
  helperText: PropTypes.string,
  step: PropTypes.number,
  tabIndex: PropTypes.number,
};

export default ControlledInput;

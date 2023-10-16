import React from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';
import { components } from 'react-select';

import { colorClasses, selectTypes, textTypes } from '@/app-globals';

import Text from '../../../Text';

import styles from './styles.module.scss';

const { ValueContainer } = components;

/* eslint-disable react/jsx-props-no-spreading  */
function CustomValueContainer(props) {
  const { children, type, selectProps, hasValue } = props;
  const shouldFloatLabel = selectProps.menuIsOpen || hasValue;

  return (
    <ValueContainer {...props}>
      <div
        className={cn(styles.CustomValueContainer, {
          [styles.CustomValueContainer_center]: type === selectTypes.SLIM,
        })}
      >
        {type === selectTypes.FORM && shouldFloatLabel && (
          <Text
            className={styles.CustomValueContainer_label}
            colorClass={colorClasses.NEUTRAL['500']}
            type={textTypes.BODY.MD}
          >
            {selectProps.placeholder}
          </Text>
        )}
        {children}
      </div>
    </ValueContainer>
  );
}

CustomValueContainer.propTypes = {
  // the default selectProps from `react-select`
  selectProps: PropTypes.object.isRequired,

  // true if the parent <Select /> has a value
  hasValue: PropTypes.bool.isRequired,

  // the type of the parent <Select />
  type: PropTypes.oneOf([
    selectTypes.FORM,
    selectTypes.SLIM,
  ]),

  children: PropTypes.any.isRequired,
};

export default CustomValueContainer;

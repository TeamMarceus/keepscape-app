import cn from 'classnames';
import PropTypes from 'prop-types';

import { shineTypes } from '@/app-globals';

import styles from './styles.module.scss';

function Shine({ className = null, type = shineTypes.STRAIGHT}) {
  return <div className={cn(styles.Shine, className, styles[`Shine___${type}`])} />
}


Shine.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(Object.values(shineTypes)),
};

export default Shine;

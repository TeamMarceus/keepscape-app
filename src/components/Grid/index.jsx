import cn from 'classnames';
import PropTypes from 'prop-types';

import { gridTypes } from '@/app-globals';

import styles from './styles.module.scss';

function Grid({ 
  className = null, 
  type = gridTypes.TWO, 
  children 
}) {
  return <div className={cn(className, styles[`Grid___${type}`])}>{children}</div>
}

Grid.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf([
    gridTypes.ONE,
    gridTypes.TWO,
    gridTypes.THREE,
    gridTypes.FOUR,
    gridTypes.FIVE,
  ]),
};

export default Grid;

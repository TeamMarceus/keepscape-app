import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

function Card({ 
  className = null, 
  children = null, 
  onClick = () => {},
  isClickable = false,
}) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div 
      className={cn(styles.Card, className, {
        [styles.Card___clickable]: isClickable,
      })}
      onClick={onClick}>
      {children}
    </div>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  onClick: PropTypes.func,
  isClickable: PropTypes.bool,
};

export default Card;

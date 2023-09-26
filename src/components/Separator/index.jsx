import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

function Separator({ className = null }) {
  return <hr className={cn(styles.Separator, className)} />
}

Separator.propTypes = {
  className: PropTypes.string,
};

export default Separator;

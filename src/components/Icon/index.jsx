import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

function Icon({ icon, className = null }) {
  return <i className={cn(styles.Icon, className)}>{icon}</i>;
}

Icon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
};

export default Icon;

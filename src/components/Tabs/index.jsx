import cn from 'classnames';
import PropTypes from 'prop-types';

import { tabKinds, tabTypes } from '@/app-globals';

import TabButton from './TabButton';
import TabLink from './TabLink';

import styles from './styles.module.scss';

function Tabs({ 
  type, 
  tabs, 
  className = null,
  tabClassName = null,
  activeTab = null,
}) {
  return <div className={cn(className, styles[`Tabs___${type}`])}>
    {tabs?.map(({ name, value, kind, action, closeAction, id }) =>
      kind === tabKinds.BUTTON ? (
        <TabButton
          key={value}
          active={activeTab === value}
          className={cn(styles.Tabs_button, tabClassName)}
          closeAction={
            type === tabTypes.HORIZONTAL.SM && closeAction ? closeAction : null
          }
          id={id}
          type={type}
          onClick={action}
        >
          {name}
        </TabButton>
      ) : (
        <TabLink
          key={value}
          active={activeTab === value}
          className={cn(styles.Tabs_link, tabClassName)}
          closeAction={
            type === tabTypes.HORIZONTAL.SM && closeAction ? closeAction : null
          }
          id={id}
          to={action}
          type={type}
        >
          {name}
        </TabLink>
      )
    )}
  </div>
}

Tabs.propTypes = {
  className: PropTypes.string,
  tabClassName: PropTypes.string,
  type: PropTypes.oneOf([
    tabTypes.HORIZONTAL.LG,
    tabTypes.HORIZONTAL.SM,
    tabTypes.VERTICAL.LG,
    tabTypes.VERTICAL.SM,
  ]).isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      kind: PropTypes.oneOf([tabKinds.BUTTON, tabKinds.LINK]).isRequired,
      // if type is BUTTON -> func, else if type is LINK -> string
      action: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
        .isRequired,
      closeAction: PropTypes.func,
      id: PropTypes.string,
    })
  ).isRequired,
  activeTab: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Tabs;

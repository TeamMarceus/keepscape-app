import { useState } from 'react';

import cn from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';

import { Icon } from '@/components';

import styles from './styles.module.scss';

function SidebarLink({ to = null, icon, label, isActive, subLinks }) {
  const pathname = usePathname();
  const [isDropdownToggled, toggleDropdown] = useState(false);

  return (
     to ? (
      <Link
        className={cn(styles.SidebarLink, { [styles.SidebarLink___active]: isActive })}
        href={to}
      >
        <div className={styles.SidebarLink_title}>
          <Icon className={styles.SidebarLink_icon} icon={icon} />
          {label}
        </div>
      </Link>
     )
    : (
      <>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div 
          className={cn(styles.SidebarLink, { [styles.SidebarLink___active]: isActive })}
          onClick={() => toggleDropdown(!isDropdownToggled)}
        >
          <div className={styles.SidebarLink_title}>
            <Icon className={styles.SidebarLink_icon} icon={icon} />
            
            {label}
          </div>

          <Icon
            className={cn(styles.SidebarLink_dropdownIcon, { 
              [styles.SidebarLink_dropdownIcon___toggled]: isDropdownToggled 
            })}
            icon="keyboard_arrow_down"
          />
        </div>

        <div
          className={cn({
            [styles.SidebarLink_dropdown]: !isDropdownToggled,
            [styles.SidebarLink_dropdown___toggled]: isDropdownToggled,
          })}
        >
          {subLinks.map((subLink) => (
            <Link
              key={subLink.to}
              className={cn(styles.SidebarLink_subLinks, { [styles.SidebarLink___active]: pathname === subLink.to })}
              href={subLink.to}
            > 
              {subLink.label}
            </Link>
          ))}
        </div>
      </>
    )
  );
};

SidebarLink.propTypes = {
  to: PropTypes.string,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  subLinks: PropTypes.arrayOf(PropTypes.shape({
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
};

export default SidebarLink;

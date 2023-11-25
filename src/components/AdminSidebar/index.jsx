import cn from 'classnames';
import { usePathname } from 'next/navigation';

import PropTypes from 'prop-types';

import { ADMIN_ROUTES } from '@/app/admin/routes';

import { iconButtonTypes } from '@/app-globals';

import { useWindowSize } from '@/hooks';

import IconButton from '../Button/IconButton';

import SidebarLink from './Link';
import navLinks from './constants/navLinks';
import styles from './styles.module.scss';

function AdminSidebar({ isSidebarToggled, toggleSidebar }) {
  const pathname = usePathname();
  const { windowSize } = useWindowSize();

  return (
    <nav
      className={cn(styles.AdminSidebar, {
        [styles.AdminSidebar___toggled]:
          isSidebarToggled && windowSize.width <= 991,
      })}
    >
      <IconButton
        className={styles.AdminSidebar_close}
        icon="keyboard_double_arrow_left"
        type={iconButtonTypes.ICON.LG}
        onClick={() => {
          toggleSidebar(true);
        }}
      />

      <SidebarLink
        icon={navLinks.HOME.icon}
        isActive={pathname === ADMIN_ROUTES.DASHBOARD}
        label={navLinks.HOME.label}
        to={ADMIN_ROUTES.DASHBOARD}
      />

      <SidebarLink
        icon={navLinks.SELLER_APPLICATIONS.icon}
        isActive={pathname.includes(`/admin/seller-applications`)}
        label={navLinks.SELLER_APPLICATIONS.label}
        subLinks={navLinks.SELLER_APPLICATIONS.subLinks}
      />

      <SidebarLink
        icon={navLinks.REVIEW_ORDERS.icon}
        isActive={pathname === ADMIN_ROUTES.REVIEW_ORDERS}
        label={navLinks.REVIEW_ORDERS.label}
        to={ADMIN_ROUTES.REVIEW_ORDERS}
      />

      <SidebarLink
        icon={navLinks.REVIEW_PRODUCTS.icon}
        isActive={pathname === ADMIN_ROUTES.REVIEW_PRODUCTS}
        label={navLinks.REVIEW_PRODUCTS.label}
        to={ADMIN_ROUTES.REVIEW_PRODUCTS}
      />

      <SidebarLink
        icon={navLinks.SELLERS.icon}
        isActive={pathname.includes(`/admin/sellers`)}
        label={navLinks.SELLERS.label}
        subLinks={navLinks.SELLERS.subLinks}
      />

      <SidebarLink
        icon={navLinks.BUYERS.icon}
        isActive={pathname.includes(`/admin/buyers`)}
        label={navLinks.BUYERS.label}
        subLinks={navLinks.BUYERS.subLinks}
      />

      <SidebarLink
        icon={navLinks.FINANCE.icon}
        isActive={pathname.includes(`/admin/finance`)}
        label={navLinks.FINANCE.label}
        subLinks={navLinks.FINANCE.subLinks}
      />

      <SidebarLink
        icon={navLinks.ANNOUNCEMENTS.icon}
        isActive={pathname === ADMIN_ROUTES.ANNOUNCEMENTS}
        label={navLinks.ANNOUNCEMENTS.label}
        to={ADMIN_ROUTES.ANNOUNCEMENTS}
      />
    </nav>
  );
}

AdminSidebar.propTypes = {
  isSidebarToggled: PropTypes.bool,
  toggleSidebar: PropTypes.func,
};

export default AdminSidebar;

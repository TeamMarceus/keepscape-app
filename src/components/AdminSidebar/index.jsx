import { usePathname } from 'next/navigation';

import { ADMIN_ROUTES } from '@/app/admin/routes';

import SidebarLink from './Link';
import navLinks from './constants/navLinks';

import styles from './styles.module.scss';

function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav
      className={styles.AdminSidebar}
    >
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
        isActive={pathname === ADMIN_ROUTES.FINANCE}
        label={navLinks.FINANCE.label}
        to={ADMIN_ROUTES.FINANCE}
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

export default AdminSidebar;

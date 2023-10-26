import { usePathname } from 'next/navigation';

import { SELLER_ROUTES } from '@/app/seller/routes';

import SidebarLink from './Link';
import navLinks from './constants/navLinks';

import styles from './styles.module.scss';

function SellerSidebar() {
  const pathname = usePathname();

  return (
    <nav
      className={styles.SellerSidebar}
    >
      <SidebarLink
        icon={navLinks.HOME.icon}
        isActive={pathname === SELLER_ROUTES.DASHBOARD}
        label={navLinks.HOME.label}
        to={SELLER_ROUTES.DASHBOARD}
      />

      <SidebarLink
        icon={navLinks.TERMS_AND_CONDITIONS.icon}
        isActive={pathname === SELLER_ROUTES.TERMS_AND_CONDITIONS}
        label={navLinks.TERMS_AND_CONDITIONS.label}
        to={SELLER_ROUTES.TERMS_AND_CONDITIONS}
      />

      <SidebarLink
        icon={navLinks.ORDERS.icon}
        isActive={pathname.includes(`/seller/orders`)}
        label={navLinks.ORDERS.label}
        subLinks={navLinks.ORDERS.subLinks}
      />

      <SidebarLink
        icon={navLinks.PRODUCTS.icon}
        isActive={pathname.includes(`/seller/products`)}
        label={navLinks.PRODUCTS.label}
        subLinks={navLinks.PRODUCTS.subLinks}
      />

      <SidebarLink
        icon={navLinks.FINANCE.icon}
        isActive={pathname.includes(`/seller/finance`)}
        label={navLinks.FINANCE.label}
        subLinks={navLinks.FINANCE.subLinks}
      />
    </nav>
  );
}

export default SellerSidebar;

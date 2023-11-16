import cn from 'classnames';
import { usePathname } from 'next/navigation';

import PropTypes from 'prop-types';

import { SELLER_ROUTES } from '@/app/seller/routes';

import { iconButtonTypes } from '@/app-globals';
import { useWindowSize } from '@/hooks';

import IconButton from '../Button/IconButton'

import SidebarLink from './Link';
import navLinks from './constants/navLinks';
import styles from './styles.module.scss';


function SellerSidebar({ isSidebarToggled, toggleSidebar }) {
  const pathname = usePathname();
  const { windowSize } = useWindowSize();

  return (
    <nav
      className={cn(styles.SellerSidebar, {
        [styles.SellerSidebar___toggled] : isSidebarToggled && windowSize.width <= 991
      })}
    >
      <IconButton
        className={styles.SellerSidebar_close}
        icon="keyboard_double_arrow_left"
        type={iconButtonTypes.ICON.LG}
        onClick={()=>{
            toggleSidebar(true);
        }}
      />

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

SellerSidebar.propTypes = {
  isSidebarToggled: PropTypes.bool,
  toggleSidebar: PropTypes.func,
};


export default SellerSidebar;

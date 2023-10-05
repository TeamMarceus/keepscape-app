import { SELLER_ROUTES } from '@/app/seller/routes';

const navLinks = {
    HOME: {
      label: 'Home',
      icon: 'home',
    },

    TERMS_AND_CONDITIONS: {
      label: 'Terms and Conditions',
      icon: 'gavel',
    },

    ORDERS: {
      label: 'Orders',
      icon: 'shopping_cart',
      subLinks: [
        {
          label: 'All Orders',
          to: SELLER_ROUTES.ALL_ORDERS,
        },
        {
          label: 'Pending Orders',
          to: SELLER_ROUTES.PENDING_ORDERS,
        },
        {
          label: 'Ongoing Orders',
          to: SELLER_ROUTES.ON_GOING_ORDERS,
        },
        {
          label: 'Order History',
          to: SELLER_ROUTES.ORDER_HISTORY,
        }
      ]
    },

    PRODUCTS: {
      label: 'Products',
      icon: 'shopping_bag',
      subLinks: [
        {
          label: 'All Products',
          to: SELLER_ROUTES.ALL_PRODUCTS,
        },
        {
          label: 'Add Product',
          to: SELLER_ROUTES.ADD_PRODUCT,
        },
        {
          label: 'Hidden Products',
          to: SELLER_ROUTES.HIDDEN_PRODUCTS,
        }
      ]
    },

    FINANCE: {
      label: 'Finance',
      icon: 'monetization_on',
    }
};

export default navLinks;

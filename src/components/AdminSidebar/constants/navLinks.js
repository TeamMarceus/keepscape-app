import { ADMIN_ROUTES } from '@/app/admin/routes';

const navLinks = {
  HOME: {
    label: 'Home',
    icon: 'home',
  },

  SELLER_APPLICATIONS: {
    label: 'Seller Applications',
    icon: 'assignment',
    subLinks: [
      {
        label: 'Pending Sellers',
        to: ADMIN_ROUTES.SELLER_APPLICATIONS_PENDING,
      },
      {
        label: 'Approved Sellers',
        to: ADMIN_ROUTES.SELLER_APPLICATIONS_APPROVED,
      },
      {
        label: 'Rejected Sellers',
        to: ADMIN_ROUTES.SELLER_APPLICATIONS_REJECTED,
      }
    ]
  },
  
  REVIEW_ORDERS: {
    label: 'Review Orders',
    icon: 'shopping_cart',
  },
  
  REVIEW_PRODUCTS: {
    label: 'Review Products',
    icon: 'shopping_bag',
  },

  SELLERS: {
    label: 'Sellers',
    icon: 'storefront',
    subLinks: [
      {
        label: 'Active Sellers',
        to: ADMIN_ROUTES.SELLERS_ACTIVE,
      },
      {
        label: 'Banned Sellers',
        to: ADMIN_ROUTES.SELLERS_BANNED,
      }
    ]
  },
  
  BUYERS: {
    label: 'Buyers',
    icon: 'people',
    subLinks: [
      {
        label: 'Active Buyers',
        to: ADMIN_ROUTES.BUYERS_ACTIVE,
      },
      {
        label: 'Banned Buyers',
        to: ADMIN_ROUTES.BUYERS_BANNED,
      }
    ]
  },

  FINANCE: {
    label: 'Finance',
    icon: 'monetization_on',
    subLinks: [
      {
        label: 'Pending Payments',
        to: ADMIN_ROUTES.FINANCE_PENDING,
      },
      {
        label: 'Paid Payments',
        to: ADMIN_ROUTES.FINANCE_PAID,
      },
      {
        label: 'Rejected Payments',
        to: ADMIN_ROUTES.FINANCE_REJECTED,
      }
    ]
  },

  ANNOUNCEMENTS: {
    label: 'Announcements',
    icon: 'announcement',
  },
};

export default navLinks;

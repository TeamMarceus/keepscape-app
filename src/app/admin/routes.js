const BASE_ROUTE = '/admin';

export const ADMIN_ROUTES = {
  DASHBOARD: `${BASE_ROUTE}/dashboard`,
  SELLER_APPLICATIONS_PENDING: `${BASE_ROUTE}/seller-applications/pending`,
  SELLER_APPLICATIONS_APPROVED: `${BASE_ROUTE}/seller-applications/approved`,
  SELLER_APPLICATIONS_REJECTED: `${BASE_ROUTE}/seller-applications/rejected`,
  REVIEW_ORDERS: `${BASE_ROUTE}/review-orders`,
  REVIEW_PRODUCTS: `${BASE_ROUTE}/review-products`,
  SELLERS_ACTIVE: `${BASE_ROUTE}/sellers/active`,
  SELLERS_BANNED: `${BASE_ROUTE}/sellers/banned`,
  BUYERS_ACTIVE: `${BASE_ROUTE}/buyers/active`,
  BUYERS_BANNED: `${BASE_ROUTE}/buyers/banned`,
  FINANCE_PENDING: `${BASE_ROUTE}/finance/pending`,
  FINANCE_PAID: `${BASE_ROUTE}/finance/paid`,
  FINANCE_REJECTED: `${BASE_ROUTE}/finance/rejected`,
  ANNOUNCEMENTS: `${BASE_ROUTE}/announcements`,
};

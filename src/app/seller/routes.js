const BASE_ROUTE = '/seller';

export const SELLER_ROUTES = {
  DASHBOARD: `${BASE_ROUTE}/dashboard`,
  TERMS_AND_CONDITIONS: `${BASE_ROUTE}/terms-and-conditions`,
  MY_PRODUCTS: `${BASE_ROUTE}/products`,
  ADD_PRODUCT: `${BASE_ROUTE}/products/add`,
  HIDDEN_PRODUCTS: `${BASE_ROUTE}/products/hidden`,
  PENDING_APPROVAL: `${BASE_ROUTE}/orders/approval`,
  PENDING_PAYMENT: `${BASE_ROUTE}/orders/payment`,
  PENDING_ORDERS: `${BASE_ROUTE}/orders/pending`,
  ON_GOING_ORDERS: `${BASE_ROUTE}/orders/on-going`,
  ORDER_HISTORY: `${BASE_ROUTE}/orders/history`,
  FINANCE_HISTORIES: `${BASE_ROUTE}/finance/histories`,
  FINANCE_WITHDRAWALS: `${BASE_ROUTE}/finance/withdrawals`,
};

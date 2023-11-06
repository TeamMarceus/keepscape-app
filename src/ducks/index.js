
import { combineReducers } from 'redux';

import usersReducer, { selectors as usersSelectors } from './reducers/users';

// -----------------------------------------------------------------------------
// ROUTER NAMES
const USERS = 'USERS';


// -----------------------------------------------------------------------------
// REDUCER
const rootReducer = combineReducers({
  [USERS]: usersReducer,
});

export const APP_REDUX_KEY = 'keepscape';

export default rootReducer;

// -----------------------------------------------------------------------------
// PUBLIC SELECTORS

// users
export const getUser = (store) =>
  usersSelectors.loginSelectors.getUser(store[USERS]);
export const getAccessToken = (store) =>
  usersSelectors.loginSelectors.getAccessToken(store[USERS]);
export const getRefreshToken = (store) =>
  usersSelectors.loginSelectors.getRefreshToken(store[USERS]);
export const getCheckoutCart = (store) =>
  usersSelectors.loginSelectors.getCheckoutCart(store[USERS]);
export const getCartCount = (store) =>
  usersSelectors.loginSelectors.getCartCount(store[USERS]);
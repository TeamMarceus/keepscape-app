
import { combineReducers } from 'redux';

import questionsReducer, { selectors as questionsSelectors } from './reducers/questions';
import productReducer, { selectors as suggestionsSelector } from './reducers/suggestions';
import usersReducer, { selectors as usersSelectors } from './reducers/users';

// -----------------------------------------------------------------------------
// ROUTER NAMES
const QUESTIONS = 'QUESTIONS';
const USERS = 'USERS';
const SUGGESTIONS = 'SUGGESTIONS';


// -----------------------------------------------------------------------------
// REDUCER
const rootReducer = combineReducers({
  [QUESTIONS]: questionsReducer,
  [USERS]: usersReducer,
  [SUGGESTIONS]: productReducer,
});

export const APP_REDUX_KEY = 'keepscape';

export default rootReducer;

// -----------------------------------------------------------------------------
// PUBLIC SELECTORS

// questions
export const getGeneralQuestions = (store) =>
  questionsSelectors.questionSelectors.getGeneralQuestions(store[QUESTIONS]);
export const getNewQuestions = (store) =>
  questionsSelectors.questionSelectors.getNewQuestions(store[QUESTIONS]);

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

// suggestions
export const getSuggestions = (store) => 
  suggestionsSelector.productSelectors.getSuggestions(store[SUGGESTIONS]);
export const getWasRedirectedSuggestions = (store) =>
  suggestionsSelector.productSelectors.getWasRedirected(store[SUGGESTIONS]);


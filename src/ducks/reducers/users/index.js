import { combineReducers } from 'redux';

import loginReducer, {
  actions as loginActions,
  selectors as loginSelectors,
} from './login';

const usersReducer = combineReducers({
  loginReducer,
});

export const actions = {
  loginActions,
};

export const selectors = {
  loginSelectors,
};

export default usersReducer;

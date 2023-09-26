import { combineReducers } from 'redux';

import productReducer, {
  actions as productActions,
  selectors as productSelectors,
} from './product';

const suggestionsReducer = combineReducers({
  productReducer,
});

export const actions = {
  productActions,
};

export const selectors = {
  productSelectors,
};

export default suggestionsReducer;

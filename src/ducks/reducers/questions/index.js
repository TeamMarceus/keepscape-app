import { combineReducers } from 'redux';

import questionReducer, {
  actions as questionActions,
  selectors as questionSelectors,
} from './question';

const questionsReducer = combineReducers({
  questionReducer,
});

export const actions = {
  questionActions,
};

export const selectors = {
  questionSelectors,
};

export default questionsReducer;

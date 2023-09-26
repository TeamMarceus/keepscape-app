import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  generalQuestions: [],
  newQuestions: [],
};

const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    questionUpdate: (state, action) => {
      const {
        general_questions: generalQuestions,
        new_questions: newQuestions,
      } = action.payload;

      return {
        ...state,
        generalQuestions: generalQuestions || state.generalQuestions,
        newQuestions: newQuestions || state.newQuestions,
      };
    },
    questionRestart: () => initialState,
  },
});

export const { actions } = questionSlice;

export const selectors = {
  getGeneralQuestions: (state) => state.questionReducer.generalQuestions,
  getNewQuestions: (state) => state.questionReducer.newQuestions,
};

export default questionSlice.reducer;

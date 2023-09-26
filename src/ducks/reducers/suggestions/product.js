import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  gifts: [],
  wasRedirected: false,
};

const productSlice = createSlice({
  name: 'suggestions',
  initialState,
  reducers: {
    productUpdate: (state, action) => {
      const {
        gifts,
        was_redirected: wasRedirected,
      } = action.payload;

      return {
        ...state,
        gifts: gifts || state.gifts,
        wasRedirected: wasRedirected ?? state.wasRedirected,
      };
    },
    productRestart: () => initialState,
  },
});

export const { actions } = productSlice;

export const selectors = {
  getSuggestions: (state) => state.productReducer.gifts,
  getWasRedirected: (state) => state.productReducer.wasRedirected,
};

export default productSlice.reducer;

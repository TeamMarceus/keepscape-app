import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  user: {},
  accessToken: null,
  refreshToken: null,
  checkoutCart: {},
  cartCount: 0,
};

const loginSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loginUpdate: (state, action) => {
      const {
        user,
        access_token: accessToken,
        refresh_token: refreshToken,
        checkout_cart: checkoutCart,
        cart_count: cartCount,
      } = action.payload;

      return {
        ...state,
        user: user || state.user,
        accessToken: accessToken || state.accessToken,
        refreshToken: refreshToken || state.refreshToken,
        checkoutCart: checkoutCart || state.checkoutCart,
        cartCount: cartCount || state.cartCount,
      };
    },
    loginRestart: () => initialState,
  },
});

export const { actions } = loginSlice;

export const selectors = {
  getUser: (state) => state.loginReducer.user,
  getAccessToken: (state) => state.loginReducer.accessToken,
  getRefreshToken: (state) => state.loginReducer.refreshToken,
  getCheckoutCart: (state) => state.loginReducer.checkoutCart,
  getCartCount: (state) => state.loginReducer.cartCount,
};

export default loginSlice.reducer;

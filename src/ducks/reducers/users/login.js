import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  user: {},
  accessToken: null,
  refreshToken: null,
  deliveryDetails: {},
  checkoutCart: {},
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
        delivery_details: deliveryDetails,
        checkout_cart: checkoutCart,
      } = action.payload;

      return {
        ...state,
        user: user || state.user,
        accessToken: accessToken || state.accessToken,
        refreshToken: refreshToken || state.refreshToken,
        deliveryDetails: deliveryDetails || state.deliveryDetails,
        checkoutCart: checkoutCart || state.checkoutCart,
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
  getDeliveryDetails: (state) => state.loginReducer.deliveryDetails,
  getCheckoutCart: (state) => state.loginReducer.checkoutCart,
};

export default loginSlice.reducer;

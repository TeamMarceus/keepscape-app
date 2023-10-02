import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  user: {},
  accessToken: null,
  refreshToken: null,
  deliveryDetails: {},
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
      } = action.payload;

      return {
        ...state,
        user: user || state.user,
        accessToken: accessToken || state.accessToken,
        refreshToken: refreshToken || state.refreshToken,
        deliveryDetails: deliveryDetails || state.deliveryDetails,
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
};

export default loginSlice.reducer;

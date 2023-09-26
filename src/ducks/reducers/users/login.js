import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  user: {},
  accessToken: null,
  refreshToken: null,
  wasRedirected: false,
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
        was_redirected: wasRedirected,
      } = action.payload;

      return {
        ...state,
        user: user || state.user,
        accessToken: accessToken || state.accessToken,
        refreshToken: refreshToken || state.refreshToken,
        wasRedirected: wasRedirected ?? state.wasRedirected,
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
  getWasRedirected: (state) => state.loginReducer.wasRedirected,
};

export default loginSlice.reducer;

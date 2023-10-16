import axios from 'axios';

import { TokensService } from '@/services';
import config from '@/services/config';

import { actions } from './ducks/reducers/users/login';

export const configureAxios = (store) => {
  axios.defaults.baseURL = config.API_URL;
  axios.defaults.timeout = 40000;
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  // add a request interceptor to all the axios requests
  // that are going to be made in the site. The purpose
  // of this interceptor is to verify if the access token
  // is still valid and renew it if needed and possible
  axios.interceptors.request.use(
    (requestConfig) => {
      // if the current request doesn't include the config's base
      // API URL, we don't attach the access token to its authorization
      // because it means it is an API call to a 3rd party service
      if (requestConfig.baseURL !== config.API_URL) {
        return requestConfig;
      }

      // Get access token from store for every api request
      const { accessToken } = store.getState().USERS.loginReducer;
      requestConfig.headers.authorization = accessToken
        ? `Bearer ${accessToken}`
        : null;

      return requestConfig;
    },
    (error) => Promise.reject(error)
  );

  let isTokenRefreshing = false;

  axios.interceptors.response.use(null, async (error) => {
    if (error.config && error.response) {
      if (error.response.status === 401) {
        // Get refresh token when 401 response status
        const { refreshToken } = store.getState().USERS.loginReducer;
        const { user } = store.getState().USERS.loginReducer;

        if (!refreshToken) {
          store.dispatch(actions.loginRestart());
          return;
        }

        // Check if token refresh is already in progress
        if (!isTokenRefreshing) {
          isTokenRefreshing = true;

          try {
            // We are certain that the access token already expired.
            const { data: verifyResponseData
            } = await TokensService.verify({
              userId: user.id,
              refreshToken,
            });

            // We'll check if REFRESH TOKEN has also expired.
            if (!verifyResponseData) {
              // if the REFRESH TOKEN has already expired as well, logout the user
              // and throw an error to exit this Promise chain
              store.dispatch(actions.loginRestart());
              throw new Error('refresh token has already expired');
            }

            // If the REFRESH TOKEN is still active, renew the ACCESS TOKEN and the REFRESH TOKEN
            const { data: renewResponse
            } = await TokensService.renew({
              userId: user.id,
              refreshToken,
            });

            store.dispatch(
              actions.loginUpdate({
                access_token: renewResponse.accessToken,
                refresh_token: renewResponse.refreshToken,
              })
            );

            // Modify the Authorization Header using the NEW ACCESS TOKEN
            error.config.headers.authorization = renewResponse.accessToken;
            isTokenRefreshing = false; // Reset the token refresh flag
            return axios.request(error.config);
          } catch (error) {
            store.dispatch(actions.loginRestart());
            isTokenRefreshing = false; // Reset the token refresh flag
            return Promise.reject(error);
          }
        } else {
          // Token refresh is already in progress, wait for the previous request to complete
          return new Promise((resolve) => {
            const intervalId = setInterval(() => {
              if (!isTokenRefreshing) {
                clearInterval(intervalId);
                resolve(axios.request(error.config));
              }
            }, 100);
          });
        }
      }

      if (error.response.status === 403) {
        store.dispatch(actions.loginRestart());
      }
    }

    return Promise.reject(error);
  });
};

import Cookies from 'universal-cookie';

const useCookies = () => {
  const cookies = new Cookies();

  const setCookie = (key, value, options) => {
    cookies.set(key, value, options);
  };

  const getCookie = (key) => cookies.get(key);

  const removeCookie = (key) => {
    cookies.remove(key, { path: '/' });
  };

  return { setCookie, getCookie, removeCookie };
};

export default useCookies;

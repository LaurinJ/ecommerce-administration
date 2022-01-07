import cookie from "js-cookie";

export const logout = async () => {
  removeCookie("accessToken");
  removeCookie("refreshToken");
  removeLocalStorage("user");
};

// set cookie
export const setCookie = (key, value) => {
  cookie.set(key, value, {
    expires: 1,
  });
};

export const removeCookie = (key) => {
  cookie.remove(key, {
    expires: 1,
  });
};
// get cookie
export const getCookie = (key) => {
  return cookie.get(key);
};
// localstorage
export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const authenticate = (data, next) => {
  setCookie("accessToken", data.accessToken);
  setCookie("refreshToken", data.refreshToken);
  setLocalStorage("user", data.user);
  next();
};

export const isAuth = () => {
  const cookieChecked = getCookie("accessToken");
  if (cookieChecked) {
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user"));
    } else {
      return false;
    }
  }
};

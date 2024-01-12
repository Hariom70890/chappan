export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT = "LOGOUT";

export const loginUser = (data) => {
  return {
    type: LOGIN_USER,
    payload: data,
  };
};

export const logoutUser = (data) => {
  return {
    type: LOGOUT,
    payload: data,
  };
};

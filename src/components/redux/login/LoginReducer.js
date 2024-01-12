import { LOGIN_USER, LOGOUT } from "./LoginAction";

const init = {
  LoginData: null,
};

export const loginReducer = (store = init, { type, payload }) => {
  switch (type) {
    case LOGIN_USER:
      return { ...store, LoginData: payload };

    case LOGOUT:
      return { ...store, LoginData: payload };

    default:
      return { ...store };
  }
};

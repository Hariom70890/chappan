import { SIGN_UP } from "./Signupaction";

const init = {
  signupData: [],
};

export const signupReducer = (store = init, { type, payload }) => {
  switch (type) {
    case SIGN_UP:
      return { ...store, signupData: [...store.signupData, payload] };

    default:
      return { ...store };
  }
};

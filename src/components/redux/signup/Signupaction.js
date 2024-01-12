export const SIGN_UP = "SIGN_UP";

export const addSignupData = (data) => {
  return {
    type: SIGN_UP,
    payload: data,
  };
};

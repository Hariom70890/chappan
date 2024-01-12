import { combineReducers, legacy_createStore as createStore } from "redux";

import { storeReducer } from "./cart/Cartreducer";
import { itemReducer } from "./Item/ItemReducer";
import { loginReducer } from "./login/LoginReducer";
import { signupReducer } from "./signup/SignupReducer";

const rootReducer = combineReducers({
  cart: storeReducer,
  item: itemReducer,
  signup: signupReducer,
  login: loginReducer,
});

export const store = createStore(rootReducer);

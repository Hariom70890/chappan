import { ADD_ITEM } from "./ItemAction";

const init = {
  item: ["Pizza"],
};

export const itemReducer = (store = init, { type, payload }) => {
  switch (type) {
    case ADD_ITEM:
      return { ...store, item: [payload] };
    default:
      return { ...store };
  }
};

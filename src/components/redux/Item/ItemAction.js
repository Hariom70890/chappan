export const ADD_ITEM = "ADD_ITEM";

export const addItemName = (item) => {
  return {
    type: ADD_ITEM,
    payload: item,
  };
};

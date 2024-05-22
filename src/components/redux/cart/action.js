export const ADD_TODO = "ADD_TODO";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const CLEAR_CART = "CLEAR_CART";
export const UPDATE_QUANTITY = "UPDATE_QUANTITY"

export const clearCart = () => {
  return {
    type: CLEAR_CART,
    payload: "",
  };
};

export const addTodo = (data) => {
  return {
    type: ADD_TODO,
    payload: data,
  };
};

export const removeItem = (id) => {
  return {
    type: REMOVE_ITEM,
    payload: id,
  };
};

export const updateQuantity = (id, operation) => ({
  type: UPDATE_QUANTITY,
  payload: { id, operation },
});
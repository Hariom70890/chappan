import {  ADD_TODO, CLEAR_CART, REMOVE_ITEM,UPDATE_QUANTITY } from "./action";

const init = {
  todos: [],
};

export const storeReducer = (store = init, { type, payload }) => {
  switch (type) {
    case ADD_TODO:
      return { ...store, todos: [...store.todos, payload] };

    case REMOVE_ITEM:
      return {
        ...store,
        todos: [...store.todos.filter((e) => e.Id !== payload)],
      };

    case CLEAR_CART:
      return { ...store, todos: [] };
     case UPDATE_QUANTITY:
      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.Id === payload.id
            ? {
                ...todo,
                Quantity:
                  payload.operation === "increment"
                    ? todo.Quantity + 1
                    : todo.Quantity - 1,
              }
            : todo
        ),
      };

    default:
      return { ...store };
  }
};

// ...store,
// todos:store.todos.filter((el)=>el.id!==payload)

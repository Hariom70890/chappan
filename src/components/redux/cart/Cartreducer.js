import { ADD_ITEM, ADD_TODO, CLEAR_CART, REMOVE_ITEM } from "./action";

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

    default:
      return { ...store };
  }
};

// ...store,
// todos:store.todos.filter((el)=>el.id!==payload)

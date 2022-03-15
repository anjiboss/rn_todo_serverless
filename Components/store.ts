import * as SecureStore from "expo-secure-store";

export const store = {
  saveTodo: async (newTodos: Todo[]) => {
    await SecureStore.setItemAsync("stored_todo", JSON.stringify(newTodos));
  },
  getTodo: async () => {
    return await SecureStore.getItemAsync("stored_todo");
  },
};

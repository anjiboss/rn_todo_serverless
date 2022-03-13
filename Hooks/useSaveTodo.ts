import React from "react";
import * as SecureStore from "expo-secure-store";

export const useSaveTodo = (
  setTodo: React.Dispatch<React.SetStateAction<Todo[]>>
) => {
  return async (newName: string) => {
    setTodo((prev) => {
      const newTodo: Todo = {
        id: prev.length,
        status: false,
        name: newName,
      };
      SecureStore.setItemAsync(
        "stored_todo",
        JSON.stringify([...prev, newTodo])
      );
      return [...prev, newTodo];
    });
  };
};

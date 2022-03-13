import React from "react";

interface Context {
  todo: Todo[];
  setTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
  setAddTodo: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteTodo: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TodoContext = React.createContext<Context>({
  todo: [],
  setTodo: () => {},
  setAddTodo: () => {},
  setDeleteTodo: () => {},
});

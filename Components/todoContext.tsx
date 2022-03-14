import React from "react";

interface Context {
  todo: Todo[];
  selected: Todo[];
  setTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
  setAddTodo: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteTodo: React.Dispatch<React.SetStateAction<boolean>>;
  setSelected: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoContext = React.createContext<Context>({
  todo: [],
  selected: [],
  setTodo: () => {},
  setAddTodo: () => {},
  setDeleteTodo: () => {},
  setSelected: () => {},
});

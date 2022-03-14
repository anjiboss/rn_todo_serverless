import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import Todo from "./Todo";
import { TodoContext } from "./todoContext";
import ToolBar from "./ToolBar";

const TodoApp: React.FC = () => {
  const { todo: todos } = useContext(TodoContext);
  // ANCHOR Constant
  // ---
  useEffect(() => {
    console.log(todos);
  }, [todos]);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 9 }}>
        {todos.map((todo) => (
          <Todo todo={todo} key={todo.id} />
        ))}
      </View>
      <ToolBar />
    </View>
  );
};

export default TodoApp;

import React, { useContext } from "react";
import { View } from "react-native";
import Todo from "./Todo";
import { TodoContext } from "./todoContext";
import ToolBar from "./ToolBar";

const TodoApp: React.FC = () => {
  const { todo: todos } = useContext(TodoContext);
  // ANCHOR Constant
  // ---
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 9 }}>
        {todos.map((todo) => (
          <Todo small={false} todo={todo} key={todo.id} />
        ))}
      </View>
      <ToolBar />
    </View>
  );
};

export default TodoApp;

import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { TodoContext } from "./todoContext";
import AddTodo from "./AddTodo";
import DeleteTodo from "./DeleteTodo";
import TodoApp from "./TodoApp";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 *  This Component will:
 * 1. Get Todos from async storage
 * 2. Automaticly Delete `Completed-24h-passed` Todo
 */

const TodoWraper: React.FC = ({}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [todo, setTodo] = useState<Todo[]>([]);
  const [addTodo, setAddTodo] = useState(false);
  const [deleteTodo, setDeleteTodo] = useState(false);

  useEffect(() => {
    const getStoredTodo = async () => {
      const stored = await SecureStore.getItemAsync("stored_todo");
      if (stored) {
        let todos: Todo[] = JSON.parse(stored);
        // Filter Todo ended yester day
        todos = todos.filter(
          (td) =>
            !td.expired ||
            new Date(td.expired).setHours(0, 0, 0, 0) >
              new Date().setHours(0, 0, 0, 0)
        );
        return todos;
      } else {
        return [];
      }
    };

    getStoredTodo().then((stored) => {
      setTodo(stored);
      setIsChecked(true);
    });
  }, []);

  return (
    <TodoContext.Provider value={{ todo, setTodo, setAddTodo, setDeleteTodo }}>
      <SafeAreaView style={{ flex: 1 }}>
        {isChecked && <TodoApp />}
        <AddTodo isOpen={addTodo} closeHandler={() => setAddTodo(false)} />
        <DeleteTodo isOpen={deleteTodo} />
      </SafeAreaView>
    </TodoContext.Provider>
  );
};

export default TodoWraper;

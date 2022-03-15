import React, { useContext, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CButton from "./CButton";
import { store } from "./store";
import { TodoContext } from "./todoContext";

interface TodoProps {
  todo: Todo;
  small: boolean;
}

const Todo: React.FC<TodoProps> = ({ todo, small }) => {
  const { selected, setSelected, setTodo } = useContext(TodoContext);
  const isSelected = useMemo(() => {
    const checker = selected.find((td) => td.id === todo.id);
    if (checker) {
      return true;
    } else {
      return false;
    }
  }, [selected]);

  const handleSelecting = () => {
    setSelected((prev) => {
      if (isSelected) {
        return prev.filter((td) => td.id !== todo.id);
      } else {
        return [...prev, todo];
      }
    });
  };

  const handleChangeStatus = () => {
    setTodo((prev) => {
      // const tmp: Todo[] = JSON.parse(JSON.stringify(prev))
      const notUpdateTodo = prev.filter((t) => t.id !== todo.id);
      todo.status = true;
      todo.expired = new Date(
        new Date().setHours(24, 0, 0, 0)
      ).toLocaleString();
      store.saveTodo([...notUpdateTodo, todo]);
      return [...notUpdateTodo, todo];
    });
  };

  return (
    <TouchableOpacity onLongPress={handleSelecting} delayLongPress={300}>
      <View
        style={[
          small ? styles.smallContainer : styles.todoContainer,
          {
            backgroundColor: isSelected
              ? "#c6ff00"
              : todo.status === true
              ? "#1769aa"
              : "#35baf6",
          },
        ]}
      >
        <View>
          <Text style={small ? styles.smallName : styles.todoName}>
            {todo.name}
          </Text>
          {!small && (
            <Text style={styles.addTime}>
              {new Date(todo.addedAt).toLocaleString()}
            </Text>
          )}
        </View>
        {!small && (
          <View>
            <CButton
              onPress={handleChangeStatus}
              customTextStyle={{
                fontSize: 20,
                color: "#240185",
              }}
              customContainerStyle={{
                height: 45,
              }}
            >
              Done
            </CButton>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default Todo;

const styles = StyleSheet.create({
  todoContainer: {
    height: 60,
    margin: 10,
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  smallContainer: {
    height: 30,
    margin: 3,
    padding: 3,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  todoName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  smallName: {
    fontSize: 12,
    fontWeight: "bold",
  },
  addTime: {
    fontSize: 10,
    paddingTop: 3,
  },
});

import React, { useContext, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TodoContext } from "./todoContext";

interface TodoProps {
  todo: Todo;
}

const Todo: React.FC<TodoProps> = ({ todo }) => {
  const { selected, setSelected } = useContext(TodoContext);
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
  return (
    <TouchableOpacity onLongPress={handleSelecting} delayLongPress={300}>
      <View
        style={[
          styles.todoContainer,
          {
            backgroundColor: isSelected ? "#aaa" : "#35baf6",
          },
        ]}
      >
        <Text style={styles.todoName}>{todo.name}</Text>
        <Text style={styles.addTime}>
          {new Date(todo.addedAt).toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default Todo;

const styles = StyleSheet.create({
  todoContainer: {
    height: 60,
    backgroundColor: "#35baf6",
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  todoName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addTime: {
    fontSize: 10,
    paddingTop: 3,
  },
});

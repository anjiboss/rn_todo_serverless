import React, { useContext, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Modal from "react-native-modal";
import CButton from "./CButton";
import { TodoContext } from "./todoContext";
import * as SecureStore from "expo-secure-store";

interface Props {
  isOpen: boolean;
  closeHandler: () => void;
}

const AddTodo: React.FC<Props> = ({ isOpen, closeHandler }) => {
  const { todo, setTodo } = useContext(TodoContext);
  const [newTodoName, setNewTodo] = useState("");

  const saveTodoHandler = async () => {
    const newTodo: Todo = {
      id: todo.length,
      status: false,
      name: newTodoName,
      addedAt: new Date().getTime(),
    };
    await SecureStore.setItemAsync(
      "stored_todo",
      JSON.stringify([...todo, newTodo])
    );
    setTodo((prev) => [...prev, newTodo]);
    closeHandler();
  };
  return (
    <View>
      <Modal
        isVisible={isOpen}
        hasBackdrop
        onBackButtonPress={closeHandler}
        onBackdropPress={closeHandler}
      >
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            value={newTodoName}
            onChangeText={(text) => {
              setNewTodo(text);
            }}
            placeholder="new todo..."
          />
          <View style={{ alignItems: "center" }}>
            <CButton
              customContainerStyle={{ borderColor: "red", borderWidth: 1 }}
              onPress={saveTodoHandler}
            >
              Save
            </CButton>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddTodo;

const styles = StyleSheet.create({
  container: {
    height: 500,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingTop: 70,
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 50,
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    height: 30,
    width: "80%",
    textAlign: "center",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
  },
});

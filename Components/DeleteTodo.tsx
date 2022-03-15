import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import Modal from "react-native-modal";
import CButton from "./CButton";
import { TodoContext } from "./todoContext";
import * as SecureStore from "expo-secure-store";
import Todo from "./Todo";

interface Props {
  isOpen: boolean;
  closeHandler: () => void;
}

const DeleteTodo: React.FC<Props> = ({ isOpen, closeHandler }) => {
  const { selected, setSelected, setTodo, todo } = useContext(TodoContext);

  const handleDelete = async () => {
    const todoAfterDeleted = todo.filter(
      (td) => !selected.find((_td) => _td.id === td.id)
    );
    await SecureStore.setItemAsync(
      "stored_todo",
      JSON.stringify(todoAfterDeleted)
    );
    setTodo(todoAfterDeleted);
    setSelected([]);
    closeHandler();
  };
  return (
    <View>
      <Modal
        isVisible={isOpen}
        hasBackdrop
        onBackdropPress={closeHandler}
        onBackButtonPress={closeHandler}
      >
        <View style={styles.container}>
          <Text>Are You sure you want to delete this ? </Text>
          <View>
            {selected.map((s) => {
              return <Todo key={s.id} small todo={s} />;
            })}
          </View>
          <View style={styles.btnContainer}>
            <CButton
              customTextStyle={{ color: "#fff" }}
              customContainerStyle={{ backgroundColor: "red" }}
              onPress={handleDelete}
            >
              Delete
            </CButton>
            <CButton
              onPress={() => {
                closeHandler();
              }}
            >
              Cancel
            </CButton>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DeleteTodo;

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
  btnContainer: {
    flexDirection: "row",
  },
});

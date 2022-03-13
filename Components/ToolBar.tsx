import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import CButton from "./CButton";
import { TodoContext } from "./todoContext";

const ToolBar: React.FC = () => {
  const { setAddTodo, setDeleteTodo } = useContext(TodoContext);
  return (
    <View
      style={{
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View style={styles.btnAction}>
        <CButton onPress={() => setAddTodo(true)}>
          <Icon name="add" />
        </CButton>
      </View>
      <View style={styles.btnAction}>
        <CButton onPress={() => setDeleteTodo(true)}>
          <Icon name="delete-outline" />
        </CButton>
      </View>
    </View>
  );
};

export default ToolBar;

const styles = StyleSheet.create({
  btnAction: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "red",
    // borderWidth: 1,
  },
});

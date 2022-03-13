import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import TodoWraper from "./Components/TodoWraper";

export default function App() {
  return (
    <View style={styles.container}>
      <TodoWraper />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "green",
    borderWidth: 1,
  },
});

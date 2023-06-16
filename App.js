import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Task from "./components/Task";

export default function App() {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);

  useEffect(() => {
    loadTodoItems();
  }, []);

  useEffect(() => {
    saveTodoItems();
  }, [taskItems]);

  const loadTodoItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem("todoItems");
      if (storedItems !== null) {
        setTaskItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.log("Error loading todo items:", error);
    }
  };

  const saveTodoItems = async () => {
    try {
      await AsyncStorage.setItem("todoItems", JSON.stringify(taskItems));
    } catch (error) {
      console.log("Error saving todo items:", error);
    }
  };

  const completeTask = (index) => {
    let itemCopy = [...taskItems];
    const isComplete = itemCopy[index].complete;
    itemCopy[index].complete = !isComplete;
    setTaskItems(itemCopy);
  };

  const handleAddTask = () => {
    if (task.length !== 0) {
      Keyboard.dismiss();
      setTaskItems([...taskItems, { text: task, complete: false }]);
      setTask("");
    }
  };

  const onDelete = (index) => {
    let itemCopy = [...taskItems];
    itemCopy.splice(index, 1);
    setTaskItems(itemCopy);
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>My To-Dos</Text>
        <View style={styles.item}>
          {taskItems.map((item, index) => {
            return (
              <Task
                key={index}
                text={item.text}
                complete={item.complete}
                onComplete={() => completeTask(index)}
                onDelete={() => onDelete(index)}
              />
            );
          })}
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder="write a task"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  item: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#55BCF6",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
});

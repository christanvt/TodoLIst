import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Task from "./components/Task";
import { v4 as uuidv4 } from "uuid";

// import {
//   useFonts,
//   DancingScript_400Regular,
// } from '@expo-google-fonts/dancing-script';
import { useFonts } from "expo-font";

import AppLoading from "expo-app-loading";
import axios from "axios";

export default function App() {
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
      setTasks(res.data);
    });
  }, []);

  // let [fontsLoaded] = useFonts({
  //   DancingScript_400Regular,
  // });

  let [fontsLoaded] = useFonts({
    "Hachi-Maru": require("./assets/fonts/HachiMaruPop-Regular.ttf"),
  });

  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (taskInput !== "") {
      const newTask = {
        id: uuidv4(),
        title: taskInput,
      };
      setTaskInput("");
      setTasks([...tasks, newTask]);
    }
  };

  const deleteTask = (taskId) => {
    // FILTRER la copie pour supprimer la tâche en cours (indice - sérieux?)
    const tmpTasks = tasks.filter((macouille) => macouille.id !== taskId);
    // Remplacer l'état tasks par cette copie de tableau (indice setTasks)
    setTasks(tmpTasks);
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Ma Todo List</Text>

        <TextInput
          style={styles.input}
          value={taskInput}
          onChangeText={(txt) => setTaskInput(txt)}
        />
        <Button title="Ajouter" onPress={addTask} />

        <FlatList
          data={tasks}
          renderItem={({ item }) => {
            return <Task item={item} deleteTask={deleteTask} />;
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#bcbcbc",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  input: {
    width: 300,
    height: 50,
    backgroundColor: "white",
    color: "black",
    textAlign: "center",
  },
  main: {
    marginTop: 20,
    width: 300,
  },
  title: {
    margin: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: "Hachi-Maru",
  },
});

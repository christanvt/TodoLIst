import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  CheckBox,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const Task = ({ item, deleteTask }) => {
  const delMsg = () =>
    Alert.alert(
      "Suppression tâche",
      "Es-tu vraiment sûr ou alors t'es un petit peu con?",
      [
        {
          text: "Oui",
          onPress: () => deleteTask(item.id),
        },
        {
          text: "Non",
          onPress: () => console.log("Annulation de la suppression"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );

  const [checked, setChecked] = useState();

  const check = () => {
    setChecked(!checked);
  };
  return (
    <View style={checked ? styles.taskCompleted : styles.task}>
      <TouchableOpacity onPress={check}>
        {checked ? (
          <MaterialIcons name="radio-button-checked" size={30} color="black" />
        ) : (
          <MaterialIcons
            name="radio-button-unchecked"
            size={30}
            color="black"
          />
        )}
      </TouchableOpacity>

      <Text style={styles.taskText}>{item.title} </Text>
      <TouchableOpacity onPress={delMsg}>
        <MaterialCommunityIcons name="delete-variant" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  task: {
    borderWidth: 1,
    borderColor: "grey",
    borderStyle: "solid",
    textAlign: "center",
    padding: 10,
    backgroundColor: "white",
    width: 300,
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  taskText: {
    textAlign: "left",
    paddingLeft: 10,
    width: 300,
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },

  taskCompleted: {
    borderWidth: 1,
    borderColor: "grey",
    borderStyle: "solid",
    textAlign: "center",
    padding: 10,
    backgroundColor: "red",
    width: 300,
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

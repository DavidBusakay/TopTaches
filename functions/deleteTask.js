import Colors from "@/constants/Colors";
import { Vibration } from "react-native";
import { showMessage } from "react-native-flash-message";

export default function deleteTask(id, setTasks) {
  Vibration.vibrate(50);
  setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  showMessage({
    message: "Suppression",
    description: "La tâche a été supprimée avec succès !",
    type: "success",
    icon: "success",
    backgroundColor: Colors.primary,
    duration: 3000,
  });
}

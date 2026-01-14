import Colors from "@/constants/Colors";
import { cancelTaskNotification } from "@/services/notification";
import { Vibration } from "react-native";
import { showMessage } from "react-native-flash-message";

export default async function deleteTask(id, tasks, setTasks) {
  Vibration.vibrate(50);

  const taskToDelete = tasks.find((t) => t.id === id);
  if (!taskToDelete) return;

  if (taskToDelete.notificationId) {
    await cancelTaskNotification(taskToDelete.notificationId);
  }

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

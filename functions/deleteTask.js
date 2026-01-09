import { Vibration } from "react-native";

export default function deleteTask(id, setTasks) {
  Vibration.vibrate(50);
  setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
}

import {
  cancelTaskNotification,
  scheduleTaskNotification,
} from "@/services/notification";
import { Vibration } from "react-native";

export default async function toggleTask(id, tasks, setTasks) {
  Vibration.vibrate(50);

  const taskToUpdate = tasks.find((t) => t.id === id);
  if (!taskToUpdate) return;

  let newNotificationId = taskToUpdate.notificationId;

  if (!taskToUpdate.completed) {
    if (taskToUpdate.notificationId) {
      await cancelTaskNotification(taskToUpdate.notificationId);
      newNotificationId = null;
    }
  } else {
    const taskDate = new Date(taskToUpdate.createdAt);
    if (taskDate > new Date() && taskToUpdate.reminder === true) {
      newNotificationId = await scheduleTaskNotification(taskToUpdate);
    }
  }

  setTasks((prevTasks) =>
    prevTasks.map((task) =>
      task.id === id
        ? {
            ...task,
            completed: !task.completed,
            notificationId: newNotificationId,
          }
        : task
    )
  );
}

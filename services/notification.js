import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const requestNotificationPermissions = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Permissions notifications refusées");
    return;
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
};

export const scheduleTaskNotification = async (task) => {
  if (!task?.createdAt || !task?.title) return null;

  const triggerDate = new Date(task.createdAt);

  try {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Rappel de tâche 🚀",
        body: `Il est temps de : ${task.title}`,
        sound: true,
      },
      trigger: {
        type: "date",
        date: triggerDate,
      },
    });
    return id;
  } catch (_) {
    return null;
  }
};

export const cancelTaskNotification = async (notificationId) => {
  if (notificationId) {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
    } catch (_) {}
  }
};

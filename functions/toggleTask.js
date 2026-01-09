import { Vibration } from "react-native";

export default function toggleTask(id, setTasks) {
    Vibration.vibrate(50);
    setTasks(prevTasks =>
        prevTasks.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        )
    );
};
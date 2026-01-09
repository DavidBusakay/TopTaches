import dayjs from "dayjs";
import Colors from "../constants/Colors";

export default function markedDays(tasks) {
    const marked = {};
    tasks.forEach(task => {
        const dateKey = dayjs(task.createdAt).format("YYYY-MM-DD");
        marked[dateKey] = { marked: true, dotColor: Colors.primary };
    });
    return marked;
};
import dayjs from "dayjs";

export default function countTasks(tasks, filter, selectedDate) {
  return tasks.filter((task) => {
    const dateMatch =
      dayjs(task.createdAt).format("YYYY-MM-DD") ===
      dayjs(selectedDate.replace(/\//g, "-")).format("YYYY-MM-DD");
    if (!dateMatch) return false;
    if (filter === "todo") {
      return task.completed === false;
    }
    if (filter === "done") {
      return task.completed === true;
    }
    return true;
  }).length;
}

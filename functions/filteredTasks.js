import dayjs from "dayjs";

export default function filteredTasks(tasks, selectedDate) {
  return tasks.filter((task) => {
    return (
      dayjs(task.createdAt).format("YYYY-MM-DD") ===
      dayjs(selectedDate.replace(/\//g, "-")).format("YYYY-MM-DD")
    );
  });
}

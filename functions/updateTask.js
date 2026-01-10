export default function updateTask(tasks, id, newData) {
  return tasks.map((task) => (task.id === id ? { ...task, ...newData } : task));
}

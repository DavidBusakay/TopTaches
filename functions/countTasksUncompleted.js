import dayjs from "dayjs";

export default function countTasksUncompleted(tasks, selectedDate) {
    let count = 0;
    const filterTasks = tasks.filter(task =>
        dayjs(task.createdAt).format("YYYY-MM-DD") === dayjs(selectedDate.replace(/\//g, "-")).format("YYYY-MM-DD")
    );
    filterTasks.map(item =>
        item.completed === false ? count++ : count
    );
    return count;
};
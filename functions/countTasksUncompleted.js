export default function countTasksUncompleted (tasks) {
    let count = 0;
    tasks.map(item =>
        item.completed === false ? count++ : count
    );
    return count;
};
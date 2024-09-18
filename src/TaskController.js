const TaskController = () => {
    let tasks = [
        {
            id: 12345,
            name: "go shopping",
            description: "at the mall",
            dueDate: "2022-09-20",
            priority: "high",
            list: "list1",
            notes: "text for notes",
        }
    ];

    const createTask = (name, description, dueDate, priority, notes, list) => {
        const task = {
            id: Date.now(),
            name,
            description,
            dueDate,
            priority,
            notes,
            list
        }

        tasks.push(task);
        console.log(task);
        console.table(tasks)
        
        return task;
    }

    const getTasks = () => tasks;

    const updateTask = (id, name, description, dueDate, priority, notes, list) => {
        console.table(tasks);
        let taskToUpdate = tasks.find(task => task.id === id);
        taskToUpdate.name = name;
        taskToUpdate.description = description;
        taskToUpdate.dueDate = dueDate;
        taskToUpdate.priority = priority;
        taskToUpdate.notes = notes;
        taskToUpdate.list = list;

        console.table(tasks);
        return taskToUpdate;
    };

    const deleteTask = (id) => {
        let taskToDelete = tasks.find(task => task.id === id);
        tasks.splice(tasks.indexOf(taskToDelete), 1);
    };
    
    return { createTask, getTasks, updateTask, deleteTask };
};

export default TaskController();
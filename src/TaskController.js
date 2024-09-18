const TaskController = () => {
    let tasks = [
        {
            id: 12345,
            name: "go shopping",
            description: "at the mall",
            dueDate: "today",
            priority: "high",
            list: "personal",
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
        
        return task;
    }

    const getTasks = () => tasks;

    
    //TO-DO
    const getTask = (id) => {

    };

    const updateTask = (id) => {

    };

    const deleteTask = (id) => {

    };
    
    return {
        createTask,
        getTasks,
    }
};

export const { createTask, getTasks } = TaskController();
const TaskController = () => {
  let tasks = [
    {
      id: 67890,
      name: 'go shopping',
      description: 'at the mall',
      dueDate: '2022-09-20',
      priority: 'High',
      list: {
        id: 12345,
        name: 'My First List',
      },
      notes: 'text for notes',
      completed: false,
    },
  ];

  const createTask = (name, description, dueDate, priority, notes, list) => {
    const task = {
      id: Date.now(),
      name,
      description,
      dueDate,
      priority,
      notes,
      list: {
        id: list.id,
        name: list.name,
      },
    };

    tasks.push(task);
    saveTasksToStorage();

    return task;
  };

  const getTasks = (listId) => {
    if (listId) {
      return tasks.filter((task) => task.list.id === listId);
    }
    return tasks;
  };

  const updateTask = (
    id,
    name,
    description,
    dueDate,
    priority,
    notes,
    list,
  ) => {
    const taskToUpdate = tasks.find((task) => task.id === id);

    taskToUpdate.name = name;
    taskToUpdate.description = description;
    taskToUpdate.dueDate = dueDate;
    taskToUpdate.priority = priority;
    taskToUpdate.notes = notes;
    taskToUpdate.list = {
      id: list.id,
      name: list.name,
    };

    saveTasksToStorage();

    return taskToUpdate;
  };

  const completeTask = (id) => {
    const taskToComplete = tasks.find((task) => task.id === id);
    taskToComplete.completed = !taskToComplete.completed;
    saveTasksToStorage();
  };

  const editListNameInTasks = (id, name) => {
    tasks.forEach((task) => {
      if (task.list.id === id) {
        task.list.name = name;
      }
    });
    saveTasksToStorage();
  };

  const deleteTask = (id) => {
    const taskToDelete = tasks.find((task) => task.id === id);
    tasks.splice(tasks.indexOf(taskToDelete), 1);
    saveTasksToStorage();
  };

  const saveTasksToStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const getTasksFromStorage = (listId) => {
    if (localStorage.getItem('tasks')) {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    if (listId) {
      return tasks.filter((task) => task.list.id === listId);
    }
    return tasks;
  };

  return {
    createTask,
    getTasks,
    updateTask,
    completeTask,
    editListNameInTasks,
    deleteTask,
    getTasksFromStorage,
  };
};

export default TaskController();

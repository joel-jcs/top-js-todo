import TaskController from "./TaskController.js";

const ListController = () => {
    let lists = [
        {
            id: 12345,
            name: "My First List",
            tasks: [
                {
                    id: 12345,
                    name: "go shopping",
                    description: "at the mall",
                    dueDate: "2022-09-20",
                    priority: "High",
                    list: {
                        id: 12345,
                        name: "My First List",
                    },
                    notes: "text for notes",
                }
            ],
        }
    ];

    const createList = (listName, task) => {
        const list = {
            id: Date.now(),
            name: listName,
            // tasks: [task],
            tasks: [],
        }

        lists.push(list);
        
        return list;
    }

    const editListName = (id, name) => {
        let listToUpdate = lists.find(list => list.id === id);
        listToUpdate.name = name;
        lists.forEach(list => {
            list.tasks.forEach(task => {
                if (task.list.id === id) task.list.name = name;
            });
        });
        TaskController.editListNameInTasks(id, name);
    }

    const getLists = () => lists;

    
    const addTaskToList = (id, task) => {
        let listToUpdate = lists.find(list => list.id === id);
        
        const isTaskInList = lists.find(list => list.tasks.find(taskIndex => taskIndex.id === task.id));
        
        if (isTaskInList) {
            const taskIndex = listToUpdate.tasks.findIndex(taskIndex => taskIndex.id === task.id);
            listToUpdate.tasks[taskIndex] = task;
        } else {
            listToUpdate.tasks.push(task);
        }
    };

    const deleteTaskFromList = (id, task) => {
        let listToUpdate = lists.find(list => list.id === id);
        const taskIndex = listToUpdate.tasks.findIndex(taskIndex => taskIndex.id === task.id);
        listToUpdate.tasks.splice(taskIndex, 1);
    };

    const deleteList = (id) => {
        const listToDelete = lists.findIndex(list => list.id === id);
        lists.splice(listToDelete, 1);

        //delete all tasks belnging to the deleted list
        TaskController.getTasks(id).forEach(task => TaskController.deleteTask(task.id));
    };
    
    return {
        createList,
        editListName,
        getLists,
        addTaskToList,
        deleteTaskFromList,
        deleteList
    }
};

export default ListController();
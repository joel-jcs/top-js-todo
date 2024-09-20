import TaskController from "./TaskController.js";

const ListController = () => {
    let lists = [
        {
            id: 12345,
            name: "My First List",
            tasks: [TaskController.getTasks(12345)[0]],
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
        saveListsToStorage();
        
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
        saveListsToStorage();
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
        saveListsToStorage();
    };

    const deleteTaskFromList = (id, task) => {
        let listToUpdate = lists.find(list => list.id === id);
        const taskIndex = listToUpdate.tasks.findIndex(taskIndex => taskIndex.id === task.id);
        listToUpdate.tasks.splice(taskIndex, 1);
        saveListsToStorage();
    };

    const deleteList = (id) => {
        const listToDelete = lists.findIndex(list => list.id === id);
        lists.splice(listToDelete, 1);

        //delete all tasks belnging to the deleted list
        TaskController.getTasks(id).forEach(task => TaskController.deleteTask(task.id));
        saveListsToStorage();
    };

    const saveListsToStorage = () => {
        localStorage.setItem('lists', JSON.stringify(lists));
    };

    const getListsFromStorage = () => {
        if (localStorage.getItem('lists')) {
            lists = JSON.parse(localStorage.getItem('lists'));
        }
        return lists;
    }
    
    return {
        createList,
        editListName,
        getLists,
        addTaskToList,
        deleteTaskFromList,
        deleteList,
        getListsFromStorage,
    }
};

export default ListController();
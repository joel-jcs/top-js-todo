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
        console.table(lists);
        
        return list;
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

        console.table(lists);
    };

    const deleteTaskFromList = (id, task) => {
        let listToUpdate = lists.find(list => list.id === id);
        const taskIndex = listToUpdate.tasks.findIndex(taskIndex => taskIndex.id === task.id);
        listToUpdate.tasks.splice(taskIndex, 1);

        console.table(lists);
    };

    const deleteList = (id) => {

    };
    
    return {
        createList,
        getLists,
        addTaskToList,
        deleteTaskFromList,
        deleteList
    }
};

export default ListController();
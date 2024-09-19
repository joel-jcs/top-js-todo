import ScreenController from "./ScreenController";
import TaskController from "./TaskController";
import ListController from "./ListController";

const EventController = () => {

    const addList = () => {
        const addListBtn = document.getElementById('add-list-btn');
        addListBtn.addEventListener('click', () => {
            // creates "listNameInput" to type new list name
            let listNameInput = document.createElement('input');
            listNameInput.type = "text";
            listNameInput.id = "add-list-name";
            listNameInput.placeholder = "Type your new list's title";

            // converts the add list button to the listNameInput
            const listsContainer = document.getElementById('lists-container');
            if (!listsContainer.querySelector(`input`)) {
                listsContainer.appendChild(listNameInput);
                listNameInput.focus();
                addListBtn.remove();
            }

            // event listeners for when user is typing name for new list on navbar
            // enter to create the new list
            // escape or click elsewhere to cancel
            listNameInput.addEventListener('keydown', (event) => {
                if (event.key === "Enter") {
                    let newListName = listNameInput.value ? listNameInput.value : "Untitled List";
                    ListController.createList(newListName);
                    ScreenController.loadLists();
                    addList();
                    openList();
                }
        
                if (event.key === "Escape") {
                    listNameInput.blur();
                }
            });

            // removes "listNameInput" when user clicks outside or presses esc key
            const removeListInput = () => {
                listNameInput.remove();
                listNameInput = null;
                listsContainer.appendChild(addListBtn);
            };
            
            listNameInput.addEventListener('focusout', removeListInput);
        });
    }

    const openList = () => {
        const listItems = document.querySelectorAll('.list-item');
        const lists = ListController.getLists();
        listItems.forEach((listItem, index) => {
            listItem.addEventListener('click', () => {
                ScreenController.reloadNavLists();
                ScreenController.reloadTaskView(lists[index]);
            });
        });
    }

    const editOrDeleteList = (listItem) => {
        const listTitle = document.getElementById('content-heading');
        const listItems = ListController.getLists();

        listTitle.addEventListener('click', () => {
            let editListContainer = document.createElement('div');
            editListContainer.id = "edit-list-container";

            let editListNameInput = document.createElement('input');
            editListNameInput.type = "text";
            editListNameInput.id = "edit-list-name";
            editListNameInput.placeholder = "Edit list name";
            editListNameInput.value = listTitle.innerText;

            let cancelListEditBtn = document.createElement('button')
            cancelListEditBtn.id = "cancel-list-edit-btn";
            cancelListEditBtn.type = "button";
            cancelListEditBtn.innerText = "Cancel";

            let deleteListBtn = document.createElement('button')
            deleteListBtn.id = "delete-list-btn";
            deleteListBtn.type = "button";
            deleteListBtn.innerText = "Delete List";

            // converts the add list button to the listNameInput
            const contentContainer = document.getElementById('content-container');
            if (!contentContainer.querySelector(`input[type="text"]`)) {
                contentContainer.insertBefore(editListContainer, contentContainer.firstChild);
                
                editListContainer.appendChild(editListNameInput);
                editListContainer.appendChild(cancelListEditBtn);
                if (listItems.length >= 2) {
                    editListContainer.appendChild(deleteListBtn);
                }
                editListNameInput.focus();
                listTitle.remove();
            }

            // event listeners for when user is typing name for new list on navbar
            editListNameInput.addEventListener('keydown', (event) => {
                if (event.key === "Enter") {
                    if (editListNameInput.value) {
                        ListController.editListName(listItem.id, editListNameInput.value);
                        ScreenController.loadTasks(listItem);
                        ScreenController.reloadNavLists();
                        ScreenController.reloadTaskView(listItem);
                    } else {
                        removeEditListContainer();
                    }
                }
        
                if (event.key === "Escape") {
                    editListNameInput.blur();
                }
            });

            const removeEditListContainer = () => {
                editListContainer.remove();
                editListNameInput = null;
                contentContainer.insertBefore(listTitle, contentContainer.firstChild);
            };
            
            cancelListEditBtn.addEventListener('click', removeEditListContainer);
            
            deleteListBtn.addEventListener('click', () => {
                ListController.deleteList(listItem.id);
                ScreenController.reloadTaskView(ListController.getLists()[0]);
                ScreenController.reloadNavLists();
            });
        });
    }

    const addTask = (listItem) => {
        const addTaskBtn = document.getElementById('add-task-btn');
        addTaskBtn.addEventListener('click', () => {
            ScreenController.openTaskWindow(listItem);
        });
    }

    const viewTask = (listItem) => {
        const tasks = TaskController.getTasks(listItem.id);
        const taskItems = document.querySelectorAll('.task-item');
        taskItems.forEach((taskItem, index) => {
            taskItem.addEventListener('click', () => {
                ScreenController.openTaskWindow(listItem, tasks[index]);
            });
        });
    }

    const closeTask = (listItem) => {
        const cancelTaskBtn = document.getElementById('cancel-task-btn');
        cancelTaskBtn.addEventListener('click', () => {
            ScreenController.reloadTaskView(listItem);
        });
    }

    const saveTask = (listItem, task) => {
        let newTask = null;
        const saveTaskBtn = document.getElementById('save-task-btn');
        saveTaskBtn.addEventListener('click', () => {
            let name = document.getElementById('task-title').value;
            let description = document.getElementById('task-window-desc').value;
            let dueDate = document.getElementById('task-date').value;
            let priority = document.getElementById('task-priority').value;
            let notes = document.getElementById('task-notes').value;
            if (task) {
                task = TaskController.updateTask(task.id, name, description, dueDate, priority, notes, listItem);
            } else {
                newTask = TaskController.createTask(name, description, dueDate, priority, notes, listItem);
            }

            ListController.addTaskToList(listItem.id, task ? task : newTask);
            
            ScreenController.reloadTaskView(listItem);
        });
    }

    const deleteTask = (listItem, task) => {
        const taskBtnContainer = document.getElementById('task-btn-container');
        const cancelTaskBtn = document.getElementById('cancel-task-btn');
        const deleteTaskBtn = document.createElement('button');
        deleteTaskBtn.id = 'delete-task-btn';
        deleteTaskBtn.type = 'button';
        deleteTaskBtn.classList.add('task-btn');
        deleteTaskBtn.textContent = 'Delete Task';
        taskBtnContainer.insertBefore(deleteTaskBtn, cancelTaskBtn);

        deleteTaskBtn.addEventListener('click', () => {
            TaskController.deleteTask(task.id);
            ListController.deleteTaskFromList(listItem.id, task);
            ScreenController.reloadTaskView(listItem);
        });
    }

    const reloadEventListeners = () => {
        
    };

    return { 
        addList, 
        openList, 
        editOrDeleteList, 
        addTask, 
        viewTask, 
        closeTask,
        saveTask,
        deleteTask,
        reloadEventListeners 
    };
}

export default EventController();
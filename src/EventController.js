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
                ScreenController.loadTasks(lists[index]);
                ScreenController.loadLists();
                loadEventListeners(lists[index]);
            });
        });
    }

    const editOrDeleteList = (currentList) => {
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
                        ListController.editListName(currentList.id, editListNameInput.value);
                        ScreenController.loadTasks(currentList);
                        ScreenController.loadLists();
                        loadEventListeners(currentList);
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
                ListController.deleteList(currentList.id);
                ScreenController.loadLists();
                ScreenController.loadTasks(ListController.getLists()[0]);
                loadEventListeners(ListController.getLists()[0]);
            });
        });
    }

    const addTask = (currentList) => {
        const addTaskBtn = document.getElementById('add-task-btn');
        addTaskBtn.addEventListener('click', () => {
            ScreenController.openTaskWindow(currentList);
        });
    }

    const viewTask = (currentList) => {
        const tasksFilteredByList = TaskController.getTasks(currentList.id);
        const taskItems = document.querySelectorAll('.task-details-container');

        taskItems.forEach((taskItem, index) => {
            taskItem.addEventListener('click', () => {
                ScreenController.openTaskWindow(currentList, tasksFilteredByList[index]);
            });
        });
    }

    const closeTask = (currentList) => {
        const closeTaskBtn = document.getElementById('close-task-btn');
        closeTaskBtn.addEventListener('click', () => {
            ScreenController.loadTasks(currentList);
            loadEventListeners(currentList);
        });
    }

    const saveTask = (currentList, openedTask) => {
        let newTask = null;
        const saveTaskBtn = document.getElementById('save-task-btn');
        saveTaskBtn.addEventListener('click', () => {
            let name = document.getElementById('task-title').value;
            let description = document.getElementById('task-window-desc').value;
            let dueDate = document.getElementById('task-date').value;
            let priority = document.getElementById('task-priority').value;
            let notes = document.getElementById('task-notes').value;
            if (openedTask) {
                openedTask = TaskController.updateTask(openedTask.id, name, description, dueDate, priority, notes, currentList);
            } else {
                newTask = TaskController.createTask(name, description, dueDate, priority, notes, currentList);
            }
            ListController.addTaskToList(currentList.id, openedTask ? openedTask : newTask);
            
            ScreenController.loadTasks(currentList);
            loadEventListeners(currentList);
        });
    }

    const completeTask = (currentList, openedTask) => {
        const taskBtnContainer = document.getElementById('task-btn-container');
        const completeTaskBtn = document.getElementById('complete-task-btn');

        // if (!completeTaskBtn) {
        //     const completeTaskBtn = document.createElement('button');
        //     completeTaskBtn.id = "complete-task-btn";
        //     completeTaskBtn.classList.add("task-btn");
        //     completeTaskBtn.type = "button";
        //     completeTaskBtn.textContent = "Mark Complete";
        //     taskBtnContainer.appendChild(completeTaskBtn);
        // } else {
            completeTaskBtn.addEventListener('click', () => {
                TaskController.completeTask(openedTask.id);
                completeTaskBtn.textContent = completeTaskBtn.textContent === 'Mark Complete' ? 'Completed' : 'Mark Complete';
                completeTaskBtn.style.backgroundColor = completeTaskBtn.style.backgroundColor === "gray" ? "green" : "gray";
                ScreenController.loadTasks(currentList);
                loadEventListeners(currentList);
            });
        // }
    };

    const taskCompleteCheckbox = (currentList) => {
        const taskCheckboxes = document.querySelectorAll('.checkbox');
        taskCheckboxes.forEach((checkbox, index) => {
            const task = TaskController.getTasks(currentList.id)[index];
            checkbox.addEventListener('click', () => {
                TaskController.completeTask(task.id);
                ScreenController.loadTasks(currentList);
                loadEventListeners(currentList);
            })            
        });
    }

    const removeCompleteTaskBtn = () => {
        const taskBtnContainer = document.getElementById('task-btn-container');
        const completeTaskBtn = document.getElementById('complete-task-btn');
        taskBtnContainer.removeChild(completeTaskBtn);
    }

    const deleteTask = (currentList, openedTask) => {
        const taskBtnContainer = document.getElementById('task-btn-container');
        const closeTaskBtn = document.getElementById('close-task-btn');
        const deleteTaskBtn = document.createElement('button');
        deleteTaskBtn.id = 'delete-task-btn';
        deleteTaskBtn.type = 'button';
        deleteTaskBtn.classList.add('task-btn');
        deleteTaskBtn.textContent = 'Delete Task';
        taskBtnContainer.insertBefore(deleteTaskBtn, closeTaskBtn);

        deleteTaskBtn.addEventListener('click', () => {
            TaskController.deleteTask(openedTask.id);
            ListController.deleteTaskFromList(currentList.id, openedTask);
            ScreenController.loadTasks(currentList);
            loadEventListeners(currentList);
        });
    }

    const loadEventListeners = (list) => {
        addList();
        openList();
        viewTask(list);
        addTask(list);
        taskCompleteCheckbox(list);
        editOrDeleteList(list);
    };

    return { 
        addList, 
        openList, 
        editOrDeleteList, 
        addTask, 
        viewTask, 
        closeTask,
        saveTask,
        completeTask,
        taskCompleteCheckbox,
        removeCompleteTaskBtn,
        deleteTask,
        loadEventListeners,
    };
}

export default EventController();
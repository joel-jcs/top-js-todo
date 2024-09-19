import ListController from "./ListController.js";
import TaskController from "./TaskController.js";

const ScreenController = function () {
    const loadLists = () => {
        const listsSection = document.getElementById('lists-section');
        listsSection.innerHTML = '';

        const listsContainer = document.createElement('div');
        listsContainer.id = "lists-container";

        listsContainer.innerHTML = `<h1 id="lists-heading">My Lists</h1>`

        const lists = ListController.getLists();
        lists.forEach(list => {
            listsContainer.innerHTML += `<button class="list-item">${list.name}</button>`;
        });

        listsContainer.innerHTML += `<button id="add-list-btn" type="button">+ Add List</button>`

        listsSection.appendChild(listsContainer);
    }

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
                    loadLists();
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
                loadTasks(lists[index]);
                viewTaskListener(lists[index]);
                reloadLists();
                editList(lists[index]);
            });
        });
    }

    const reloadLists = () => {
        loadLists();
        addList();
        openList();
    }

    const loadTasks = (listItem) => {
        const contentContainer = document.getElementById('content-container');
        contentContainer.innerHTML = '';

        // initialize content container's heading
        let contentHeading = document.createElement('h1');
        contentHeading.id = "content-heading";
        contentHeading.innerHTML = '';
        contentHeading.innerText = listItem.name;
        contentContainer.appendChild(contentHeading);

        // initialize task container
        const tasksContainer = document.createElement('div');
        tasksContainer.id = "task-container";
        tasksContainer.innerHTML = '';
        contentContainer.appendChild(tasksContainer);

        // add tasks to DOM
        const tasks = TaskController.getTasks(listItem.id);
        tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.classList.add("task-item");
            taskItem.innerHTML += `
                <input type="checkbox" class="checkbox">
                <div class="task-details-container">
                    <h3 class="task-name">${task.name? task.name : "Untitled"}</h3>
                    <span class="task-date">${task.dueDate ? `Due Date: ${task.dueDate}` : ""}</span>
                    <span class="task-priority">${task.priority? `Priority: ${task.priority}` : ""}</span>
                </div>
            `;
            tasksContainer.appendChild(taskItem);
        });
        tasksContainer.innerHTML += `<button id="add-task-btn" class="task-item" type="button">+ Add Task</button>`
        addTaskListener(listItem);
    }

    const addTaskListener = (listItem) => {
        const addTaskBtn = document.getElementById('add-task-btn');
        addTaskBtn.addEventListener('click', () => {
            expandTask(listItem);
        });
    }

    const editList = (listItem) => {
        const listTitle = document.getElementById('content-heading');
        const listItems = ListController.getLists();

        listTitle.addEventListener('click', () => {
            console.log("working")

            let editListContainer = document.createElement('div');
            editListContainer.id = "edit-list-container";

            let editListNameInput = document.createElement('input');
            editListNameInput.type = "text";
            editListNameInput.id = "edit-list-name";
            editListNameInput.placeholder = "Edit list name";

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
            // enter to create the new list
            // escape or click elsewhere to cancel
            editListNameInput.addEventListener('keydown', (event) => {
                if (event.key === "Enter") {
                    // let newListName = editListNameInput.value ? listNameInput.value : "Untitled List";
                    // ListController.createList(newListName);
                    // reloadLists();
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
                loadTasks(listItems[0]);
                reloadLists();
                resetExpandedTask(listItems[0]);
            });
        });
    }

    const expandTask = (listItem, task) => {
        let expandedTaskItem = document.createElement('div');
        expandedTaskItem.id = "expanded-task-item";
        expandedTaskItem.innerHTML = `
            <label id="task-title-label" class="task-input-label" for="task-title">Title: 
                <input id="task-title" type="text" placeholder="Pet my doggo"> 
            </label>

            <label id="task-desc-label" class="task-input-label" for="expanded-task-desc">Description: 
                <textarea id="expanded-task-desc" wrap="soft" maxlength="450" placeholder="Belly rub first, brush back second... etc. (Max 450 characters) "></textarea> 
            </label>

            <label id="task-date-label" class="task-input-label" for="task-date">Due Date: 
                <input id="task-date" type="date">
            </label>

            <label id="task-priority-label" class="task-input-label" for="task-priority">Priority: 
                <select id="task-priority">
                    <option value="" selected>Select priority...</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </label>

            <label id="task-list-label" class="task-input-label" for="task-list">List: 
            <span id="task-list">${listItem.name}</span>
            </label>

            <label id="task-notes-label" class="task-input-label" for="task-notes">Notes: 
                <input id="task-notes" type="text" placeholder="Remember to trim nails">
            </label>

            <div id="task-btn-container">
                <button id="save-task-btn" class="task-btn" type="button">Save Task</button>
                <button id="cancel-task-btn" class="task-btn" type="button">Cancel</button>
            </div>
            `;

        const contentContainer = document.getElementById('content-container');
        const tasksContainer = document.getElementById('task-container');
        const contentHeading = document.getElementById('content-heading');
        

        if (!contentContainer.querySelector(`#expanded-task-item`)) {
            contentContainer.appendChild(expandedTaskItem);
            tasksContainer.style.filter = "blur(3px)";
            contentHeading.style.filter = "blur(3px)";

            if (task) {
                document.getElementById('task-title').value = task.name;
                document.getElementById('expanded-task-desc').value = task.description;
                document.getElementById('task-date').value = task.dueDate;
                document.getElementById('task-priority').value = task.priority;
                document.getElementById('task-list').value = task.list;
                document.getElementById('task-notes').value = task.notes;

                saveTaskListener(listItem, task);
                deleteTaskListener(listItem, task);
            } else { //new task, didnt exist before
                saveTaskListener(listItem);
            }
            cancelTaskListener(listItem);
        }

        return expandedTaskItem;
    }

    const resetExpandedTask = (listItem) => {
        loadTasks(listItem);
        addTaskListener(listItem);
        viewTaskListener(listItem);
        editList(listItem);
    };

    const saveTaskListener = (listItem, task) => {
        let newTask = null;
        const saveTaskBtn = document.getElementById('save-task-btn');
        saveTaskBtn.addEventListener('click', () => {
            let name = document.getElementById('task-title').value;
            let description = document.getElementById('expanded-task-desc').value;
            let dueDate = document.getElementById('task-date').value;
            let priority = document.getElementById('task-priority').value;
            let notes = document.getElementById('task-notes').value;
            if (task) {
                task = TaskController.updateTask(task.id, name, description, dueDate, priority, notes, listItem);
            } else {
                newTask = TaskController.createTask(name, description, dueDate, priority, notes, listItem);
            }

            ListController.addTaskToList(listItem.id, task ? task : newTask);
            
            resetExpandedTask(listItem);
        });
    }

    const deleteTaskListener = (listItem, task) => {
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
            resetExpandedTask(listItem);
        });
    }

    const cancelTaskListener = (listItem) => {
        const cancelTaskBtn = document.getElementById('cancel-task-btn');
        cancelTaskBtn.addEventListener('click', () => {
            resetExpandedTask(listItem);
        });
    }
    
    const viewTaskListener = (listItem) => {
        const tasks = TaskController.getTasks(listItem.id);
        const taskItems = document.querySelectorAll('.task-item');
        taskItems.forEach((taskItem, index) => {
            taskItem.addEventListener('click', () => {
                expandTask(listItem, tasks[index]);
            });
        });
    }
    
    return { loadLists, addList, openList, loadTasks, editList, addTaskListener, viewTaskListener, };
};

export default ScreenController();
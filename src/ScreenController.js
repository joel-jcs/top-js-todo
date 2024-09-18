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

        listsContainer.innerHTML += `<button id="add-list-btn" class="list-item" type="button">+ Add List</button>`

        listsSection.appendChild(listsContainer);
    }

    const addList = () => {
        const addListBtn = document.getElementById('add-list-btn');
        addListBtn.addEventListener('click', () => {
            let listNameInput = document.createElement('input');
            listNameInput.type = "text";
            listNameInput.id = "add-list-name";
            listNameInput.placeholder = "Type your new list's title";

            const listsContainer = document.getElementById('lists-container');
            if (!listsContainer.querySelector(`input`)) {
                listsContainer.appendChild(listNameInput);
                listNameInput.focus();
                addListBtn.remove();
            }

            listNameInput.addEventListener('keydown', (event) => {
                if (event.key === "Enter") {
                    let newListName = listNameInput.value;
                    ListController.createList(newListName);
                    loadLists();
                    addList();
                }
        
                if (event.key === "Escape") {
                    listNameInput.blur();
                }
            });
            const removeListInput = () => {
                listNameInput.remove();
                listNameInput = null;
                listsContainer.appendChild(addListBtn);
            };
            
            listNameInput.addEventListener('focusout', removeListInput);
        });
    }

    const loadTasks = (list) => {
        const contentContainer = document.getElementById('content-container');
        contentContainer.innerHTML = '';

        let contentHeading = document.createElement('h1');
        contentHeading.id = "content-heading";
        contentHeading.innerHTML = '';
        contentHeading.innerText = list.name;
        contentContainer.appendChild(contentHeading);

        const tasksContainer = document.createElement('div');
        tasksContainer.id = "task-container";
        tasksContainer.innerHTML = '';
        contentContainer.appendChild(tasksContainer);

        const tasks = TaskController.getTasks();
        tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.classList.add("task-item");
            taskItem.innerHTML += `
                <input type="checkbox" class="checkbox">
                <div class="task-details-container">
                    <h3 class="task-name">${task.name}</h3>
                    <span class="task-desc">${task.description}</span>
                </div>
            `;

            tasksContainer.appendChild(taskItem);
        });
        tasksContainer.innerHTML += `<button id="add-task-btn" class="task-item" type="button">+ Add Task</button>`
    }

    const addTask = () => {
        const addTaskBtn = document.getElementById('add-task-btn');
        addTaskBtn.addEventListener('click', () => {
            addTaskBtn.remove();
            expandTask();
        });
    }

    //TO-DO: turn ExpandTask into a popup instead
    const expandTask = (task) => {
        let expandedTaskItem = document.createElement('div');
        expandedTaskItem.id = "expanded-task-item";
        expandedTaskItem.innerHTML = `
            <label id="task-title-label" class="task-input-label" for="task-title">Title: 
                <input id="task-title" type="text" placeholder="Pet my doggo"> 
            </label>

            <label id="task-desc-label" class="task-input-label" for="task-desc">Description: 
                <textarea id="task-desc" wrap="soft" maxlength="450" placeholder="Belly rub first, brush back second... etc. (Max 450 characters) "></textarea> 
            </label>

            <label id="task-date-label" class="task-input-label" for="task-date">Due Date: 
                <input id="task-date" type="date">
            </label>

            <label id="task-priority-label" class="task-input-label" for="task-priority">Priority: 
                <select id="task-priority">
                    <option value="" selected>Select priority...</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
            </label>

            <label id="task-list-label" class="task-input-label" for="task-list">List: 
            <select id="task-list">
                <option value="list1">List 1</option>
                <option value="new-list">+ Create new list</option>
            </select>
            </label>

            <label id="task-notes-label" class="task-input-label" for="task-notes">Notes: 
                <input id="task-notes" type="text" placeholder="Remember to trim nails">
            </label>

            <div id="task-btn-container">
                <button id="save-task-btn" class="task-btn" type="button">Save Task</button>
                <button id="cancel-task-btn" class="task-btn" type="button">Cancel</button>
            </div>
            `;

            // lower priority: fix issue where clicking on add task and then 
            // clicking on another task will not show the existing task's info
        const tasksContainer = document.getElementById('task-container');
        if (!tasksContainer.querySelector(`#expanded-task-item`)) {
            tasksContainer.appendChild(expandedTaskItem);
            
            if (task) {
                document.getElementById('task-title').value = task.name;
                document.getElementById('task-desc').value = task.description;
                document.getElementById('task-date').value = task.dueDate;
                document.getElementById('task-priority').value = task.priority;
                document.getElementById('task-list').value = task.list;
                document.getElementById('task-notes').value = task.notes;
                saveTask(task.id);
                // TaskController.deleteTask();
            } else {
                saveTask();
            }
            cancelTask();
        }

        return expandedTaskItem;
    }

    const resetExpandedTask = () => {
        let expandedTaskItem = document.getElementById('expanded-task-item');
        expandedTaskItem = null;
        loadTasks("Today");
        addTask();
        viewTask();
    };

    const saveTask = (taskId) => {
        const saveTaskBtn = document.getElementById('save-task-btn');
        saveTaskBtn.addEventListener('click', () => {
            let name = document.getElementById('task-title').value;
            let description = document.getElementById('task-desc').value;
            let dueDate = document.getElementById('task-date').value;
            let priority = document.getElementById('task-priority').value;
            let list = document.getElementById('task-list').value;
            let notes = document.getElementById('task-notes').value;
            if (taskId) {
                TaskController.updateTask(taskId, name, description, dueDate, priority, notes, list);
            } else {
                TaskController.createTask(name, description, dueDate, priority, notes, list);
            }
            
            resetExpandedTask();
        });
    }

    const cancelTask = () => {
        const cancelTaskBtn = document.getElementById('cancel-task-btn');
        cancelTaskBtn.addEventListener('click', () => {
            resetExpandedTask();
        });
    }
    
    const viewTask = () => {
        const tasks = TaskController.getTasks();
        const taskItems = document.querySelectorAll('.task-item');
        const addTaskBtn = document.getElementById('add-task-btn');
        taskItems.forEach((taskItem, index) => {
            taskItem.addEventListener('click', () => {
                expandTask(tasks[index]);
                addTaskBtn.remove();
                taskItem.remove();
            })
        });
    }
    
    return { loadLists, addList, loadTasks, addTask, viewTask, }
};

export const { loadLists, addList, loadTasks, addTask, viewTask } = ScreenController();
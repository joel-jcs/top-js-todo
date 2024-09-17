import { createList, getLists } from "./ListController.js";
import { createTask, getTasks } from "./TaskController.js";

const ScreenController = function () {
    const loadLists = () => {
        const listsSection = document.getElementById('lists-section');
        listsSection.innerHTML = '';

        const listsContainer = document.createElement('div');
        listsContainer.id = "lists-container";

        listsContainer.innerHTML = `<h1 id="lists-heading">My Lists</h1>`

        const lists = getLists();
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
                    createList(newListName);
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

        const tasks = getTasks();
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

            tasksContainer.innerHTML += `<button id="add-task-btn" class="task-item" type="button">+ Add Task</button>`
        });
    }

    const addTask = () => {
        const addTaskBtn = document.getElementById('add-task-btn');
        addTaskBtn.addEventListener('click', () => {
            expandTask();
        });
    }


    // ${task.name ? task.name : ""}
    // ${task.description ? task.description : ""}
    // ${task.dueDate ? task.dueDate : ""}
    // ${task.notes ? task.notes : ""}

    const expandTask = (task) => {
        const expandedTaskItem = document.createElement('div');
        expandedTaskItem.id = "expanded-task-item";
        expandedTaskItem.innerHTML = `
            <label class="task-input-label" for="task-title">Title: </label>
            <input id="task-title" type="text" placeholder="Pet my doggo"> 

            <label class="task-input-label" for="task-desc">Description: </label>
            <input id="task-desc" type="textarea" placeholder="Pet doggo on his belly, paws, etc."> 

            <label class="task-input-label" for="task-date">Due Date: </label>
            <input id="task-date" type="date">

            <label class="task-input-label" for="task-priority">Priority: </label>
            <select id="task-priority">
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>

            <select id="task-list">
                <option value="list1">List 1</option>
                <option value="new-list">+ Create new list</option>
            </select>

            <label class="task-input-label" for="task-notes">Notes: </label>
            <input id="task-notes" type="text" placeholder="Do it with brush">

            <label class="task-input-label" for="task-list">List: </label>
        `;

        const tasksContainer = document.getElementById('task-container');
        
        if (!tasksContainer.querySelector(`#expanded-task-item`)) {
            tasksContainer.appendChild(expandedTaskItem);    
        }
    }
    
    return { loadLists, addList, loadTasks, addTask, expandTask, }
};

export const { loadLists, addList, loadTasks, addTask, expandTask } = ScreenController();
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

        listsContainer.innerHTML += `<button id="add-list-btn" class="list-item" type="button">Add List</button>`

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
                    <label for="" class="task-label">${task.name}</label>
                    <span class="task-desc">${task.description}</span>
                </div>
            `;

            tasksContainer.appendChild(taskItem);
        });
    }
    
    return {
        loadLists,
        addList,
        loadTasks,
    }
};

export const { loadLists, addList, loadTasks } = ScreenController();
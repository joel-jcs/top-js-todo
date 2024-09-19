import EventController from "./EventController.js";
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
                    <h3 class="task-name">${task.name? task.name : "Untitled Task"}</h3>
                    <span class="task-date">${task.dueDate ? `Due Date: ${task.dueDate}` : ""}</span>
                    <span class="task-priority">${task.priority? `Priority: ${task.priority}` : ""}</span>
                </div>
            `;
            tasksContainer.appendChild(taskItem);
        });
        tasksContainer.innerHTML += `<button id="add-task-btn" class="task-item" type="button">+ Add Task</button>`
    }

    const taskWindowTemplate = () => {
        let listName = document.getElementById('content-heading').innerText;

        let taskWindow = document.createElement('div');
        taskWindow.id = "task-window";
        taskWindow.innerHTML = `
            <label id="task-title-label" class="task-input-label" for="task-title">Title: 
                <input id="task-title" type="text" placeholder="Pet my doggo"> 
            </label>

            <label id="task-desc-label" class="task-input-label" for="task-window-desc">Description: 
                <textarea id="task-window-desc" wrap="soft" maxlength="450" placeholder="Belly rub first, brush back second... etc. (Max 450 characters) "></textarea> 
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
                <span id="task-list">${listName}</span>
            </label>

            <label id="task-notes-label" class="task-input-label" for="task-notes">Notes: 
                <input id="task-notes" type="text" placeholder="Remember to trim nails">
            </label>

            <div id="task-btn-container">
                <button id="save-task-btn" class="task-btn" type="button">Save Task</button>
                <button id="cancel-task-btn" class="task-btn" type="button">Cancel</button>
            </div>
            `;
        return taskWindow;
    }

    const openTaskWindow = (listItem, task) => {
        let taskWindow = taskWindowTemplate();

        const contentContainer = document.getElementById('content-container');
        const tasksContainer = document.getElementById('task-container');
        const contentHeading = document.getElementById('content-heading');
        
        if (!contentContainer.querySelector(`#task-window`)) {
            contentContainer.appendChild(taskWindow);
            tasksContainer.style.filter = "blur(3px)";
            contentHeading.style.filter = "blur(3px)";

            if (task) {
                document.getElementById('task-title').value = task.name;
                document.getElementById('task-window-desc').value = task.description;
                document.getElementById('task-date').value = task.dueDate;
                document.getElementById('task-priority').value = task.priority;
                document.getElementById('task-list').value = task.list;
                document.getElementById('task-notes').value = task.notes;

                EventController.saveTask(listItem, task);
                EventController.deleteTask(listItem, task);
            } else { //new task, didnt exist before
                EventController.saveTask(listItem);
            }
            EventController.closeTask(listItem);
        }
        return taskWindow;
    }

    return {
        loadLists, 
        loadTasks,
        openTaskWindow,
    };
};

export default ScreenController();

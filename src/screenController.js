import { getLists } from "./listsManager.js";

const ScreenController = function () {
    const loadLists = () => {
        const listsContainer = document.createElement('div');
        listsContainer.id = "lists-container";

        listsContainer.innerHTML = `<h1 id="lists-heading">My Lists</h1>`

        const lists = getLists();
        lists.forEach(list => {
            listsContainer.innerHTML += `<button class="list-item">${list}</button>`
        });

        listsContainer.innerHTML += `<button id="add-list-btn" class="list-item">Add List</button>`

        return listsContainer;
    }
    
    return {
        loadLists,
    }
};

export const { loadLists } = ScreenController();
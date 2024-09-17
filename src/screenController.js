import { getProjects } from "./projectsManager.js";

const ScreenController = (() => {
    const LoadProjects = () => {
    const projectContainer = document.createElement('div');
    projectContainer.id = "project-container";
    projectContainer.innerHTML = `
    <h1 id="projects-heading">My Projects</h1>
    <div id="projects-container">
        <button class="list-item">project 1</button>
        <button class="list-item">project 2</button>
        <button class="list-item add-project-btn">Add Project</button>
    </div>
    `;

    //todo continue this one
    // const projects = getProjects;
    // projects.forEach(project => {
    //     innerHTML += `<button class="list-item">${project}</button>`
    // });

    return projectContainer;
    }
    
    return {
        LoadProjects,
    }
})();

const { LoadProjects } = ScreenController;
export { LoadProjects };
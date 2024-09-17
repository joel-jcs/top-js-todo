const project = () => {
    let projects = ["Project 1", "Project 2"];

    const createProject = (projectName) => {
        const project = {
            // id: Date.now(), UPDATE WITH THE REQUIRED ODINPROJECT
            name: projectName,
            tasks: [],
        }
        projects.push(project);
        return project;
    }

    const getProjects = () => projects;

    const getProject = (id) => {
        //pending
    };
    
    return {
        createProject,
        getProjects,
    }
};

const { createProject, getProjects } = project;
export { getProjects, createProject };
import "./styles.css";
import { LoadProjects } from "./screenController.js";

const projectsSection = document.getElementById('projects-section');
projectsSection.appendChild(LoadProjects());
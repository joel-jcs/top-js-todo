import "./styles.css";
import { loadLists } from "./screenController.js";

const myListsSection = document.getElementById('lists-section');
myListsSection.appendChild(loadLists());
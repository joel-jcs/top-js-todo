import "./styles.css";
import { loadLists } from "./ScreenController.js";

const myListsSection = document.getElementById('lists-section');
myListsSection.appendChild(loadLists());
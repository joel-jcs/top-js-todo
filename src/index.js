import "./styles.css";
import { loadLists, addList, loadTasks } from "./ScreenController.js";

loadLists();
addList();

loadTasks("Today");
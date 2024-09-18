import "./styles.css";
import { loadLists, addList, loadTasks, addTask, viewTask } from "./ScreenController.js";

loadLists();
addList();

loadTasks("Today");
addTask();
viewTask();
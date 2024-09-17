import "./styles.css";
import { loadLists, addList, loadTasks, addTask, expandTask } from "./ScreenController.js";

loadLists();
addList();

loadTasks("Today");
addTask();
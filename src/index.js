import "./styles.css";
import ScreenController from "./ScreenController.js";
import ListController from "./ListController.js";
import TaskController from "./TaskController.js";

ScreenController.loadLists();
ScreenController.addList();
ScreenController.viewList();

// load default "first list"
const lists = ListController.getLists();
ScreenController.loadTasks(lists[0]);

ScreenController.addTaskListener();
ScreenController.viewTaskListener(lists[0]);
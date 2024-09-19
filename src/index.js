import "./styles.css";
import ScreenController from "./ScreenController.js";
import EventController from "./EventController.js";
import ListController from "./ListController.js";
import TaskController from "./TaskController.js";

ScreenController.loadLists();

const defaultList = ListController.getLists()[0];

EventController.addList();
EventController.openList();

ScreenController.loadTasks(defaultList);

EventController.editOrDeleteList(defaultList);
EventController.addTask();
ScreenController.viewTask(defaultList);
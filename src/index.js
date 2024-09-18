import "./styles.css";
import ScreenController from "./ScreenController.js";

ScreenController.loadLists();
ScreenController.addList();
ScreenController.viewList();

ScreenController.loadTasks("Today");
ScreenController.addTaskListener();
ScreenController.viewTask();
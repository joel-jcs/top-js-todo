import './styles.css';
import ScreenController from './ScreenController.js';
import EventController from './EventController.js';
import ListController from './ListController.js';

const defaultList = ListController.getLists()[0];

ScreenController.loadLists();
ScreenController.loadTasks(defaultList);
EventController.loadEventListeners(defaultList);

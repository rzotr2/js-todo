import createListItem from "./createListItem.js";
import localStorageService from "./localStorageService.js";

const renderTodoItems = () => {
    localStorageService.getTodos().forEach((element) => {
        createListItem(element);
    });
};

export default {
    renderTodoItems,
}
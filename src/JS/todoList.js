import createListItem from "./createListItem.js";
import localStorageService from "./localStorageService.js";

const listNew = document.querySelector('#todoListNew');
const listCompleted = document.querySelector('#todoListCompleted')

const renderTodoItems = () => {
    localStorageService.getTodos().forEach((element) => {
        if (element.completed) {
            listCompleted.appendChild(createListItem(element));
        } else {
            listNew.appendChild(createListItem(element));
        }
    });
};

export default {
    renderTodoItems,
}
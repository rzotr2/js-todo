import localStorageService from "./localStorageService.js";
import initForm from "./initForm.js";
import createListItem from "./createListItem.js";
import todoList from "./todoList.js";


const init = () => {
    localStorageService.initLocalStorage();
    initForm();
    todoList.renderTodoItems();
}

init();

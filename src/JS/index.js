import initForm from "./initForm.js";
import todoList from "./todoList.js";
import * as restService from "./restService.js";

const init = () => {
    initForm();
    restService.getAllTodo().then((res) => todoList.renderTodoItems(res));
}

init();

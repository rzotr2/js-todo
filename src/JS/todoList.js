import createListItem from "./createListItem.js";

const renderTodoItems = (todos = []) => {
    todos.forEach((todo) => {
        createListItem(todo);
    });
};

export default {
    renderTodoItems,
}
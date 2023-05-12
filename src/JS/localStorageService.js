import utils from "./utils.js";

const getTodos = () => {
    return JSON.parse(localStorage.getItem('todos'));
};

const setTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

export const createTodo = (title) => {
    const todo = {
        completed: false,
        title,
        id: utils.createRandomId(),
    };
    const todos = getTodos();

    todos.push(todo);
    setTodos(todos);

    return todo;
};

const getTodo = (id) => {
    return getTodos().find(element => element.id === id);
};

const deleteTodo = (id) => {
    const todos = getTodos();
    const index = todos.findIndex(element => element.id === id);

    todos.splice(index, 1);
    setTodos(todos);
};

const updateTodo = (todo) => {
    const todos = getTodos();
    const index = todos.findIndex(element => element.id === todo.id);

    todos.splice(index, 1, todo);
    setTodos(todos);
};

const initLocalStorage = () => {
    if (!getTodos()) {
        setTodos([]);
    }
};

export default {
    getTodos,
    setTodos,
    getTodo,
    deleteTodo,
    updateTodo,
    createTodo,
    initLocalStorage,
}
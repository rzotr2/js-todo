import utils from './utils.js';

const todosUrl = 'https://645f83036bdcf7cba0da32bf.mockapi.io/js-todo';
const todosUrlId = (id) => `${todosUrl}/${id}`;

export const getAllTodo = () => {
    return utils.httpClient.get(todosUrl);
};

export const getOneTodo = (id) => {
    return utils.httpClient.get(todosUrlId(id));
};

export const createTodo = (todo) => {
    return utils.httpClient.post(todosUrl, todo);
};

export const removeTodo = (id) => {
    return utils.httpClient.delete(todosUrlId(id));
};

export const updateTodo = (todo) => {
    return utils.httpClient.update(todosUrlId(todo.id), todo);
};
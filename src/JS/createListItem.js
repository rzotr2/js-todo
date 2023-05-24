import * as restService from "./restService.js";
import * as loader from './loader.js';

const listNew = document.querySelector('#todoListNew');
const listCompleted = document.querySelector('#todoListCompleted');

const createListItem = (todo) => {
    const listItem = document.createElement('li');

    listItem.classList.add('todo-list__item');
    listItem.setAttribute('id', todo.id);
    listItem.innerHTML = `
        <div class="todo-list__item-container tooltip">
            <input type="checkbox" ${todo.completed ? 'checked' : ''} class="todo-list__item-checkbox js-todo-checkbox">
            <label for="input-checkbox" class="todo-list__text tooltip js-title" contenteditable="true">
                ${todo.title}
            </label>
            <span class="tooltipText">${todo.title}</span>
        </div>
        <div class="todo-list__button">
            <button class="todo-list__delete-button js-delete-button">
                <span class="todo-list__symbol-delete">&#x2716;</span>
            </button>
        </div>
    `;

    if (todo.completed) {
        listCompleted.appendChild(listItem);
    } else {
        listNew.appendChild(listItem);
    }

    addListeners(listItem, todo);
};

const updateTodoList = (todo, list, listItem) => {
    restService.updateTodo(todo)
        .then(() => {
            listItem.remove();
            list.appendChild(listItem);
            loader.removeLoader();
        });
}

const addListeners = (listItem, todo) => {
    const checkbox = listItem.querySelector('.js-todo-checkbox');
    const deleteButton = listItem.querySelector('.js-delete-button');
    const title = listItem.querySelector('.js-title');
    const tooltipText = listItem.querySelector('.tooltipText');

    checkbox.addEventListener('change', (event) => {
        loader.addLoader();
        todo.completed = event.target.checked;
        // if (todo.completed) {
        //     restService.updateTodo(todo).then(() => {
        //         listItem.remove();
        //         listCompleted.appendChild(listItem);
        //     });
        // } else {
        //     restService.updateTodo(todo).then(() => {
        //         listItem.remove();
        //         listNew.appendChild(listItem);
        //     });
        // }

        const currentList = todo.completed ? listCompleted : listNew;
        updateTodoList(todo, currentList, listItem);
    });

    deleteButton.addEventListener('click', () => {
        restService.removeTodo(todo.id).then(() => listItem.remove());
    });

    title.addEventListener('blur', (event) => {
        if (event.target.textContent.trim()) {
            todo.title = event.target.textContent;

            restService.updateTodo(todo).then(() => {
                tooltipText.textContent = todo.title;
            });
        } else {
            event.target.textContent = todo.title;
            tooltipText.textContent = todo.title;
        }
    });
};

export default createListItem;
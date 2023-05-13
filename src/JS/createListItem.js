import localStorageService from "./localStorageService.js";

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

const addListeners = (listItem, todo) => {
    const checkbox = listItem.querySelector('.js-todo-checkbox');
    const deleteButton = listItem.querySelector('.js-delete-button');
    const title = listItem.querySelector('.js-title');
    const tooltipText = listItem.querySelector('.tooltipText');

    checkbox.addEventListener('change', (event) => {
        todo.completed = event.target.checked;
        if (todo.completed) {
            listItem.remove();
            listCompleted.appendChild(listItem);
            localStorageService.updateTodo(todo);
        } else if (!todo.completed) {
            listItem.remove();
            listNew.appendChild(listItem);
            localStorageService.updateTodo(todo);
        }
    });

    deleteButton.addEventListener('click', () => {
        localStorageService.deleteTodo(todo.id);
        listItem.remove();
    });

    title.addEventListener('blur', (event) => {
        if (event.target.textContent.trim()) {
            todo.title = event.target.textContent;
            tooltipText.textContent = todo.title;
            localStorageService.updateTodo(todo);
        } else {
            const actualTitle = localStorageService.getTodo(todo.id).title;

            event.target.textContent = actualTitle;
            tooltipText.textContent = actualTitle;
        }
    });
};

export default createListItem;
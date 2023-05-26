import utils from "./utils.js";
import * as restService from "./restService.js";
import * as loader from './loader.js';

export const createDialog = (todo, title, tooltipText) => {
    const body = document.querySelector('body');
    const overlay = document.createElement('div');
    const dialog = document.createElement('div');

    overlay.classList.add('overlay');
    dialog.classList.add('dialog');

    dialog.innerHTML = `
        <div class="dialog-header">
            <span class="dialog-header__title">${todo.title}</span>
            <button class="dialog-header__close-btn js-close-btn">
                <i class="close-btn__icon bi bi-x-lg"></i>
            </button>
        </div>
        <form class="js-body-form">
            <div class="dialog-body">
                <div class="dialog-body__inner">
                    <div class="dialog-body__form-group">
                        <label for="title" class="dialog-body__form-label">Edit TODO title</label>
                        <input type="text" id="title" name="title" class="dialog-body__form-input" value="${todo.title}">
                    </div>
                    <div class="dialog-body__form-group">
                        <label for="description" class="dialog-body__form-label">Edit TODO description</label>
                        <textarea id="description" name="description" class="dialog-body__form-input dialog-body__form-textarea">${todo.description}</textarea>
                    </div>
                </div>
            </div>
            <div class="dialog-footer">
                <div class="dialog-footer__btn-group">
                    <button type="button" class="btn-group__discard-btn js-discard-btn">Discard</button>
                    <button type="submit" class="btn-group__apply-btn js-apply-btn">Apply</button>
                </div>
            </div>
        </form>
    `

    body.append(overlay);
    body.append(dialog);

    addListeners(overlay, dialog, todo, title, tooltipText);
}

const closeDialog = (overlay, dialog) => {
    overlay.remove();
    dialog.remove();
}

const addListeners = (overlay, dialog, todo, title, tooltipText) => {
    const closeButton = dialog.querySelector('.js-close-btn');
    const discardButton = dialog.querySelector('.js-discard-btn');
    const form = dialog.querySelector('.js-body-form');


    closeButton.addEventListener('click', () => {
        closeDialog(overlay, dialog);
    })

    discardButton.addEventListener('click', () => {
        closeDialog(overlay, dialog);
    })

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        loader.addLoader();

        const formData = utils.getFormData(form);
        restService.updateTodo({...todo, ...formData}).then((updatedTodo) => {
            console.log(todo, updatedTodo)
            title.textContent = updatedTodo.title;
            tooltipText.textContent = updatedTodo.description;
            tooltipText.description = updatedTodo.description;
            todo.title = updatedTodo.title;
            todo.description = updatedTodo.description;
            closeDialog(overlay, dialog);
            loader.removeLoader();
        })

    })
}
import utils from "./utils.js";
import {
    createTodo,
} from "./localStorageService.js";
import createListItem from "./createListItem.js";

const initForm = () => {
    const form = document.querySelector('#form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = utils.getFormData(form);

        if (formData.formInput) {
            const todoItem = createTodo(formData.formInput);

            createListItem(todoItem);
            form.reset();
        }
    });
};

export default initForm;

import utils from "./utils.js";
import createListItem from "./createListItem.js";
import * as restService from "./restService.js";
import * as todoModelsService from "./todoModelsService.js";

const initForm = () => {
    const form = document.querySelector('#form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = utils.getFormData(form);

        if (formData.formInput) {
            const todoModel = todoModelsService.createTodoModel(formData.formInput);
            restService.createTodo(todoModel).then((res) => createListItem(res));

            form.reset();
        }
    });
};

export default initForm;

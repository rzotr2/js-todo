const createRandomId = () => {
    return Math.random().toString(16).slice(2);
};

const getFormData = (form) => {
    const formData = new FormData(form);

    return Object.fromEntries(formData);
}

export default {
    createRandomId,
    getFormData,
};
const body = document.querySelector('body');

export const addLoader = () => {
    const loader = document.createElement('div');
    const loaderContainer = document.createElement('div');

    loader.classList.add('loader');
    loaderContainer.classList.add('loader-container');

    loaderContainer.append(loader);
    body.append(loaderContainer);
};

export const removeLoader = () => {
    const loaderContainer = document.querySelector('.loader-container');
    loaderContainer.remove();
}
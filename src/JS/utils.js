const createRandomId = () => {
    return Math.random().toString(16).slice(2);
};

const getFormData = (form) => {
    const formData = new FormData(form);

    return Object.fromEntries(formData);
};

const getRequestPayload = ({body, method, headers}) => {
    const payload = {
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    };

    if (body) {
        payload.body = JSON.stringify(body);
    }

    if (method) {
        payload.method = method;
    }

    if (headers) {
        payload.headers = {...payload.headers, ...headers};
    }

    return payload;
};

const httpClient = {
    get: (url) => {
        return fetch(url).then(data => data.json());
    },
    post: (url, body) => {
        const requestPayload = getRequestPayload({body, method: 'POST'});

        return fetch(url, requestPayload).then(data => data.json());
    },
    delete: (url) => {
        const requestPayload = getRequestPayload({method: 'DELETE'});

        return fetch(url, requestPayload).then(data => data.json());
    },
    update: (url, body) => {
        const requestPayload = getRequestPayload({body, method: 'PUT'});

        return fetch(url, requestPayload).then(data => data.json());
    },
};

export default {
    createRandomId,
    getFormData,
    httpClient,
};
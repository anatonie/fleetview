const base = 'https://api.fleetyards.net';

let models;
let manufacturers;
export const getModels = async () => {
    if (models) {
        return models;
    }
    const pageSize = 100;
    const getModelsPath = '/v1/models?perPage=' + pageSize;
    let resultCount = 0;
    let results = [];
    let page = 1;
    do {
        const response = await (await fetch(base + getModelsPath + '&page=' + page)).json();
        resultCount = response.length;
        results = [
            ...results,
            ...response
        ];
        page++;
    } while (resultCount === pageSize);
    models = results;
    return models;
};

export const getManufacturers = () => {
    if (manufacturers) {
        return manufacturers;
    }
    const res = [];
    models.forEach(({manufacturer}) => {
        if (res.indexOf(manufacturer.name) < 0) {
            res.push(manufacturer.name);
        }
    });
    manufacturers = res;
    return manufacturers;
};

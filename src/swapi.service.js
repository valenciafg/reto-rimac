const axios = require('axios');

const fieldsTranslation = require('./eng-esp');


class SWAPIService {
    constructor () {
        const baseURL = 'https://swapi.py4e.com/api';
        this.request = axios.create({ baseURL });
    }

    translateData (results) {
        const newResult = [];
        for (const data of results) {
            const element = {};
            Object.entries(data).forEach(([key, value]) => {
                const newKey = fieldsTranslation[key] || key;
                element[`${newKey}`] = value;
            });
            newResult.push(element);
        }
        return newResult;
    }

    async requestPlanets() {
        try {
            const { data: { results } } = await this.request.get('/planets');
            return this.translateData(results);
        } catch (error) {
            console.log(error.message);
            return [];
        }
    }
    async requestFilms () {
        try {
            const { data: { results } } = await this.request.get('/films');
            return this.translateData(results);
        } catch (error) {
            console.log(error.message)
            return [];
        }
    }
}

module.exports = SWAPIService;
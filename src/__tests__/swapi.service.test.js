jest.mock('axios');
const axios = require('axios');
const SWAPIService = require('../swapi.service');

describe('SWAPI tests', () => {
    const get = jest.fn();
    it('must get planet list', async () => {
        const planetDataFromRequest = {
            data: {
                results: [
                    {
                        name: 'planet1'
                    },
                    {
                        name: 'planet2'
                    }
                ]
            }
        }
        const planetas = [{ nombre: 'planet1' }, { nombre: 'planet2' }];        
        get.mockResolvedValueOnce(planetDataFromRequest);
        axios.create.mockReturnValue({
            get
        });
        const service = new SWAPIService();
        const result = await service.requestPlanets();
        expect(result).toStrictEqual(planetas);
    });
    it('must return empty planets list if error happen', async () => {
        get.mockRejectedValueOnce(new Error('is a error'));
        axios.create.mockReturnValue({
            get
        });
        const service = new SWAPIService();
        const result = await service.requestPlanets();
        expect(result).toHaveLength(0);
    });
    it('must get film list', async () => {
        const filmDataFromRequest = {
            data: {
                results: [
                    {
                        title: 'titulo1',
                        episode_id: 1
                    },
                    {
                        title: 'titulo2',
                        episode_id: 2
                    }
                ]
            }
        }
        const peliculas = [
            { titulo: 'titulo1', id_episodio: 1 },
            { titulo: 'titulo2', id_episodio: 2 }
        ];
        get.mockResolvedValueOnce(filmDataFromRequest)
        axios.create.mockReturnValue({
            get
        });
        const service = new SWAPIService();
        const result = await service.requestFilms();
        expect(result).toStrictEqual(peliculas);
    });
    it('must return empty films list if error happen', async () => {
        get.mockRejectedValueOnce(new Error('is a error'));
        axios.create.mockReturnValue({
            get
        });
        const service = new SWAPIService();
        const result = await service.requestFilms();
        expect(result).toHaveLength(0);
    });
});
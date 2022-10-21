jest.mock('aws-sdk')
const AWS = require('aws-sdk');
const manager = require('../dynamoManager');

describe('dynamoManager tests', () => {
    it('must register films', async () => {
        const peliculas = [{
            title: 'film1'
        }];
        const promise = jest.fn();
        promise.mockResolvedValueOnce(true);
        const put = jest.fn();
        put.mockReturnValue({promise});
        AWS.DynamoDB.DocumentClient.mockImplementation(() => ({
            put
        }));
        const result = await manager.registrarPeliculas(peliculas);
        expect(put).toBeCalledTimes(1);
        expect(result).toBeUndefined();
    });

    it('must register planets', async () => {
        const planetas = [{
            name: 'planet1'
        }];
        const promise = jest.fn();
        promise.mockResolvedValueOnce(true);
        const put = jest.fn();
        put.mockReturnValue({promise});
        AWS.DynamoDB.DocumentClient.mockImplementation(() => ({
            put
        }));
        const result = await manager.registrarPlanetas(planetas);
        expect(put).toBeCalledTimes(1);
        expect(result).toBeUndefined();
    });

    it('must get films', async () => {
        const peliculas = [
            { title: 'film1' },
            { title: 'film2' },
        ];
        const promise = jest.fn();
        promise.mockResolvedValueOnce({ Items: peliculas });
        const scan = jest.fn();
        scan.mockReturnValue({promise});
        AWS.DynamoDB.DocumentClient.mockImplementation(() => ({
            scan
        }));
        const { Items } = await manager.obtenerPeliculas();
        expect(scan).toBeCalledTimes(1);
        expect(Items).toHaveLength(2);
    });
    it('must get planets', async () => {
        const planetas = [
            { name: 'planet1' },
            { name: 'planet2' },
        ];
        const promise = jest.fn();
        promise.mockResolvedValueOnce({ Items: planetas });
        const scan = jest.fn();
        scan.mockReturnValue({promise});
        AWS.DynamoDB.DocumentClient.mockImplementation(() => ({
            scan
        }));
        const { Items } = await manager.obtenerPlanetas();
        expect(scan).toBeCalledTimes(1);
        expect(Items).toHaveLength(2);
    });
    it('must get one film', async () => {
        const pelicula = { title: 'film1' };
        const promise = jest.fn();
        promise.mockResolvedValueOnce({ Item: pelicula });
        const get = jest.fn();
        get.mockReturnValue({promise});
        AWS.DynamoDB.DocumentClient.mockImplementation(() => ({
            get
        }));
        const { Item } = await manager.obtenerPelicula('uuid');
        expect(get).toBeCalledTimes(1);
        expect(Item).toBeDefined();
        expect(typeof Item).toBe('object');
    });
    it('must get one planet', async () => {
        const planeta = { name: 'planet' };
        const promise = jest.fn();
        promise.mockResolvedValueOnce({ Item: planeta });
        const get = jest.fn();
        get.mockReturnValue({promise});
        AWS.DynamoDB.DocumentClient.mockImplementation(() => ({
            get
        }));
        const { Item } = await manager.obtenerPlaneta('uuid');
        expect(get).toBeCalledTimes(1);
        expect(Item).toBeDefined();
        expect(typeof Item).toBe('object');
    });
});
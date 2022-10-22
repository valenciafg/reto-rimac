'use strict';

const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const guardarPelicula = (data) => {
    const dynamo = new AWS.DynamoDB.DocumentClient();
    return dynamo.put({
        TableName: process.env.PELICULAS_TABLE,
        Item: data
    }).promise();
}

const registrarPeliculas = async (peliculas) => {
    const promises = [];
    for (const pelicula of peliculas) {
        promises.push(guardarPelicula({
            ...pelicula,
            id: uuidv4(),
        }));
    }
    await Promise.all(promises);
}

const obtenerPeliculas = () => {
    const dynamo = new AWS.DynamoDB.DocumentClient();
    return dynamo.scan({ TableName: process.env.PELICULAS_TABLE }).promise();
}
const obtenerPelicula = async (id) => {
    const dynamo = new AWS.DynamoDB.DocumentClient();
    return dynamo.get({
        TableName: process.env.PELICULAS_TABLE,
        Key: { id }
    }).promise();
}


const guardarPlaneta = (data) => {
    const dynamo = new AWS.DynamoDB.DocumentClient();
    return dynamo.put({
        TableName: process.env.PLANETAS_TABLE,
        Item: data
    }).promise();
}

const obtenerPlanetas = () => {
    const dynamo = new AWS.DynamoDB.DocumentClient();
    return dynamo.scan({ TableName: process.env.PLANETAS_TABLE }).promise();
}

const obtenerPlaneta = (id) => {
    const dynamo = new AWS.DynamoDB.DocumentClient();
    return dynamo.get({
        TableName: process.env.PLANETAS_TABLE,
        Key: { id }
    }).promise();
}


const registrarPlanetas = async (planetas) => {
    const promises = [];
    for (const planeta of planetas) {
        promises.push(guardarPlaneta({
            ...planeta,
            id: uuidv4(),
        }));
    }
    await Promise.all(promises);
}

module.exports = {
    guardarPelicula,
    guardarPlaneta,
    registrarPeliculas,
    registrarPlanetas,
    obtenerPelicula,
    obtenerPeliculas,
    obtenerPlaneta,
    obtenerPlanetas
}
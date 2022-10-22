'use strict';

const { v4: uuidv4 } = require('uuid');
const queryString = require('query-string');
// const middy = require("@middy/core");
// const httpJSONBodyParser = require("@middy/http-json-body-parser");

const { registrarPeliculas, registrarPlanetas, obtenerPeliculas, obtenerPlanetas, obtenerPlaneta, obtenerPelicula, guardarPlaneta, guardarPelicula } = require('./src/dynamoManager');
const SWAPIService = require("./src/swapi.service");

module.exports.loadData = async (event) => {
  try {
    const swapiService = new SWAPIService();
    const planetas = await swapiService.requestPlanets();
    const peliculas = await swapiService.requestFilms();
    await registrarPlanetas(planetas);
    await registrarPeliculas(peliculas);
    return {
      statusCode: 201,
      body: 'registros realizados'
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 422,
      body: error.message
    }
  }
};

module.exports.registrarPelicula = async (event) => {
  try {
    const body = queryString.parse(event.body);
    const data = {
      ...body,
      id: uuidv4(),
      creado: new Date(),
    }
    await guardarPelicula(data);
    return {
      statusCode: 201,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 422,
      body: error.message
    }
  }
}

module.exports.registrarPlaneta = async (event) => {
  try {
    const body = queryString.parse(event.body);
    const data = {
      ...body,
      id: uuidv4(),
      creado: new Date(),
    }
    await guardarPlaneta(data);
    return {
      statusCode: 201,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 422,
      body: error.message
    }
  }
}

module.exports.obtenerPeliculas = async (event) => {  
  try {
    const { Items } = await obtenerPeliculas();
    return {
      statusCode: 200,
      body: JSON.stringify(Items)
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 422,
      body: error.message
    };
  }
}

module.exports.obtenerPelicula = async (event) => {  
  try {
    const { id } = event.pathParameters;
    const { Item } = await obtenerPelicula(id);
    return {
      statusCode: 200,
      body: JSON.stringify(Item)
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 422,
      body: error.message
    };
  }
}

module.exports.obtenerPlanetas = async (event) => {
  try {
    const { Items } = await obtenerPlanetas();
    return {
      statusCode: 200,
      body: JSON.stringify(Items)
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 422,
      body: error.message
    };
  }
}

module.exports.obtenerPlaneta = async (event) => {  
  try {
    const { id } = event.pathParameters;
    const { Item } = await obtenerPlaneta(id);
    return {
      statusCode: 200,
      body: JSON.stringify(Item)
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 422,
      body: error.message
    };
  }
}

'use strict';

const { registrarPeliculas, registrarPlanetas, obtenerPeliculas, obtenerPlanetas, obtenerPlaneta, obtenerPelicula } = require('./src/dynamoManager');
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

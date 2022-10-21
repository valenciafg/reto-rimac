'use strict';

const SWAPIService = require("./src/swapi.service");

module.exports.loadData = async (event) => {
  const swapiService = new SWAPIService();
  const planetas = await swapiService.requestPlanets();
  const peliculas = await swapiService.requestFilms();
  return {
    statusCode: 200,
    body: JSON.stringify({ planetas, peliculas })
  };
};

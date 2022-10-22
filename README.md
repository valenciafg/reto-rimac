# RETO RIMAC - SWAPI

## Deploy en AWS
```
    npm run deploy
```
o
```
    serverless deploy
```

## Ejecucion de tests
```
    npm run test
```

## Postman collection
[postman](reto-rimac-lambda.postman_collection.json)

## Rutas disponibles
- POST /cargarDatosSWAPI - realiza la carga inicial de los datos de SWAPI (planets, films), de momento no esta validado que se caguen varias veces los mismos registros
- GET /obtenerPeliculas - obtiene todas las peliculas registradas
- GET /obtenerPelicula/{id} - Obtiene la pelicula solicitada por ID
- GET /obtenerPlanetas - Obtiene todos los plantas registrados
- GET /obtenerPlaneta/{id}  - Obtiene el planeta solicitado por ID
- POST /registrarPlaneta - Registro de planeta
- POST /registrarPelicula - Registro de pelicula
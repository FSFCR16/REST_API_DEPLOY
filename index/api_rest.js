import express, { json } from "express";
import { readJSON } from "../utils/utils.js";
import { createMovieRouter } from "../routes/movies-routes.js";

export const createApp = ({ movieModel }, message) => {
  const app = express();
  const movies = readJSON("../index/movies.json");
  const PORT = process.env.PORT ?? 4000;

  app.use(json());
  app.disable("x-powered-by");
  app.use("/movies", createMovieRouter({ movieModel }));

  app.listen(PORT, () => {
    console.log(
      `El servidor esta siendo escuchado en http://localhost:${PORT}, sever ${message}`
    );
  });
};

// Idempotencia: Propiedad de realizar una accion varias veces y aun asi conseguir el mismo resultado

// Post: crear un nuevo elemento/recurso en el servidor, post es idempotente no porque estas creando un nuevo recurso
// Put: Actualizar totalmente un elemento ya existento o crear si el elemento no existe, put si es idempotente
// Patch: Actualizar un elemento parcialmente

// Patron de diseño = Un patron repetible para solucionar una cosa en concreto
// Arquitectura = algo que ya en globa a toda la aplicacion, de como se arquitectura toda la app

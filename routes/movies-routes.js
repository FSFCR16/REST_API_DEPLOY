import { Router } from "express";
import { MovieControllers } from "../controllers/movie.js";

export const createMovieRouter = ({ movieModel }) => {
  const moviesRouter = Router();

  const movieController = new MovieControllers({ movieModel });

  moviesRouter.get("/", movieController.getGenre);
  moviesRouter.get("/pelicula/:id", movieController.getById);
  moviesRouter.post("/", movieController.craete);
  moviesRouter.patch("/:id", movieController.update);
  moviesRouter.delete("/:id", movieController.delete);
  moviesRouter.options("/:id", movieController.options);

  return moviesRouter;
};

// Las validacion del input del usuario seria bueno que sean procese por el controlador antes de mandarlas al modelo
// eso se refiere a que los datos sean validados y verificados antes de que sean procesados por el modelo
// ejemplos, que el campo requerido este, que la cadena tenga algun formato, correos electronicos, que el numero este dentro de un rango, etc..

//en el modelo serian validacion de tipo, el usario ya existe, el correo ya esta en uso, contraseña incorrecta, etc..
// Garantizar la coherencia e integridad de los datos es del modelo

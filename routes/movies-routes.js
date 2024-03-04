import { Router } from "express";
import { MovieControllers } from "../controllers/movie.js";

export const moviesRouter = Router();
moviesRouter.get("/", MovieControllers.getGenre);
moviesRouter.get("/pelicula/:id", MovieControllers.getById);
moviesRouter.post("/", MovieControllers.craete);
moviesRouter.patch("/:id", MovieControllers.update);
moviesRouter.delete("/:id", MovieControllers.delete);
moviesRouter.options("/:id", MovieControllers.options);

// Las validacion del input del usuario seri a buena que las procese el controlador antes de mandarla al modelo
// eso se refiere a que los datos sean validados y verificados antes de que sean procesados por el modelo
// ejemplos, que el campo requerido este, que la cadena tenga algun formato, correos electronicos, que el numero este dentro de un rango, etc..

//en el modelo serian validacion de tipo, el usario ya existe, el correo ya esta en uso, contraseña incorrecta, etc..
// Garantizar la coherencia e integridad de los datos es del modelo

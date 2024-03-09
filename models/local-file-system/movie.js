import { readJSON } from "../../utils/utils.js";
import { randomUUID } from "node:crypto";

const movies = readJSON("../index/movies.json");

export class MovieModel {
  static getGenre({ genre }) {
    if (genre) {
      const filterMovies = movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() == genre.toLowerCase())
      );
      return filterMovies;
    }

    return movies;
  }

  static async getById({ id }) {
    const movie = movies.find((movie) => movie.id === id);
    return movie;
  }

  static async create({ input }) {
    const newMovue = {
      id: randomUUID(),
      ...input,
    };

    movies.push(newMovue);

    return newMovue;
  }

  static async delete({ id }) {
    console.log(id);
    const movie = movies.findIndex((m) => m.id === id);
    if (movie === -1) return false;
    const movieBorrada = movies.splice(movie, 1);

    return true;
  }

  static async update({ id, input }) {
    const movieID = movies.findIndex((movie) => movie.id === id);

    if (movieID === -1) return false;

    const updateMovie = {
      ...movies[movieID],
      ...input,
    };

    movies[movieID] = updateMovie;

    return updateMovie;
  }
}

// Utilización de encabezados personalizados en la solicitud.
// Uso de métodos HTTP no simples, como PUT, DELETE, etc.
// Incluir ciertos tipos de contenido en la solicitud, como JSON, etc.
// Cuando se realiza una solicitud CORS que se considera "no simple", el navegador envía automáticamente una solicitud OPTIONS previa al mismo endpoint para verificar si el servidor acepta la solicitud real con los encabezados y el método especificados. Esta solicitud OPTIONS previa es el preflight.

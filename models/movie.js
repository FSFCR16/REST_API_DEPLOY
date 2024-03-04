import { readJSON } from "../utils/utils.js";
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
    const movie = movies.findIndex((m) => m.id === id);
    if (movieIndex === -1) return false;

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

  static async options({ path }) {
    if (accces.includes(path) || !path) {
      res.header("Access-Control-Allow-Origin", path);
      res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    }
  }
}

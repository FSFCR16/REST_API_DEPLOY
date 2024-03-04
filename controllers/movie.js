import { MovieModel } from "../models/movie.js";
import { validatedMovie, validatedPartialMovies } from "../schemas/schemas.js";

const accces = ["http://localhost:8080", "http://localhost:8081"];

export class MovieControllers {
  static async getGenre(req, res) {
    const origin = req.header("origin");
    if (accces.includes(origin) || !origin) {
      res.header("Access-Control-Allow-Origin", origin);
    }
    const { genre } = req.query;
    console.log(genre);
    const movies = await MovieModel.getGenre({ genre: genre });
    res.json(movies);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const findMovie = await MovieModel.getById({ id: id });
    if (findMovie) return res.json(findMovie);
    res.status(404).json({ message: "No se encontro la pelicula" });
  }

  static async craete(req, res) {
    const result = await validatedMovie(req.body);
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const newMovue = await MovieModel.create({ input: result.data });
    res.status(201).json({ message: newMovue });
  }

  static async update(req, res) {
    const result = await validatedPartialMovies(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;
    const updateMovie = await MovieModel.update({ id, input: result.data });

    return res.json(updateMovie);
  }

  static async delete(req, res) {
    const origin = req.header("origin");
    if (accces.includes(origin) || !origin) {
      res.header("Access-Control-Allow-Origin", origin);
    }
    const { id } = req.params;
    const movie = await MovieModel.delete(id);

    if (movie) {
      res.status(200).json({ message: "Moive delete" });
    }

    res.status(404).json({ message: "movie not found" });
  }

  static async options(req, res) {
    const origin = req.header("origin");
    MovieModel.options(origin);
    res.sendStatus(200);
  }
}

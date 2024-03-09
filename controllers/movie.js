// import { MovieModel } from "../models/local-file-system/movie.js";
// import { MovieModel } from "../models/mysql/mysql.js";
import { validatedMovie, validatedPartialMovies } from "../schemas/schemas.js";

const accces = ["http://localhost:8080", "http://localhost:8081"];

export class MovieControllers {
  constructor({ movieModel }) {
    this.movieModel = movieModel;
  }

  getGenre = async (req, res) => {
    const origin = req.header("origin");
    console.log(origin);
    if (accces.includes(origin) || !origin) {
      res.header("Access-Control-Allow-Origin", origin);
    }

    const { genre } = req.query;
    const movies = await this.movieModel.getGenre({ genre: genre });
    res.json(movies);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const findMovie = await this.movieModel.getById({ id: id });
    if (findMovie) return res.json(findMovie);
    res.status(404).json({ message: "No se encontro la pelicula" });
  };

  craete = async (req, res) => {
    const result = await validatedMovie(req.body);
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const newMovue = await this.movieModel.create({ input: result.data });
    res.status(201).json({ message: newMovue });
  };

  update = async (req, res) => {
    const result = await validatedPartialMovies(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;
    const updateMovie = await this.movieModel.update({
      id,
      input: result.data,
    });

    return res.json(updateMovie);
  };

  delete = async (req, res) => {
    const origin = req.header("origin");
    if (accces.includes(origin) || !origin) {
      res.header("Access-Control-Allow-Origin", origin);
    }
    const { id } = req.params;
    const movie = await this.movieModel.delete({ id: id });

    if (movie) {
      return res.status(200).json({ message: "Moive delete" });
    }

    res.status(404).json({ message: "movie not found" });
  };

  options = async (req, res) => {
    const origin = req.header("origin");
    if (accces.includes(origin) || !origin) {
      res.header("Access-Control-Allow-Origin", origin);
      res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    }
    res.sendStatus(200);
  };
}

// const movieController = new MovieControllers({ movieModel })

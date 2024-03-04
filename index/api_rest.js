const express = require("express");
const movies = require("./movies.json");
const crypto = require("node:crypto");
const {
  validatedMovie,
  validatedPartialMovies,
} = require("../schemas/schemas.js");

const app = express();
const PORT = process.env.PORT ?? 4000;
const accces = ["http://localhost:8080", "http://localhost:8081"];

app.use(express.json());
app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.json({ message: "Hola mundo" });
});

app.get("/movies", (req, res) => {
  const origin = req.header("origin");
  if (accces.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  const { genre } = req.query;
  if (genre) {
    const filterMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() == genre.toLowerCase())
    );
    return res.json(filterMovies);
  }

  res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);
  if (movie) return res.json(movie);

  res.status(404).json({ message: "No se encontro la pelicula" });
});

app.post("/movies", async (req, res) => {
  const result = await validatedMovie(req.body);
  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const newMovue = {
    id: crypto.randomUUID(),
    ...result.data,
  };

  movies.push(newMovue);
  res.status(201).json({ message: newMovue });
});

app.patch("/movies/:id", async (req, res) => {
  const result = await validatedPartialMovies(req.body);

  console.log(result);

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const { id } = req.params;
  const movieID = movies.findIndex((movie) => movie.id === id);

  if (movieID === -1) {
    return res.status(404).json({ message: "Movie no encontrada" });
  }

  const updateMovie = {
    ...movies[movieID],
    ...result.data,
  };

  movies[movieID] = updateMovie;

  return res.json(updateMovie);
});

app.delete("/movies/:id", (req, res) => {
  const origin = req.header("origin");
  if (accces.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  const { id } = req.params;
  console.log(id);
  const movie = movies.findIndex((m) => m.id === id);

  if (movie) {
    movies.splice(movie, 1);
    res.status(200).json({ message: "Moive delete" });
  }

  res.status(404).json({ message: "movie not found" });
});

app.options("/movies/:id", (req, res) => {
  const origin = req.header("origin");

  if (accces.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  }
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`El servidor esta siendo escuchado en http://localhost:${PORT}`);
});

// Idempotencia: Propiedad de realizar una accion varias veces y aun asi conseguir el mismo resultado

// Post: crear un nuevo elemento/recurso en el servidor, post es idempotente no porque estas creando un nuevo recurso
// Put: Actualizar totalmente un elemento ya existento o crear si el elemento no existe, put si es idempotente
/// Patch: Actualizar un elemento parcialmente,

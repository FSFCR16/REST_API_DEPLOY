import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  port: 3306,
  password: "fsfcr1214*13",
  database: "moviesdb",
};

const connection = await mysql.createConnection(config);

export class MovieModel {
  static async getGenre({ genre }) {
    if (genre) {
      const lowerGenre = genre.toLowerCase();

      const [genres] = await connection.query(
        "SELECT id, name FROM genre WHERE LOWER(name) = ?;",
        [lowerGenre]
      );

      if (genres.length === 0) return [];

      const [{ id }] = genres;

      const movies = connection.query(
        "SELECT title, year, director, duration, duration, poster, rate,  BIN_TO_UUID(id) id FROM movies;"
      );
    }
    const [movies] = await connection.query(
      "SELECT title, year, director, duration, duration, poster, rate,  BIN_TO_UUID(id) id FROM movies;"
    );
    return movies;
  }

  static async getById({ id }) {
    const [movies] = await connection.query(
      `SELECT title, year, director, duration, duration, poster, rate,  BIN_TO_UUID(id) id 
      FROM movies WHERE id = UUID_TO_BIN(?);`,
      [id]
    );

    if (movies.length === 0) return null;

    return movies[0];
  }

  static async create({ input }) {
    const {
      genre: genreInput,
      title,
      year,
      duration,
      director,
      rate,
      poster,
    } = input;

    const resultId = await connection.query("SELECT UUID() uuid;");
    const [{ uuid }] = resultId[0];
    console.log(uuid);

    try {
      await connection.query(
        `INSERT INTO movies (id, title, year, director, duration, poster, rate) 
        VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
        [title, year, director, duration, poster, rate]
      );
    } catch (e) {
      throw new Error("ERROR EN LA PELICULA");
    }

    const [movies] = await connection.query(
      `
    SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
    FROM movies WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    );

    return movies;
  }

  static async delete({ id }) {}

  static async update({ id, input }) {}
}

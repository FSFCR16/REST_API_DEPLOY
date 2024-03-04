import z from "zod";

const movieShcema = z.object({
  title: z.string({
    invalid_type_error: "El nombre de la pelicula debe ser un texto",
    required_error: "El titulo de la pelicula debe ser requerido",
  }),
  year: z.number().int().min(1900).max(2025),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10),
  poster: z.string().url({
    message: "Esto debe ser una url",
  }),
  genre: z.array(
    z.enum([
      "Action",
      "Adventure",
      "Comedy",
      "Drama",
      "Fantasy",
      "Horror",
      "Thriller",
      "Sci-Fi",
    ])
  ),
});

export function validatedMovie(object) {
  return movieShcema.safeParseAsync(object);
}

export function validatedPartialMovies(object) {
  return movieShcema.partial().safeParseAsync(object); // El metodo partial movie lo que hace es que todos las propiedades sean opcionales
}

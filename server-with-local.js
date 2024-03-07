import { createApp } from "./index/api_rest.js";
import { MovieModel } from "./models/local-file-system/movie.js";
createApp({ movieModel: MovieModel }, "LOCAL");

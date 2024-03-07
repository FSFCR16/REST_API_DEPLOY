import { createApp } from "./index/api_rest.js";
import { MovieModel } from "./models/mysql/mysql.js";
createApp({ movieModel: MovieModel }, "MySQL");

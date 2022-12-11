require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

const { validateMovie } = require("./validators.js");
const { hashPassword } = require("./auth.js");

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");
const { validateJoiMovie } = require("./validatorsJoij.js");
const { validateJoiUser } = require("./validatorsJoij.js");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getOneUser);
app.post("/api/movies", validateJoiMovie, movieHandlers.postMovie);
app.post("/api/users", validateJoiUser, hashPassword, userHandlers.postUser);

// app.put("/api/movies/:id", validateJoiMovie, movieHandlers.putMovie);

//Méthode PUT (movies)
app.put("/api/movies/:id", movieHandlers.putMovie);
app.put("/api/users/:id", validateJoiUser, hashPassword, userHandlers.putUser);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.delete("/api/users/:id", userHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

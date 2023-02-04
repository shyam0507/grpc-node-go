const express = require("express");
const getReviews = require("./grpc");

const getMovie = require("./utils");
app = express();

const PORT = 3000;

app.get("/health", async (req, res) => {
  console.log("Health API was called");
  res.send({ message: "service is up" });
});

app.get("/movies/:id/reviews", async (req, res) => {
  try {
    const movieId = req.params.id;
    console.log("Movie ratings API was called", movieId);

    const movie = await getMovie(movieId);
    const ratings = await getReviews(movieId);
    res.send({ ...movie, ratings: [...ratings] });
  } catch (error) {
    res.status(400).send({ message: "error" });
  }
});

app.listen(PORT, () => {
  console.log("movie service running on port", PORT);
});

import React, { useState } from "react";
import axios from "axios";
import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  //const [flag, setFlag] = useState(false);
  function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);
    // console.log("Hi, im working");

    axios
      .get("https://add-n-fetch-movies-default-rtdb.firebaseio.com/movies.json")
      .then((response) => {
        //console.log(response.data);
        const loadedMovies = [];
        for (const key in response.data) {
          loadedMovies.push({
            id: key,
            title: response.data[key].title,
            openingText: response.data[key].openingText,
            releaseDate: response.data[key].releaseDate,
          });
        }

        setMovies(loadedMovies);
      });

    // const data = await response.json();
    //console.log(data);

    setIsLoading(false);
  }

  // useEffect(() => {
  //   fetchMoviesHandler();
  // }, [fetchMoviesHandler, flag]);

  function addMovieHandler(movie) {
    //console.log(movie);
    axios.post(
      "https://add-n-fetch-movies-default-rtdb.firebaseio.com/movies.json",
      movie
    );

    //setFlag(!flag);
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading, please wait!!!!</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie addMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;

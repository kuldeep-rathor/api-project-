import React, { useState , useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [retrying, setRetrying] = useState(false);
  // const [retryInterval, setRetryInterval] = useState(null);



const  fetchMoviesHandler = useCallback(async()=> {
    setIsLoading(true);
    setError(null);
    // setRetrying(false);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong .... Retrying ");
      }
      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
     
    } catch (error) {
      setError(error.message);
      
      
      // setRetryInterval(
      //   setInterval(() => {
      //     fetchMoviesHandler();
      //   }, 5000)
      // );
      // setRetrying(true);
    }
    setIsLoading(false);
  } ,[]); 
  // function cancelRetryHandler() {
  //   if (retryInterval) {
  //     clearInterval(retryInterval);
  //     setRetrying(false);
  //   }
  // }

  // useEffect(() => {
  //   return () => {
  //     cancelRetryHandler();
  //   };
  // }, []);
  useEffect (()=>{
    fetchMoviesHandler ();
  },[fetchMoviesHandler]);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        {/* {retrying && ( */}
          {/* // <button onClick={cancelRetryHandler}>Cancel Retrying</button> */}
        {/* )} */}
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found no movies </p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading ...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;

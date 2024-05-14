import React, { useState, useEffect, useRef, useCallback } from "react";
import { fetchGenres, fetchMovies } from "../data/tmdbAPI";
import { useMediaQuery } from "react-responsive";

import Modal from "./Modal";

export default function MovieCard({ movie, isFeatured }) {
  const isPortrait = useMediaQuery({
    query: "(orientation: portrait) and (max-width:799px)",
  });

  /**
   * Fetch video data from TMDB and render it only when the details box is opened.
   */
  const [movieTrailer, setMovieTrailer] = useState();
  const [trailerTitle, setTrailerTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [genreNames, setGenreNames] = useState([]);

  const fetchMoviesData = useCallback(async () => {
    try {
      const movieTrailerData = await fetchMovies(
        `/movie/${movie.id}/videos?language=en-US`
      );
      const randomTrailer =
        movieTrailerData[Math.floor(Math.random() * movieTrailerData.length)];
      const trailerKey = randomTrailer.key;
      setMovieTrailer(trailerKey);
      setTrailerTitle(randomTrailer.name);
      const genresData = await fetchGenres();
      setGenreNames(genresData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [movie.id]);

  const genresList = [];
  const movieGenresIDs = movie.genre_ids;
  genreNames.map(
    (genre) => movieGenresIDs.includes(genre.id) && genresList.push(genre.name)
  );
  genresList.join(", ");

  useEffect(() => {
    if (isOpen && !movieTrailer) {
      fetchMoviesData();
    }
  }, [isOpen, fetchMoviesData, movieTrailer]);

  const backdropURL = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  const imgURL = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
  const trailerSrc = movieTrailer
    ? `https://www.youtube.com/embed/${movieTrailer}`
    : null;

  /**
   * Handle the info box open attribute and toggle its icon
   */
  const [icon, setIcon] = useState(
    <i className="bi bi-info-circle">
      <span className="screen-reader-text">About this movie</span>
    </i>
  );
  useEffect(() => {
    // Update icon based on isOpen state
    if (isOpen) {
      setIcon(
        <i className="bi bi-x-circle">
          <span className="screen-reader-text">Close info</span>
        </i>
      );
    } else {
      setIcon(
        <i className="bi bi-info-circle">
          <span className="screen-reader-text">About this movie</span>
        </i>
      );
    }
  }, [isOpen]);

  const firstRender = useRef(true); // Ref to track first render
  const handleClick = () => {
    // If it's the first render, open the details element
    if (firstRender.current) {
      // Toggle isOpen state after a short delay
      setTimeout(() => {
        setIsOpen(true);
        firstRender.current = false;
      }, 50); // Adjust the delay time as needed
    } else {
      // Toggle isOpen state after a short delay
      setTimeout(() => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
      }, 1); // Adjust the delay time as needed
    }
  };

  return (
    <div className={isFeatured ? "featured card" : "card"}>
      <div className="img-box">
        <img
          src={isFeatured && !isPortrait ? backdropURL : imgURL}
          alt={movie.title ? movie.title : movie.name}
        />
      </div>
      <div className="text-box">
        <details open={isOpen}>
          {isFeatured ? (
            <>
              <summary onClick={handleClick}>
                <h3>
                  <span className="uppercase" style={{ fontWeight: "400" }}>
                    Lastest:
                  </span>{" "}
                  {movie.title ? movie.title : movie.name}
                </h3>
                {icon}
              </summary>
              <ul className="movie-meta">
                <li>{movie.release_date ? movie.release_date : movie.first_air_date}</li>
                <li>{genresList.join(", ")}</li>
              </ul>
              <p>{movie.overview}</p>
              {movie.title && trailerSrc && (
                <Modal trailerSrc={trailerSrc} trailerTitle={trailerTitle} />
              )}
            </>
          ) : (
            <>
              <summary onClick={handleClick}>{icon}</summary>
              <div>
                <h3>{movie.title ? movie.title : movie.name}</h3>
                <p>{movie.overview}</p>
                {(movie.release_date || genresList.length > 0 || movie.first_air_date) && (
                  <ul className="movie-meta">
                    {(movie.release_date || movie.first_air_date) && (
                        <li>{movie.release_date ? movie.release_date : movie.first_air_date}</li>
                      )}
                    {genresList && <li>{genresList.join(", ")}</li>}
                  </ul>
                )}

                {movie.title && trailerSrc && (
                  <Modal trailerSrc={trailerSrc} trailerTitle={trailerTitle} />
                )}
              </div>
            </>
          )}
        </details>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Featured from "./components/Featured";
import Section from "./components/Section";

import { fetchMovies } from "./data/tmdbAPI";

function App() {
  /**
   * Set Movies or Shows on display
   */
  const [onDisplay, setOnDisplay] = useState("home");
  function setDisplay(key) {
    setOnDisplay(key);
  }
  useEffect(() => {
    fetchMoviesData(onDisplay);
  }, [onDisplay]);

  /**
   * Save header's height on a css variable
   */
  const header = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      if (header.current) {
        setHeaderHeight(header.current.offsetHeight);
      }
    }, 1);
  }, []);
  const headerHeightVar = { "--header-height": headerHeight + "px" };

  /**
   * Fetch content from TMDB
   */
  const [moviesWatchPage1, setMoviesWatchPage1] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [tvFavorites, setTvFavorites] = useState([]);
  const [pieceOfShit, setPieceOfShit] = useState([]);
  const [latest, setLatest] = useState([]);
  const fetchMoviesData = async (displayKey) => {
    try {
      const tvFavoritesData = await fetchMovies(
        "/account/21254396/favorite/tv?language=en-US&page=1&sort_by=created_at.desc"
      );
      switch (displayKey) {
        case "tv":
          const tvWatchPage1Data = await fetchMovies(
            "/account/21254396/watchlist/tv?language=en-US&page=1&sort_by=created_at.desc"
          );
          setMoviesWatchPage1(tvWatchPage1Data);
          setLatest(tvWatchPage1Data[0]);
          setFavorites(tvFavoritesData);
          const tvShitData = await fetchMovies(
            "/account/21254396/rated/tv?language=en-US&page=1&sort_by=created_at.desc"
          );
          setPieceOfShit(tvShitData);
          break;
        case "home":
        case "movies":
          const moviesWatchPage1Data = await fetchMovies(
            "/account/21254396/watchlist/movies?language=en-US&page=1&sort_by=created_at.desc"
          );
          setMoviesWatchPage1(moviesWatchPage1Data);
          setLatest(moviesWatchPage1Data[0]);

          const movieFavoritesData = await fetchMovies(
            "/account/21254396/favorite/movies?language=en-US&page=1&sort_by=created_at.desc"
          );
          setFavorites(movieFavoritesData);
          setTvFavorites(tvFavoritesData);

          const shitesData = await fetchMovies(
            "/account/21254396/rated/movies?language=en-US&page=1&sort_by=created_at.desc"
          );
          setPieceOfShit(shitesData);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const mainClass = `App ${onDisplay === "home" ? "home" : ""}`;
  return (
    <>
      <Header handleClick={setDisplay} ref={header} />
      <main className={mainClass} id="main" style={headerHeightVar}>
        <Featured isFeatured={true} query={latest} />
        {onDisplay !== "home" && (
          <>
            <Section query={favorites} sectionTitle={"Joana's Favs"} />
            <Section
              isCrap={true}
              query={pieceOfShit}
              sectionTitle={"Not worth it"}
              sectionDescription={"Honestly, these are all pieces of shit."}
            />
            <Section
              query={moviesWatchPage1}
              sectionTitle={"Joana's watchlist"}
            />
          </>
        )}
        {onDisplay === "home" && (
          <>
            <Section query={favorites} sectionTitle={"Joana's Fav Movies"} />
            <Section query={tvFavorites} sectionTitle={"Joana's Fav shows"} />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;

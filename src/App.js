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
  }, [header.current]);
  const headerHeightVar = { "--header-height": headerHeight + "px" };

  /**
   * Fetch content from TMDB
   */
  const [moviesWatchPage1, setMoviesWatchPage1] = useState([]);
  const [moviesWatchPage2, setMoviesWatchPage2] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [pieceOfShit, setPieceOfShit] = useState([]);
  const [latest, setLatest] = useState([]);
  const fetchMoviesData = async (displayKey) => {
    try {
      switch (displayKey) {
        case "home":
        case "movies":
          const moviesWatchPage1Data = await fetchMovies(
            "/account/21254396/watchlist/movies?language=en-US&page=1&sort_by=created_at.desc"
          );
          setMoviesWatchPage1(moviesWatchPage1Data);
          setLatest(moviesWatchPage1Data[0]);

          const moviesWatchPage2Data = await fetchMovies(
            "/account/21254396/watchlist/movies?language=en-US&page=2&sort_by=created_at.desc"
          );
          setMoviesWatchPage2(moviesWatchPage2Data);

          const movieFavoritesData = await fetchMovies(
            "/account/21254396/favorite/movies?language=en-US&page=1&sort_by=created_at.desc"
          );
          setFavorites(movieFavoritesData);

          const shitesData = await fetchMovies(
            "/account/21254396/rated/movies?language=en-US&page=1&sort_by=created_at.desc"
          );
          setPieceOfShit(shitesData);
          break;
        case "tv":
          const tvWatchPage1Data = await fetchMovies(
            "/account/21254396/watchlist/tv?language=en-US&page=1&sort_by=created_at.desc"
          );
          setMoviesWatchPage1(tvWatchPage1Data);
          setLatest(tvWatchPage1Data[0]);

          const tvFavoritesData = await fetchMovies(
            "/account/21254396/favorite/tv?language=en-US&page=1&sort_by=created_at.desc"
          );
          setFavorites(tvFavoritesData);
          const tvShitData = await fetchMovies(
            "/account/21254396/rated/tv?language=en-US&page=1&sort_by=created_at.desc"
          );
          setPieceOfShit(tvShitData);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Header handleClick={setDisplay} ref={header} />
      <main className="App" id="main" style={headerHeightVar}>
        <Featured isFeatured={true} query={latest} />
        <Section
          query={favorites}
          sectionTitle={"Joana's Favs"}
          sectionDescription={""}
        />
        <Section
          isCrap={true}
          query={pieceOfShit}
          sectionTitle={"Not worth it"}
          sectionDescription={"Honestly, these are all pieces of shit."}
        />
        <Section
          query={moviesWatchPage1}
          sectionTitle={"Joana's watchlist"}
          sectionDescription={""}
        />
        <section>
          <div>
            <h2>Rayflix development</h2>
            <p>
              Not exactly proud to say that I turned to ChatGPT for help on this
              project. It helped me start fetching data, to help me organise the
              App file and put the api fetch on it's own file and to be able to
              fetch the content dynamically (based on what one clicks from the
              menu and yes, switch was used).
            </p>
            <p className="small uppercase">
              Please bear with me, I'm still new at this.
            </p>
            <h3>Somethings I wish I could do here:</h3>
            <ul>
              <li> to order the movies by their release date.</li>
              <li>to filter this content by movie and tv genres.</li>
              <li>to display the movies on a user created list.</li>
            </ul>
          </div>
          <div>
            <details>
              <summary>
                <h3>Typographic sheet</h3>
              </summary>

              <h1>h1 title</h1>
              <h2>h2 title</h2>
              <h3>h3 title</h3>
              <h4>h4 title</h4>
              <h5>h5 title</h5>
              <h6>h6 title</h6>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                tincidunt augue ut urna blandit vehicula. Nam quis augue gravida
                sem feugiat porttitor in non est. Aenean vitae eros mauris.
                Etiam aliquam leo sit amet tincidunt imperdiet. Quisque sodales,
                mauris id vulputate commodo, ex dui euismod tellus, sed tempus
                metus odio congue leo. Nullam est mi, aliquet ut dui at,
                facilisis viverra nisi. Proin mollis eu nisi venenatis blandit.
              </p>
              <h2>h2 title</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                tincidunt augue ut urna blandit vehicula. Nam quis augue gravida
                sem feugiat porttitor in non est. Aenean vitae eros mauris.
              </p>
              <h3>h3 title</h3>
              <p>
                Etiam aliquam leo sit amet tincidunt imperdiet. Quisque sodales,
                mauris id vulputate commodo, ex dui euismod tellus, sed tempus
                metus odio congue leo. Nullam est mi, aliquet ut dui at,
                facilisis viverra nisi. Proin mollis eu nisi venenatis blandit.
              </p>
              <h4>h4 title</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                tincidunt augue ut urna blandit vehicula. Nam quis augue gravida
                sem feugiat porttitor in non est. Aenean vitae eros mauris.
                Etiam aliquam leo sit amet tincidunt imperdiet.
              </p>
              <h5>h5 title</h5>
              <p>
                Aenean vitae eros mauris. Etiam aliquam leo sit amet tincidunt
                imperdiet. Quisque sodales, mauris id vulputate commodo, ex dui
                euismod tellus, sed tempus metus odio congue leo. Nullam est mi,
                aliquet ut dui at, facilisis viverra nisi. Proin mollis eu nisi
                venenatis blandit.
              </p>
              <h6>h6 title</h6>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                tincidunt augue ut urna blandit vehicula. Nam quis augue gravida
                sem feugiat porttitor in non est. Aenean vitae eros mauris.
                Etiam aliquam leo sit amet tincidunt imperdiet. Quisque sodales,
                mauris id vulputate commodo, ex dui euismod tellus, sed tempus
                metus odio congue leo. Nullam est mi, aliquet ut dui at,
                facilisis viverra nisi. Proin mollis eu nisi venenatis blandit.
              </p>
              <p className="small">
                <strong>p.small</strong>
                <br />
                Nunc vel viverra enim, auctor vestibulum leo. Etiam vitae
                fringilla turpis. In sollicitudin mollis quam, eu molestie erat
                euismod eget. Phasellus gravida volutpat congue.
              </p>
              <p className="xsmall">
                <strong>p.xsmall</strong>
                <br />
                Aliquam venenatis dui sit amet enim dictum, vel facilisis lorem
                suscipit. Class aptent taciti sociosqu ad litora torquent per
                conubia nostra, per inceptos himenaeos.
              </p>
              <p className="uppercase">Uppercase text right here</p>
              <p>
                <strong>Strong text right here</strong>
              </p>
            </details>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;

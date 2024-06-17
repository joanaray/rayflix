import fetch from "node-fetch";

export const fetchMovies = async (url) => {
  try {
    const completeURL = `https://api.themoviedb.org/3${url}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer [insert your TMDB API key]",
      },
    };
    const response = await fetch(completeURL, options);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchGenres = async () => {
  try {
    const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer [insert your TMDB API key]",
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
};

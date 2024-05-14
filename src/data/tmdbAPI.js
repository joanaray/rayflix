import fetch from "node-fetch";

export const fetchMovies = async (url) => {
  try {
    const completeURL = `https://api.themoviedb.org/3${url}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDBlZmZlNTQ1NzdkNTA2MTkyM2RmOTJhNDFiNWU2YyIsInN1YiI6IjY2MzhhM2VlMmZhZjRkMDEzMGM2NGY1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.votEoEOc81zFGnwygQwm6-oWbagkmCK-8EvESmBS6pg",
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
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDBlZmZlNTQ1NzdkNTA2MTkyM2RmOTJhNDFiNWU2YyIsInN1YiI6IjY2MzhhM2VlMmZhZjRkMDEzMGM2NGY1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.votEoEOc81zFGnwygQwm6-oWbagkmCK-8EvESmBS6pg",
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

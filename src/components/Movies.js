import React from "react";
import MovieCard from "./MovieCard";

function Movies({ query, isFeatured, isCrap }) {
  if (isFeatured) {
    return (
      <div className="featured">
        <MovieCard isFeatured={isFeatured} movie={query} />
      </div>
    );
  } else if (isCrap) {
    return (
      <div className="movies-grid">
        {query.map((movie) => (
          movie.rating === 1 && <MovieCard key={movie.id} isFeatured={isFeatured} movie={movie} />
        ))}
      </div>
    );
  }
  else {
    return (
      <div className="movies-grid">
        {query.map((movie) => (
          <MovieCard key={movie.id} isFeatured={isFeatured} movie={movie} />
        ))}
      </div>
    );
  }
}
export default Movies;

import React from "react";
import MovieCard from "./MovieCard";

function Featured({ query, isFeatured }) {
  return (
    <section className="featured-section">
      <h2 className="screen-reader-text">Latest watched</h2>
      <MovieCard isFeatured={isFeatured} movie={query} />
    </section>
  );
}
export default Featured;

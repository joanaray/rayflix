import { useEffect, useState } from "react";
import Movies from "./Movies";

export default function Section({
  isFeatured,
  isCrap,
  query,
  sectionTitle,
  sectionDescription,
}) {
  const crapMovies = [];

  if (isCrap) {
    query.map((movie) => {
      if (movie.rating === 1) {
        crapMovies.push(movie);
      }
    });
  }
  if ((query.length > 0 && !isCrap) || (isCrap && crapMovies.length > 0) ) {
    return (
      <section>
        <hgroup>
          <h2>{sectionTitle}</h2>
          {sectionDescription && <p>{sectionDescription}</p>}
        </hgroup>
        <Movies query={query} isFeatured={isFeatured} isCrap={isCrap} />
      </section>
    );
  }
}

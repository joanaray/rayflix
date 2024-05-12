export default function Footer() {
  return (
    <footer>
      <div className="logo-block"><img src="assets/img/ico-rayflix.png" alt="R" width="50"/></div>
      <div className="footer-blocks">
        <div>
          <h2>About</h2>
          <p>
            A bunch of movies Joana watched (as far as she remembers).<br/>
            She liked most of them.<br/>
            She fell asleep to too many of them for sure.
          </p>
        </div>
        <div className="meta-list small uppercase">
          <ul>
            <li><a href="https://github.com/joanaray/rayflix">GitHub Repo</a></li>
            <li><a href="https://www.joana.cc">Joana Ray</a></li>
            <li> &copy; 2024</li>
          </ul>
        </div>
        <div className="small">
          <p>This is a react app and all movie content was sourced from <a className="tmdb-link" href="https://www.themoviedb.org/">The Movie Database (TMDB) <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" width="70" alt="themoviedb.org"/></a></p></div>
      </div>
    </footer>
  );
}

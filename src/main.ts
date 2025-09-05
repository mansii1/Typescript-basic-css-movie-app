import "./style.css";

const API_URl =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7adef57fde9963cfa45b6a65b592b220&page=1";

const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";

const SEARCH_URL =
  "https://api.themoviedb.org/3/search/movie?api_key=7adef57fde9963cfa45b6a65b592b220&query=";

const form = document.getElementById("form") as HTMLFormElement;
const main = document.getElementById("main") as HTMLDivElement;

const search = document.getElementById("search") as HTMLInputElement;
getMovie(API_URl);
async function getMovie(url: string) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data?.results);
}

interface Movie {
  title: string;
  poster_path: string | null;
  vote_average: number;
  overview: string;
}

function showMovies(movies: Movie[]) {
  main.innerHTML = "";
  movies.forEach((movie: Movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
        <img
          src="${IMG_PATH + poster_path}"
          alt=${title}
        />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class=${getClassByRate(vote_average)}>${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>

          ${overview}
        </div>
`;

    main.appendChild(movieEl);
  });
}

function getClassByRate(vote: number) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchItem = search.value;

  if (searchItem && searchItem !== "") {
    getMovie(SEARCH_URL + searchItem);

    search.value = "";
  } else {
    window.location.reload();
  }
});

const API_KEY = 'baf982ef-bbcc-4bc8-bb40-1574f8235ef2';
const API_URL_POPULAR =
  'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';

getMovies(API_URL_POPULAR);

async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      'Content-type': 'application/json',
      'X-API-KEY': API_KEY,
    },
  });
  const respData = await resp.json();
  showMovies(respData);
}

function getClassByRate(vote) {
  if (vote >= 7) {
    return 'green';
  } else if (vote > 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

function showMovies(data) {
  const moviesEl = document.querySelector('.movies');

  data.films.forEach((movie) => {
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `<div class="movie">
<div class="movie__cover-inner">
	<img class="movie__cover" src="${movie.posterUrlPreview}" alt="${movie.nameRu}">
</div>
<div class="movie__info">
	<div class="movie__title">${movie.nameRu}</div>
	<div class="movie__category">${movie.genres.map(
    (genre) => ` ${genre.genre}`
  )}</div>
	<div class="movie__average movie__average-${getClassByRate(movie.rating)}">${
      movie.rating
    }</div>
</div>
</div>
`;
    moviesEl.appendChild(movieEl);
  });
}

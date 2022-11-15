const API_KEY = 'baf982ef-bbcc-4bc8-bb40-1574f8235ef2';
const API_URL_POPULAR =
  'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';
const API_URL_SEARCH =
  'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';

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


//получение фильма
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

  //очищаю предыдущие фильмы
  document.querySelector('.movies').innerHTML = '';

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

const form = document.querySelector('form');
const search = document.querySelector('.header__search');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);
    search.value = '';
  }
});

//Modal
const modalEl = document.querySelector('modal');

modalEl.innerHTML = `
<div class="modal__card">
<img src="" alt="" class="modal__movie-backdrop">
<h2>
	<span class="modal__movie-title">Название</span>
	<span class="modal__movie-release-year">Год выпуска</span>
</h2>
<ul class="modal__movie-info">
	<div class="loader"></div>
	<li class="modal__movie-genre">Жанр</li>
	<li class="modal__movie-runtime">Время</li>
	<li>Сайт: <a class="modal__movie-site"></a></li>
	<li class="modal__movie-overview">Описание</li>
</ul>
<button class="modal__button-close">Закрыть</button>
</div>
`ж
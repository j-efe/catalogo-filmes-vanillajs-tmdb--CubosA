const moviesGeneral = document.querySelector('.movies');

const modal = document.querySelector('.modal');

const backgroundImage = document.querySelector('.highlight__video');
const titulo = document.querySelector('.highlight__title');
const vote = document.querySelector('.highlight__rating');
const generos = document.querySelector('.highlight__genres');
const data = document.querySelector('.highlight__launch');
const sinopse = document.querySelector('.highlight__description');
const videoLink = document.querySelector('.highlight__video-link');

const modalTitle = document.querySelector('.modal__title');
const modalIMG = document.querySelector('.modal__img');
const modalDescription = document.querySelector('.modal__description');
const modalaverage = document.querySelector('.modal__average');
const modalClose = document.querySelector('.modal__close')


let allMovies = []

let allMoviesAux = []

const getMovies = async (link) => {

    const response = await fetch(link)
    const body = await response.json();
    allMovies = body.results;
    allMoviesAux = body.results;

}

const makeCardMovie = (start, end) => {

    const allMoviesAuxiliar = allMoviesAux.slice(start, end)

    moviesGeneral.innerHTML = '';

    allMoviesAuxiliar.forEach(item => {

        const movie = document.createElement('div')
        movie.classList.add('movie');
        movie.style.backgroundImage = `url(${item.poster_path})`

        const movieInfo = document.createElement('div')
        movieInfo.classList.add('movie__info');

        const movieTitle = document.createElement('span')
        movieTitle.classList.add('movie__title');
        movieTitle.textContent = item.title

        const movieRating = document.createElement('span')
        movieRating.classList.add('movie__rating');
        movieRating.textContent = item.vote_average

        movie.append(movieInfo);
        movieInfo.append(movieTitle);
        movieInfo.append(movieRating);
        moviesGeneral.append(movie);


        movie.addEventListener('click', async () => {

            modal.classList.remove('hidden');

            let filmeAtual = []

            const resposta = await fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${item.id}?language=pt-BR`)
            const bodyEspecific = await resposta.json();

            filmeAtual = bodyEspecific

            modalTitle.textContent = filmeAtual.title
            modalIMG.src = filmeAtual.backdrop_path
            modalDescription.textContent = filmeAtual.overview
            modalaverage.textContent = filmeAtual.vote_average

        })

        modalClose.addEventListener('click', () => {
            modal.classList.add('hidden');
        })

        modal.addEventListener('click', () => {
            modal.classList.add('hidden');
        })

    })

}

let highLightGeral = [];

let highLightVideo = [];

const getHighlight = async (linkGeneral, linkVideo) => {

    const responseGeneral = await fetch(linkGeneral)
    const bodyGeneral = await responseGeneral.json();

    const responseVideo = await fetch(linkVideo)
    const bodyVideo = await responseVideo.json();

    highLightGeral = bodyGeneral;
    highLightVideo = bodyVideo;

    const generoFilme = [];

    highLightGeral.genres.forEach(item => {
        generoFilme.push(item.name)
    })

    backgroundImage.style.backgroundImage = `url(${highLightGeral.backdrop_path}`;

    titulo.textContent = highLightGeral.title;

    vote.textContent = highLightGeral.vote_average;

    generos.textContent = generoFilme.join(", ");

    data.textContent = ` - ${highLightGeral.release_date}`;

    sinopse.textContent = highLightGeral.overview;

    videoLink.href = "https://www.youtube.com/watch?v=" + highLightVideo.results[0].key

}

const init = async () => {
    await getMovies('https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false')
    makeCardMovie(0, 5)
    await getHighlight('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR', 'https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR')

}

init();



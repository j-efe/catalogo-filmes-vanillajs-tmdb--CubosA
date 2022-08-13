const paginaPrev = document.querySelector('.btn-prev')
const paginaNext = document.querySelector('.btn-next')

let start = 0;
let end = 5;

paginaPrev.addEventListener('click', () => {
    if (start === 0) {
        start = allMovies.length - 5;
        end = allMovies.length;
    } else {
        start -= 5;
        end -= 5;
    }

    makeCardMovie(start, end);
})

paginaNext.addEventListener('click', () => {
    if (end === allMovies.length) {
        start = 0
        end = 5
    } else {
        start += 5;
        end += 5;
    }

    makeCardMovie(start, end);
})

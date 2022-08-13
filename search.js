const inputFilter = document.querySelector('.input');

inputFilter.addEventListener('keydown', async (event) => {

    if (event.key === 'Enter' && inputFilter.value !== "") {

        await getMovies(`https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false**&query=${inputFilter.value}`);

        makeCardMovie(0, 5)

        inputFilter.value = ""

    } else if (event.key === 'Enter' && inputFilter.value === "") {
        init();

    }
})
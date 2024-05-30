document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://api.example.com/movies/tendencias';

    async function fetchTendencias() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            displayTendencias(data);
        } catch (error) {
            console.error('Error al obtener tendencias:', error);
        }
    }

    function displayTendencias(movies) {
        const container = document.getElementById('tendencias-container');
        container.innerHTML = '';
        movies.forEach(movie => {
            const movieCard = `
                <div class="col-12 col-sm-6 col-md-3 p-4">
                    <div class="card">
                        <img src="${movie.image}" alt="${movie.title}">
                        <h2>${movie.title}</h2>
                    </div>
                </div>
            `;
            container.innerHTML += movieCard;
        });
    }

    fetchTendencias();
});

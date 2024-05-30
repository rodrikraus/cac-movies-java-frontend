document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODJkMzA0NmRmM2M0ZDE4NjBhMjJkMGVmMDM1YWQ1YSIsInN1YiI6IjY2NTdiYWI1MmY5MjRlNzQwMDkzYmI4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G3n93mN647gBHVRI5N9Ti2BfzHzfcwz1Ivr1D2Hxdds'
        }
      };

    async function fetchTendencias() {
        try {
            const response = await fetch(apiUrl, options);
            const data = await response.json();
            console.log('data', data)
            displayTendencias(data);
        } catch (error) {
            console.error('Error al obtener tendencias:', error);
        }
    }

    function displayTendencias(movies) {
        const container = document.getElementById('tendencias-container');
        container.innerHTML = '';
        movies.results.forEach(movie => {
            const movieCard = `
                <div class="col-12 col-sm-6 col-md-3 p-4">
                    <div class="card">
                        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.original_title}">
                        <h2>${movie.original_title}</h2>
                    </div>
                </div>
            `;
            container.innerHTML += movieCard;
        });
    }

    fetchTendencias();

    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Validar los campos
            let isValid = true;

            // Validar el campo de correo electrónico
            if (!email) {
                isValid = false;
                document.getElementById('email-error').innerText = 'El correo electrónico es obligatorio';
                document.getElementById('email').classList.add('is-invalid');
            } else if (!validateEmail(email)) {
                isValid = false;
                document.getElementById('email-error').innerText = 'El correo electrónico no es válido';
                document.getElementById('email').classList.add('is-invalid');
            } else {
                document.getElementById('email').classList.remove('is-invalid');
                document.getElementById('email-error').innerText = '';
            }

            // Validar el campo de contraseña
            if (!password) {
                isValid = false;
                document.getElementById('password-error').innerText = 'La contraseña es obligatoria';
                document.getElementById('password').classList.add('is-invalid');
            } else {
                document.getElementById('password').classList.remove('is-invalid');
                document.getElementById('password-error').innerText = '';
            }

            if (isValid) {
                alert('Inicio de sesión exitoso');
                // Logica para enviar datos
            }
        });
    }

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.[^<>()[\]\.,;:\s@"]{2,}))$/i;
        return re.test(String(email).toLowerCase());
    }
});

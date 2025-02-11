const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// Get initial movies
getMovies(API_URL);

async function getMovies(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`API Error: ${res.status}`);
        
        const data = await res.json();
        
        if (data.results.length === 0) {
            main.innerHTML = '<p class="no-results">No movies found. Try another search!</p>';
        } else {
            showMovies(data.results);
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
        main.innerHTML = '<p class="error-message">Failed to load movies. Please try again later.</p>';
    }
}

function showMovies(movies) {
    main.innerHTML = movies.map(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        return `
            <div class="movie">
                <img src="${poster_path ? IMG_PATH + poster_path : 'placeholder.jpg'}" alt="${title}">
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
                    <h3>Overview</h3>
                    <p>${overview || 'No overview available.'}</p>
                </div>
            </div>
        `;
    }).join('');
}

function getClassByRate(vote) {
    return vote >= 8 ? 'green' : vote >= 5 ? 'orange' : 'red';
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value.trim();

    if (searchTerm) {
        getMovies(SEARCH_API + encodeURIComponent(searchTerm));
        search.value = '';
    } else {
        alert('Please enter a search term!');
    }
});

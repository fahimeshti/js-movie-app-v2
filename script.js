const input = document.getElementById('formSearch')
const form = document.getElementById('form')
const main = document.getElementById('main')
const search_heading = document.getElementById('s_rr')
const pop_movies = document.getElementById('pop_movies')
const series = document.getElementById('series')
//API KEYS
const api_key = '465c30210bce352e83799aacafbbd512';
const POP_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}`
const TV_API = `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=${api_key}`
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=`

// Main Calls 
getHomeMovies(POP_API)
getTvShows(TV_API)
// async Functions 
async function getMovies(url) {
  const res = await fetch(url)
  const data = await res.json()
  
  showSearchedMovies(data.results)
}

async function getHomeMovies(url) {
  const res = await fetch(url)
  const data = await res.json()
  
  showMovies(pop_movies, data.results)
}

async function getTvShows(url) {
  const res = await fetch(url)
  const data = await res.json()

  showSeries(series, data.results)
}


// Functions

function showMovies(id, movies){
  id.innerHTML = ''

  movies.forEach(movie => {
    const { title, poster_path, vote_average, overview } = movie

      const thisEl = document.createElement('div')
      thisEl.classList.add('card')
        thisEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" class="card-img-top" alt="${title}">
            <div class="card-body d-flex flex-row justify-content-between align-items-center bg-dark text-light">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${vote_average}</p>
            </div>
        `
      id.appendChild(thisEl)
  })

}

function showSeries(id, movies){
  id.innerHTML = ''

  movies.forEach(movie => {
    const { name, poster_path, vote_average, overview } = movie

      const thisEl = document.createElement('div')
      thisEl.classList.add('card')
        thisEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" class="card-img-top" alt="${name}">
            <div class="card-body d-flex flex-row justify-content-between align-items-center bg-dark text-light">
              <h5 class="card-title">${name}</h5>
              <p class="card-text">${vote_average}</p>
            </div>
        `
      id.appendChild(thisEl)
  })

}

function showSearchedMovies(movies){
  search_heading.style.display = 'block'
  main.innerHTML = ''
  main.classList.add('popular-container','d-flex','flex-wrap','justify-content-around')

  movies.forEach(movie => {
    const { title, poster_path, vote_average, overview } = movie

    const movieEl = document.createElement('div')
    movieEl.classList.add('card')
    movieEl.innerHTML = `
          
            <img src="${IMG_PATH + poster_path}" class="card-img-top" alt="${title}">
            <div class="card-body d-flex flex-row justify-content-between align-items-center bg-dark text-light">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${vote_average}</p>
            
    `
    main.appendChild(movieEl)
  });
}

form.addEventListener('submit', (e)=> {
  e.preventDefault()
  const sValue = input.value.trim()
  if (sValue && sValue !== '') {
    getMovies(`${SEARCH_API + sValue}`)
  } else {
    window.location.reload()
  }
  form.reset()
})

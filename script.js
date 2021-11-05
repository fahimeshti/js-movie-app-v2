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

// ******* Main Calls *******
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


// Main Functions for showing movies

function showMovies(id, movies){
  id.innerHTML = ''

  movies.forEach(movie => {
    const { title, poster_path, vote_average } = movie

      const thisEl = document.createElement('div')
      thisEl.classList.add('card')
        thisEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" class="card-img-top" alt="${title}">
            <div class="overview d-flex flex-row justify-content-between align-items-center bg-dark text-light">
              <h5 class="card-title">${title}</h5>
              <p class="card-text ${getClassByRate(vote_average)}">${vote_average}</p>
            </div>
        `
      id.appendChild(thisEl)
  })

}

function showSeries(id, movies){
  id.innerHTML = ''

  movies.forEach(movie => {
    const { name, poster_path, vote_average } = movie

      const thisEl = document.createElement('div')
      thisEl.classList.add('card')
        thisEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" class="card-img-top" alt="${name}">
            <div class="overview d-flex flex-row justify-content-between align-items-center bg-dark text-light">
              <h5 class="card-title">${name}</h5>
              <p class="card-text ${getClassByRate(vote_average)}">${vote_average}</p>
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
    const { title, poster_path, vote_average } = movie

    const movieEl = document.createElement('div')
    movieEl.classList.add('card')
    movieEl.innerHTML = `
          
            <img src="${IMG_PATH + poster_path}" class="card-img-top" alt="${title}">
            <div class="overview d-flex flex-row justify-content-between align-items-center bg-dark text-light">
              <h5 class="card-title">${title}</h5>
              <p class="card-text ${getClassByRate(vote_average)}">${vote_average}</p>
            
    `
    main.appendChild(movieEl)
  });
}
// Getting ratings color 
function getClassByRate(vote) {
  if(vote >= 8) {
      return 'green'
  } else if(vote >= 5) {
      return 'orange'
  } else {
      return 'red'
  }
}
// Search Functionionality 
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

// Horizontal Scrolling by "Ionut Daniel"

const SLIDER = document.querySelector('.items_scrl');

scrollSlider(SLIDER)
scrollSlider(series)

function scrollSlider(cont) {
  let isDown = false;
  let startX;
  let scrollLeft;
  
  cont.addEventListener('mousedown', (e) => {
    isDown = true;
    cont.classList.add('active');
    startX = e.pageX - cont.offsetLeft;
    scrollLeft = cont.scrollLeft;
  });
  cont.addEventListener('mouseleave', () => {
    isDown = false;
    cont.classList.remove('active');
  });
  cont.addEventListener('mouseup', () => {
    isDown = false;
    cont.classList.remove('active');
  });
  cont.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - cont.offsetLeft;
    const walk = (x - startX) * 2; //scroll-fast
    cont.scrollLeft = scrollLeft - walk;
    // console.log(walk);
  });
}

// END
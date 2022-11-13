// First of all I guees we need to create a pseudo code - text structure of the app
// 1) We need get data from API, but for that we need two fetch requests
//      1a) get movies titles list 
//      1b) get whole data we need from imdb query 
// 2) We can save that data to global variable to be able to work without                                 additional requests 
// 3) Render HTML with movies to the page
// 4) Save selected films in localStorage


// To make our code clear better to use "const" where it's possible
// or at least not mixed let and const for the "same" variables

const movieInput = document.getElementById("movie-input")
const moviesList = document.getElementById('movie-list')
const searchBtn = document.getElementById("search-btn")

// I declared empty array here with let, because we need to erase it 
// with each new request

let moviesData = []

// So let's create our function that will handle our API requests
// and add eventListener to our button

searchBtn.addEventListener("click", fetchData)

async function fetchData() {
    // clear "moviesData" array before next fetch request
    moviesData = []
    const res = await fetch(`https://www.omdbapi.com/?s=${movieInput.value}&apikey=cabe5a55`)
    const moviesTitleData = await res.json()
    
    // now we need to fetch data using imdbID query
    
    for (let movie of moviesTitleData.Search) {
        const res = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=cabe5a55`)
        const data = await res.json()
        
        // and then push it to global variable array "moviesData" 
        moviesData.push(data)
    }
    // when our data is ready, we can call render function 
    renderMoviesList()
}

function renderMoviesList() {
    // I created this string, to combine all template strings in one variable
    // and when add this to the DOM, better to avoid DOM modification inside loop
    
    let movieListHtml = ""
        
    moviesData.forEach(movie => {
        // in this template string we will add eventListener for "add to watchlist function"
        // for now I added it to "img add-icon"
        // and provide id of element as argument
        const shortPlot = `${movie["Plot"].substring(0, 110)} <span class="read-more" id=${movie.imdbID} onclick="readMore(this.id, this.parentNode)">... Read more</span>`
    
        movieListHtml += `
            <div class="movie-card-holder-parent" id="${movie.imdbIDd}">
            <div class="movie-card-holder">
                <div class="movie-card">
                    <img class="movie-poster" src=${movie.Poster} alt=""/>
                    <div class="movie-info">
                        <div class="movie-title-rating">
                            <h2 class="movie-title">${movie["Title"]}</h2>
                            <div class="movie-rating">
                                <img class="star-icon" src="./images/star.png" alt="">
                                <p>${movie["imdbRating"]}</p>
                            </div>
                        </div>
                        <div class="movie-runtine-genre">
                            <p>${movie["Runtime"]}</p>
                            <p>${movie["Genre"]}</p>
                            <div class="add-to-watchlist">
                                <img class="add-icon" id="${movie.imdbID}" src="./images/add.png" alt="add to watchlist" onclick="addToWatchlist(this.id)"> 
                                <p>Watchlist</p>
                            </div>

                        </div>
                        <p class="plot">${movie["Plot"].length < 110 ? movie["Plot"] : shortPlot}</p>
                    </div>
                </div>
            </div>
            <div class="divider"></div>
            </div>
            `
        
    })
    
    moviesList.innerHTML = movieListHtml
    
    // you don't need line below, because you simple overwrite innerHTML
    // of the div which contain "start-exploring" div with line above
    
    // document.getElementById("start-exploring").style.display = "none"
}

function addToWatchlist(id) {
    // now you have eventListener for you "add" feature
    // and the array with all data you need to add movie to localStorage
    for(let movie of moviesData) {
        if(movie.imdbID === id) {
            localStorage.setItem(id, JSON.stringify(movie))
        }
    } 
}

function readMore(id, plotNode) {

    for(let movie of moviesData) {
        if(movie.imdbID === id) {
           plotNode.textContent = movie.Plot
        }
    }
    
}

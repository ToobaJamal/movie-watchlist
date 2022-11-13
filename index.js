const movieInput = document.getElementById("movie-input")
const moviesList = document.getElementById('movie-list')
const searchBtn = document.getElementById("search-btn")

let moviesData = []

searchBtn.addEventListener("click", fetchData)

async function fetchData() {
    moviesData = []
    const res = await fetch(`https://www.omdbapi.com/?s=${movieInput.value}&apikey=cabe5a55`)
    const moviesTitleData = await res.json()
    
    for (let movie of moviesTitleData.Search) {
        const res = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=cabe5a55`)
        const data = await res.json()
        
        moviesData.push(data)
    }
    renderMoviesList()
}

function renderMoviesList() {
    let movieListHtml = ""
        
    moviesData.forEach(movie => {
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
}

function addToWatchlist(id) {
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

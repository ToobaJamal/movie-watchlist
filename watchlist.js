let watchlistHTML = ``
const watchlistHolder = document.getElementById("watchlist-holder")

let watchlistArr = []
if(localStorage.length >= 1) {
    for(let i=0 ; i<localStorage.length; i++) {
        const item = localStorage.getItem(localStorage.key(i))
        watchlistArr.push(JSON.parse(item))
}
    renderWatchlist()
}

function renderWatchlist() {
    for(let item of watchlistArr) {
        
        watchlistHTML += `<div class="movie-card-holder">
                <div class="movie-card">
                    <img class="movie-poster" src=${item.Poster} alt=""/>
                    <div class="movie-info">
                        <div class="movie-title-rating">
                            <h2 class="movie-title">${item["Title"]}</h2>
                            <div class="movie-rating">
                                <img class="star-icon" src="./images/star.png" alt="">
                                <p>${item["imdbRating"]}</p>
                            </div>
                        </div>
                        <div class="movie-runtine-genre">
                            <p>${item["Runtime"]}</p>
                            <p>${item["Genre"]}</p>
                            <div class="remove-from-watchlist">
                                <img class="remove-icon" id="${item.imdbID}" src="./images/remove.png" alt="remove from watchlist" onclick="removeFromWatchlist(this.id)">
                                <p>Remove</p>
                            </div>
                        </div>
                        <p class="plot">${item["Plot"]}</p>
                    </div>
                </div>
            </div>
            <div class="divider"></div>`
    }
    watchlistHolder.innerHTML = watchlistHTML
}

// console.log(watchlistArr)
// for(let i of watchlistArr) {
//     console.log(JSON.parse(i))
// }

function removeFromWatchlist(id) {
    for(let movie of watchlistArr) {
        if(movie.imdbID === id) {
            localStorage.removeItem(id)
        }
    }
    location.reload()
}


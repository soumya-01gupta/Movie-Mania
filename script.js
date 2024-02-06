let APIKey = " 5aaf899f";
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");

document.querySelector(".card").innerHTML = 
"<h1><center>Let's Search a Movie </center></h1>"

const getData = async(movie) => {
    document.querySelector(".card").innerHTML = "";
    searchInput.value = "";

    try {
        let fetchData = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=5aaf899f&t=${movie}`);
        let jsonData = await fetchData.json();
        
        console.log(jsonData);

        if(jsonData.Title) {
            let div = document.createElement("div");
            div.classList.add("movieCard");

            div.innerHTML=`
                <div class="image-container" onclick="openYoutube('${jsonData.Title}', '${jsonData.Released}')">
                    <img src="${jsonData.Poster}" alt="Image Not Available">
                </div>
                <div class="cardText">
                    <h1>${jsonData.Title}</h1>
                    <p class="rating">Rating : <span>${jsonData.imdbRating}/10</span></p>
                    <a id="whereToWatchLink" href="#" onclick="searchWhereToWatch('${jsonData.Title}', '${jsonData.Director}')">Where to Watch ?</a>
                    <p><strong>Genre :</strong> <span>${jsonData.Genre}</span></p>
                    <p><strong>Release :</strong> <span>${jsonData.Released}</span></p>
                    <p><strong>Actors :</strong> <span>${jsonData.Actors}</span></p>
                    <p><strong>Director :</strong> <span>${jsonData.Director}</span></p>
                    <p><strong>Language :</strong> <span>${jsonData.Language}</span></p>
                    <p><strong>Duration :</strong> <span>${jsonData.Runtime}</span></p>
                    <p><strong>Description :</strong> <span>${jsonData.Plot}</span></p>
                </div> `;
            
            document.querySelector(".card").appendChild(div);
        } else {
            document.querySelector(".card").innerHTML = "<h1><center>Enter Valid Movie Name</center></h1>";
        }
    } catch (error) {
        document.querySelector(".card").innerHTML = "<h1><center>Oops !!! Something went wrong</center></h1>";
        console.error(error);
    }
}

searchBtn.addEventListener("click", function(){
    let movieName = searchInput.value;
    if(movieName == "") {
        document.querySelector(".card").innerHTML = 
        "<h1><center>Please Enter a Movie Name</center></h1>";
    } else {
        getData(movieName);
    }
})

function openYoutube(movieName, releaseYear) {
    try {
        let searchTerm = `trailer ${movieName} ${releaseYear}`;
        window.open(`https://www.youtube.com/results?search_query=${searchTerm}`);
    } catch (error) {
        console.error("Error opening YouTube:", error);
    }
}

function searchWhereToWatch(movieName, directorName) {
    try {
        let searchQuery = `where to watch ${movieName} by ${directorName}`;
        window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`);
    } catch (error) {
        console.error("Error searching where to watch:", error);
    }
}

searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        // If Enter key is pressed, trigger the click event on searchBtn
        searchBtn.click();
    }
});

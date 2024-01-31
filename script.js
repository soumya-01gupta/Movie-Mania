let APIKey = " 5aaf899f";
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");

const getData = async(movie) =>{

    
    let fetchData = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=5aaf899f&t=${movie}`);

    let jsonData = await fetchData.json();
    console.log(jsonData);

    document.querySelector(".card").innerHTML = "";
    searchInput.value = "";

    try{
        if(jsonData.Title)
        {
            let div = document.createElement("div");
            div.classList.add("movieCard");

            div.innerHTML=`
                    <img src = ${jsonData.Poster} alt = "">
                    <div class = "cardText">
                        <h1>${jsonData.Title}</h1>
                        <p class="rating">Rating : <span>${jsonData.imdbRating}/10</span></p>
                        <a href = "">${jsonData.Genre}</a>
                        <p>Release : <span>${jsonData.Released}</span></p>
                        <p>Duration : <span>${jsonData.Runtime}</span></p>
                        <p>Description : <span>${jsonData.Plot}</span></p>
                        <p><span></span></span>
                    </div> `
            
            document.querySelector(".card").appendChild(div)
        }
        else
        {
            document.querySelector(".card").innerHTML = "<h1><center>Enter Valid Movie Name</center></h1>"
        }
    }
    catch(error){
        // console.log("Not found");
        document.querySelector(".card").innerHTML = "<h1><center>Enter Valid Movie Name</center></h1>"
        
    }

}

searchBtn.addEventListener("click", function(){
    let movieName = searchInput.value;
    if(movieName == "")
    {
        //alert("Please enter a movie name");
        document.querySelector(".card").innerHTML = 
        "<h1><center>First Search Movie Name</center></h1>"
        
    }
    else
    {
        getData(movieName);
        //searchInput.innerHTML = "";
    }
})

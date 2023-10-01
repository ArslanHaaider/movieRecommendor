document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resultForm");
    const movieResult = document.getElementById("movie-result");
    const searchButton = document.getElementById("resultSubmition");
    searchButton.addEventListener('click',()=>{
        movieResult.innerHTML = "";
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevents the default form submission behavior
      
      const movieName = document.getElementById("movieName").value;
      const year = document.getElementById("launchYear").value;
      let apiUrl = `http://www.omdbapi.com/?s=${movieName}&apikey=9835761c&type=movie`;
  
      if (year) {
        apiUrl += `&y=${year}`;
      }
  
      fetch(apiUrl)
        .then((Response) => Response.json())
        .then((data) => {
          displayResults(data);
        })
        .catch((error) => {
          console.error("Error fetching data", error);
        });
    });
    
    function displayResults(data) {

      if (data.Response == "True") {
        data.Search.map((value,index) => {
            movieResult.innerHTML += `
          <div class="movie"> <h2>${value.Title} (${value.Year})</h2>
          <img src="${value.Poster}" id="movieImg" alt=""> </div>`;
        })
      } else {
        movieResult.innerHTML = `<p>No movie found.</p>`;
      }
    }
  });
  
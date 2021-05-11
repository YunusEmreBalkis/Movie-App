const poster = document.querySelector(".img-fluid");
const moiveTitle = document.querySelector("h1");
const cast = document.querySelector("#cast");
const length = document.querySelector("#len");
const plot = document.querySelector("#plot");
const rate = document.querySelector("#rate");
const year = document.querySelector("#year");
const search = document.querySelector("#search");
const searchInput = document.querySelector("#searchInput");

search.addEventListener("click", getfilmid);

let filmid;

function getfilmid(e) {
  const filmname = searchInput.value;
  console.log(filmname);

  fetch(
    "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/" +
      filmname,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "737b725379msh219e2f7870f346ap11e5bejsn9f752551c1d2",
        "x-rapidapi-host":
          "imdb-internet-movie-database-unofficial.p.rapidapi.com",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      //console.log(data.titles[0].id);
      filmid = data.titles[0].id;
      getfilmdata(filmid);
    });
  e.preventDefault();
}

function getfilmdata(filmid) {
  fetch(
    "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/" +
      filmid,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "737b725379msh219e2f7870f346ap11e5bejsn9f752551c1d2",
        "x-rapidapi-host":
          "imdb-internet-movie-database-unofficial.p.rapidapi.com",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      poster.src = data.poster;
      moiveTitle.textContent = data.title;
      length.textContent = data.length;
      plot.textContent = data.plot;
      rate.textContent = data.rating;
      year.textContent = data.year;

      let casts = data.cast;
      console.log(casts);
      let i = 0;

      casts.forEach((mov) => {
        cast.innerHTML += `        
        <tr class="ret">
        <th scope="row">${i + 1}</th>
        <td >${casts[i].actor}</td>
        <td >${casts[i].character}</td>
		</tr>
        `;
        i++;
      });
    });
}

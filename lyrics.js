let resultBox = document.getElementsByClassName("search-result");
const searchBtn = document.getElementById("search");
const formControl = document.getElementById("input");
searchBtn.addEventListener("click", function () {
  let songInput = searchBtn.value;
  resultBox[0].innerHTML = '';
  let url = "https://api.lyrics.ovh/suggest/";
  let searchSong = url + formControl.value;
  fetch(searchSong)
    .then((res) => res.json())
    .then((data) => {
      selectData(data);
    });
});
function selectData(data) {
  let dataTen = data.data.splice(0, 10);
  for (data of dataTen) {
    let title = data.title;
    let artist = data.artist.name;
    let duration = data.duration;
    let searchResult = `<div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${title}</h3>
                        <p class="author lead">${artist} <span>${duration}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button class="btn lyric-btn btn-success">Get Lyrics</button>
                    </div>
                </div>`;
    resultBox[0].insertAdjacentHTML("beforeend", searchResult);
  }

  let lyricButtons = document.getElementsByClassName("lyric-btn");

  for (let i = 0; i < dataTen.length; i++) {
    let button = lyricButtons[i].addEventListener("click", function () {
      let artist = dataTen[i].artist.name;
      let title = dataTen[i].title;
      let lyricsUrl = "https://api.lyrics.ovh/v1/" + artist + "/" + title;
      fetch(lyricsUrl)
        .then((res) => res.json())
        .then((data) => {
          let lyricsLine = document.getElementById("lyrics-line");
          lyricsLine.innerHTML = title + "\n" + artist + "\n" + data.lyrics;
        });
    });
  }
}

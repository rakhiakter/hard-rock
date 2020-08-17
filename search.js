const form = document.getElementById('form')
const search = document.getElementById('search')
const result = document.getElementById('result')


let apiURL = 'https://api.lyrics.ovh';
form.addEventListener('submit', e=> {
    searchValue = search.value.trim()
    console.log(searchValue);
    let searchUrl = apiURL + "/suggest/" + searchValue;
    console.log(searchUrl);
    e.preventDefault();



})
async function searchSong(searchValue){
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`);

    const data = await searchResult.json();
    console.log(data);
    showData(data);
}
// function showData(data){
//   result.innerHTML = `
//   <ul class = "song-list">
//   ${data.data.map(song=> `<li>
//   `)
// }
//   `
    
//   )};
    
 
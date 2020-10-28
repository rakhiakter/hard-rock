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
   fetch(`${apiURL}/suggest/${searchValue}`).then(response=>response.json())
   .then(data=>console.log(data))
       const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`);

    const data = await searchResult.json();
    showData(data);
}
function showData(data){
    console.log(data.data);
    result.innerHTML = `
    <ul class="song-list">
    ${data.data.map(song=> `<li>
                            <div>
                                <strong>
                                ${song.artist.name}
                                </strong> -${song.title}
                                </div>
                                <span data.artist="${song.artist.name}" data-songtitle="${song.title}"> 
                                get lyrics 
                                </span>
                                </li>
    `).join('')
    }
    </ul>
    `
}
result.addEventListener('click', e=>{
    const clickedElement = e.target;

    if(clickedElement.tagName === 'SPAN'){
    const artist = clickedElement.getAttribute('data-artist');
    const songTitle = clickedElement.getAttribute('data-songtitle');
    getLyrics(artist, songTitle)
    }
})

async function getLyrics(artist, songTitle){
const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
const data = await res.json();
console.log(data);
const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>')
result.innerHTML = ` <h2> <strong>
                            ${artist}
                            </strong> -${songTitle}
                            </h2>
                            <p> ${lyrics}</p>



`
}
    
 
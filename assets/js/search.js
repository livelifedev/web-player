function openSearch() {
    let placeholder = document.getElementById("mainContent");
    let searchHeader =
        `<div class="searchContainer">
            <h4>Search for an artist, album or song</h4>
            <input type="text" class="searchInput" placeholder="Start typing...">
        </div>
        <div id="resultsContainer"></div>`;
    
    placeholder.innerHTML = searchHeader;

    document.querySelector(".searchInput").addEventListener("keyup", (k) => {
        clearTimeout(timer);

        timer = setTimeout(() => {
            search();
        }, 2000);
        console.log(k)
    });
}

function search() {
    let resultsContainer = document.getElementById("resultsContainer");
    let searchText = new RegExp(document.querySelector(".searchInput").value, "i");
    
    let foundSongs = songsList.filter(s => s.match(searchText));
    let foundArtists = artistsList.filter(s => s.match(searchText));
    let foundAlbums = albumsList.filter(s => s.match(searchText));
    console.log(foundSongs);
    
    if (foundSongs.length <= 0) {
        return resultsContainer.innerHTML = "<p>Not found</p>";
    }

    for(let title of foundSongs){
        for(let song of songDB) {
            if(song.title == title) tempPlaylist.push(song);
        }
    }

    resultsHTML = 
        `<div class="tracklistContainer borderBottom">
            <h2>Songs</h2>
            <ul class="tracklist">`;

    for (let song of tempPlaylist) {
        let index = tempPlaylist.indexOf(song);
        resultsHTML += 
            `<li class="tracklistRow">
                <div class="trackCount">
                    <img class="play" src="assets/images/icons/play-white.png" onclick="setTrack(tempPlaylist[${index}], tempPlaylist, true)">
                    <span class="trackNumber">${index + 1}</span>
                </div>
                <div class="trackInfo">
                    <span class="trackName">${song.title}</span>
                    <span class="artistName">${song.artist}</span>
                </div>
                <div class="trackOptions">
                    <input type="hidden" class="songId" value="${index}">
                    <img class="optionsButton" src="assets/images/icons/more.png" onclick="showOptionsMenu(this)">
                </div>
                <div class="trackDuration">
                    <span class="duration">${song.duration}</span>
                </div>
            </li>`;
    }

    resultsHTML += '</ul></div>';
    resultsContainer.innerHTML = resultsHTML;
    
}


/* 
//Albums results
let gridItem = 
    `<div class="gridViewContainer">
        <h2>Albums</h2>`

    for(let i = 0; i < albumsList.length; i++) {
        let title = albumsList[i]; //"Road block"
        let firstSong = albums[title][0];

        if (firstSong.artist == y) {
            gridItem += 
            `<div class="gridViewItem">
                <span role="link" tabindex="0" onclick="buildAlbumPage('${title}')">
                    <img src="assets/images/artwork/${firstSong.artwork}">
                    <div class="gridViewInfo">${title}</div>
                </span>
            </div>`;
        }
    }
    
    `</div>`

placeholder.innerHTML = artistHeader + tracklistHTML + gridItem;
*/
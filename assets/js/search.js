function openSearch() {
    let placeholder = document.getElementById("mainContent");
    let searchHeader =
        `<div class="searchContainer">
            <h4>Search for an artist, album or song</h4>
            <input type="text" class="searchInput" placeholder="Start typing...">
        </div>
        <div id="resultsContainer"></div>`;
    
    placeholder.innerHTML = searchHeader;
    getPlaylistsDropdown(0)

    document.querySelector(".searchInput").addEventListener("keyup", (k) => {
        clearTimeout(timer);

        timer = setTimeout(() => {
            search();
        }, 2000);
        console.log(k)
    });
}

function search() {
    let getSearch = document.querySelector(".searchInput").value;
    
    if(getSearch.length < 2) return;
    let resultsContainer = document.getElementById("resultsContainer");
    let searchText = new RegExp("\\b" + getSearch, "i");

    let foundSongs = songsList.filter(s => s.match(searchText));
    let foundArtists = artistsList.filter(s => s.match(searchText));
    let foundAlbums = albumsList.filter(s => s.match(searchText));
    
    tempPlaylist = [];
    for(let title of foundSongs){ //there is a bug where tempPlaylist does not get cleared before results
        for(let song of songDB) {
            if(song.title == title) tempPlaylist.push(song);
        }
    }

    let songResult = 
        `<div class="tracklistContainer borderBottom">
            <h2>Songs</h2>
            <ul class="tracklist">`;

    for (let song of tempPlaylist) {
        let index = tempPlaylist.indexOf(song);
        songResult += 
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

    songResult += '</ul></div>';

    let artistResult =
        `<div class="artistsContainer borderBottom">
            <h2>Artists</h2>`;

    for (let artist of foundArtists) {
        artistResult += 
        `<div class="searchResultRow">
            <div class="artistName">
                <span role="link" tabindex="0" onclick="buildArtistPage(this.textContent)">${artist}</span>
            </div>    
        </div>`;
    }

    artistResult += '</div>';


    let albumResult = 
    `<div class="gridViewContainer">
        <h2>Albums</h2>`;

    for(let i = 0; i < foundAlbums.length; i++) {
        let title = foundAlbums[i]; 
        albumResult += 
        `<div class="gridViewItem">
            <span role="link" tabindex="0" onclick="buildAlbumPage('${title}')">
                <img src="assets/images/artwork/${albums[title][0].artwork}">
                <div class="gridViewInfo">${title}</div>
            </span>
        </div>`;
    }
    albumResult += '</div>';

    resultsContainer.innerHTML = songResult + artistResult + albumResult;
}
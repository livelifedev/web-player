function buildArtistPage(y) {
    let placeholder = document.getElementById("mainContent");
    tempPlaylist = artists[y];
    let artistHeader = 
        `<div class="entityInfo borderBottom">
            <div class="centerSection">
                <div class="artistInfo">
                    <h1 class="artistName">${y}</h1>
                    <div class="headerButtons">
                        <button class="button green" onclick="playFirstSong()">PLAY</button>
                    </div>
                </div>
            </div>
        </div>`;

    let tracklistHTML = 
        `<div class="tracklistContainer borderBottom">
            <h2>Songs</h2>
            <ul class="tracklist">`;
        
    for (let song of tempPlaylist) {
        let index = tempPlaylist.indexOf(song);
        tracklistHTML += 
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
    tracklistHTML += '</ul></div>';
    
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
    getPlaylistsDropdown(0);
}




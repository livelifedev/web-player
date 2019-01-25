function buildAlbumPage(x) {

    let placeholder = document.getElementById("mainContent");
    
    tempPlaylist = albums[x]; //retrieves songs array from album
    let albumHeader = 
        `<div class="entityInfo">
            <div class="leftSection">
                <img src="assets/images/artwork/${tempPlaylist[0].artwork}">
            </div>
            <div class="rightSection">
                <h2>${x}</h2>
                <p role="link" tabindex="0" onclick="buildArtistPage('${tempPlaylist[0].artist}')">By ${tempPlaylist[0].artist}</p>
                <p>${tempPlaylist.length} Songs</p>
            </div>
        </div>`;

    let tracklistHTML = '<div class="tracklistContainer"><ul class="tracklist">';

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
    
    placeholder.innerHTML = albumHeader + tracklistHTML;
    getPlaylistsDropdown(0)
}



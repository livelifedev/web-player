//requires access to songDB.js
console.log("loaded album.js");
let albumInfo = [];
function buildAlbumPage(x) {

    let placeholder = document.getElementById("mainContent");
    
    albumInfo = albums[x];
    let albumHeader = 
        `<div class="entityInfo">
            <div class="leftSection">
                <img src="assets/images/artwork/${albumInfo[0].artwork}">
            </div>
            <div class="rightSection">
                <h2>${x}</h2>
                <p role="link" tabindex="0" onclick="openPage('')">By ${albumInfo[0].artist}</p>
                <p>${albumInfo.length} Songs</p>
            </div>
        </div>`;

    let tracklistHTML = '<div class="tracklistContainer"><ul class="tracklist">';

    for (let song of albumInfo) {
        let index = albumInfo.indexOf(song);
        tracklistHTML += 
            `<li class="tracklistRow">
                <div class="trackCount">
                    <img class="play" src="assets/images/icons/play-white.png" onclick="setTrack(albumInfo[${index}], albumInfo, true)">
                    <span class="trackNumber">${index + 1}</span>
                </div>
                <div class="trackInfo">
                    <span class="trackName">${song.title}</span>
                    <span class="artistName">${song.artist}</span>
                </div>
                <div class="trackOptions">
                    <input type="hidden" class="songId" value="">
                    <img class="optionsButton" src="assets/images/icons/more.png" onclick="">
                </div>
                <div class="trackDuration">
                    <span class="duration">${song.duration}</span>
                </div>
            </li>`;
    }
    tracklistHTML += '</ul></div>';
    
    placeholder.innerHTML = albumHeader + tracklistHTML;

}



console.log("loaded playlists.js");

getPlaylistsDropdown(0); //this builds the options menu

document.addEventListener("click", (e) => {
    let target = e.target.classList;
    if(!target.contains("item") && !target.contains("optionsButton")) {
        hideOptionsMenu();
    };
});

function createPlaylist() {
    let popup = prompt("Please enter the name of your playlist");

    if (popup != null) {
        let newPlaylist = {name: popup, songs: []};
        userPlaylists.push(newPlaylist);
    }
    buildPlaylistsPage()
    getPlaylistsDropdown()
}

function deletePlaylist(index) {
    console.log(index);
    let prompt = confirm("Are you sure you want to delete this playlist?");

    if(prompt) {
        userPlaylists.splice(index, 1);
    }
    buildPlaylistsPage()
    getPlaylistsDropdown()
}

function addToPlaylist(playlistId, songId) { 
    console.log(playlistId);
    let selectedPlaylist = userPlaylists[playlistId.value];
    let selectedSong = albumInfo[songId]; //requires access to album.js
    selectedPlaylist.songs.push(selectedSong);
    hideOptionsMenu();
    playlistId.value = "";
}

function removeFromPlaylist(playlistId, songId) {
    let index = document.querySelector(".entityInfo").dataset.id;
    let selectedPlaylist = userPlaylists[index];
    selectedPlaylist.songs.splice(songId, 1);
    hideOptionsMenu();
    openPlaylist(index);
}

function getPlaylistsDropdown(option) {
    let optionsMenu = document.querySelector(".optionsMenu");
    let dropdown = `<input type="hidden" class="songId drop">
        <select class="item playlist" onchange="addToPlaylist(this, document.querySelector('.songId.drop').value)">
        <option value="">Add to playlist</option>`;
    
    for(let p of userPlaylists) {
        let id = userPlaylists.indexOf(p);//
        let name = p.name;
        dropdown += `<option value="${id}">${name}</option>`;
    }
    optionsMenu.innerHTML = dropdown + '</select>';
    
    if(option) {
        optionsMenu.innerHTML +=
            `<div class="item" onclick="removeFromPlaylist(this, document.querySelector('.songId.drop').value)">Remove from playlist</div>`;
    }
}

function showOptionsMenu(button) {
    let songId = button.previousElementSibling.value;
    let menu = document.querySelector(".optionsMenu");
    let menuWidth = parseInt(getComputedStyle(menu).width); //optimize later
    menu.querySelector(".songId").value = songId;

    const scrollTop = window.scrollY;
    const elementOffset = button.offsetTop;
    const top = elementOffset - scrollTop;
    const left = button.offsetLeft;

    menu.style.cssText = `top: ${top}px; left: ${left - menuWidth}px; display: inline`;
}

function hideOptionsMenu() {
    let menu = document.querySelector(".optionsMenu");
    if(menu.style.display != "none") {
        menu.style.display = "none";
    }
}

function buildPlaylistsPage() {
    let placeholder = document.getElementById("mainContent");
    let playlistsHeader = 
       `<div class="playlistsContainer">
            <div class="gridViewContainer">
                <h2>Your Playlists</h2>
                <div class="buttonItems">
                    <button class="button green" onclick="createPlaylist()">NEW PLAYLIST</button>
                </div>
            </div>
        </div>`;
    let playlistHTML = "";

    if(userPlaylists.length <= 0) {
        playlistHTML = "<span class='noResults'>You don't have any playlists yet.</span>";
    } else {
        for(let i = 0; i < userPlaylists.length; i++) {
            let index = userPlaylists[i];
            playlistHTML += 
                `<div class="gridViewItem" role="link" tabindex="0" onclick="openPlaylist(${i})">
                    <div class="playlistImage">
                        <img src="assets/images/icons/playlist.png">
                    </div>

                    <div class="gridViewInfo">${index.name}</div>
                </div>`;
        }
    }

    placeholder.innerHTML = playlistsHeader + playlistHTML;
}

function openPlaylist(i) {
    console.log("playlist index: " + i);
    let playlist = userPlaylists[i];
    let placeholder = document.getElementById("mainContent");
    albumInfo = playlist.songs;
    let playlistHeader = 
        `<div class="entityInfo" data-id="${i}">
            <div class="leftSection">
                <img src="assets/images/icons/playlist.png">
            </div>
            <div class="rightSection">
                <h2>${playlist.name}</h2>
                <p role="link" tabindex="0" onclick="openPage('')">Your Playlist</p>
                <p>${albumInfo.length} Songs</p>
                <button class="button" onclick="deletePlaylist(${i})">DELETE PLAYLIST</button>
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
                    <input type="hidden" class="songId" value="${index}">
                    <img class="optionsButton" src="assets/images/icons/more.png" onclick="showOptionsMenu(this)">
                </div>
                <div class="trackDuration">
                    <span class="duration">${song.duration}</span>
                </div>
            </li>`;
    }
    tracklistHTML += '</ul></div>';

    placeholder.innerHTML = playlistHeader + tracklistHTML;

    getPlaylistsDropdown(1)
}
console.log("loaded playlists.js");
//this builds the options menu
document.querySelector(".optionsMenu").innerHTML = getPlaylistsDropdown();

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
}

function deletePlaylist(index) {
    let prompt = confirm("Are you sure you want to delete this playlist?");

    if(prompt) {
        userPlaylists.splice(index, 1);
    }
}

function addToPlaylist(playlistId, songId) { 
    let selectedPlaylist = userPlaylists[playlistId.value];
    let selectedSong = albumInfo[songId]; //requires access to album.js
    selectedPlaylist.songs.push(selectedSong);
    hideOptionsMenu();
    playlistId.value = "";
}

function removeFromPlaylist() {

}

function getPlaylistsDropdown() {
    let dropdown = `<input type="hidden" class="songId">
    <select class="item playlist" onchange="addToPlaylist(this, this.previousElementSibling.value)">
        <option value="">Add to playlist</option>`;
    
    for(let p of userPlaylists) {
        let id = userPlaylists.indexOf(p);//
        let name = p.name;
        dropdown += `<option value="${id}">${name}</option>`;
    }
    return dropdown + '</select>';
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
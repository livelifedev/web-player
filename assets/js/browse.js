shuffleArray(albumsList);
function toGrid(albumsList) {
    let placeholder = document.getElementById("mainContent");
    let gridItem = '<h1 class="pageHeading">Hot Picks For You</h1>';
    for(let i = 0; i < albumsList.length; i++) {
        let title = albumsList[i]; //"Road block"
        gridItem += 
        `<div class="gridViewItem">
            <span role="link" tabindex="0" onclick="buildAlbumPage('${title}')">
                <img src="assets/images/artwork/${albums[title][0].artwork}">
                <div class="gridViewInfo">${title}</div>
            </span>
        </div>`;
    }
    placeholder.innerHTML = gridItem;
}

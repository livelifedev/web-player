function openSearch() {
    let placeholder = document.getElementById("mainContent");
    let searchHeader =
        `<div class="searchContainer">
            <h4>Search for an artist, album or song</h4>
            <input type="text" class="searchInput" placeholder="Start typing..." onfocus="search()">
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
    
    let found = artistsList.filter(s => s.match(searchText));
    console.log(found);
    
    if (found.length <= 0) {
        return resultsContainer.innerHTML = "<p>Not found</p>";
    }


}


    

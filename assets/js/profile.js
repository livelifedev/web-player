function openProfile() {
    let placeholder = document.getElementById("mainContent");
    placeholder.innerHTML = 
        `<div class="entityInfo">
            <div class="userInfo">
                <img src="assets/images/icons/head_temp.png" class="profilePhoto" alt="Profile picture">
                <h1>Test Profile</h1>
            </div>
            <div class="buttonItems">
                <button class="button">USER DETAILS</button>
                <button class="button">LOGOUT</button>
            </div>
        </div>`;
}
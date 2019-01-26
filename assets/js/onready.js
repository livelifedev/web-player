let newPlaylist = songDB;
audioElement = new Audio();
setTrack(newPlaylist[0], newPlaylist, false);
updateVolumeProgressBar(audioElement.audio);

let container = document.getElementById("nowPlayingBarContainer");
addListenerMulti(container, "mousedown touchstart mousemove touchmove", (e) => e.preventDefault());

const volBar = document.querySelector(".volumeBar .progressBar");
const volWidth = parseInt(getComputedStyle(volBar).width);
volBar.addEventListener("mousedown", () => mouseDown = true); //combine later with other mousedowns
volBar.addEventListener("mousemove", (e) => {
    if(mouseDown) {
        const percentage = e.offsetX / volWidth;
        if(percentage >= 0 && percentage <= 1) {
            audioElement.audio.volume = percentage;
        }
    }
})
volBar.addEventListener("mouseup", (e) => {
    const percentage = e.offsetX / volWidth;
    if(percentage >= 0 && percentage <= 1) {
        audioElement.audio.volume = percentage;
    }
});

const timeBar = document.querySelector(".playbackBar .progressBar");
timeBar.addEventListener("mousedown", () => mouseDown = true);
timeBar.addEventListener("mousemove", (e) => {
    if(mouseDown) {
        timeFromOffset(e, timeBar);
    }
});
timeBar.addEventListener("mouseup", (e) => timeFromOffset(e, timeBar));

document.addEventListener("mouseup", () => mouseDown = false);


    

    let newPlaylist = songDB; //should generate random playlist 10 songs
    setTrack(newPlaylist[0], newPlaylist, false);
    audioElement.addEventListener("canplay", function() {
        const duration = formatTime(this.duration);
        document.querySelector(".progressTime.remaining").textContent = duration;
    });

    let container = document.getElementById("nowPlayingBarContainer");
    addListenerMulti(container, "mousedown touchstart mousemove touchmove", (e) => e.preventDefault());

    audioElement.addEventListener("timeupdate", function() {
        if(this.duration) updateTimeProgressBar(this);
    });
    audioElement.addEventListener("ended", () => nextSong());
    audioElement.addEventListener("volumechange", () => updateVolumeProgressBar(audioElement));
    updateVolumeProgressBar(audioElement);

    const volBar = document.querySelector(".volumeBar .progressBar");
    const volWidth = parseInt(getComputedStyle(volBar).width);

    volBar.addEventListener("mousedown", () => mouseDown = true); //combine later with other mousedowns
    volBar.addEventListener("mousemove", (e) => {
        if(mouseDown) {
            const percentage = e.offsetX / volWidth;
            if(percentage >= 0 && percentage <= 1) {
                audioElement.volume = percentage;
            }
        }
    })
    volBar.addEventListener("mouseup", (e) => {
        const percentage = e.offsetX / volWidth;
        if(percentage >= 0 && percentage <= 1) {
            audioElement.volume = percentage;
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

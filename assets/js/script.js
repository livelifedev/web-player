    let currentPlaylist = [];
    let shufflePlaylist = [];
    let tempPlaylist = [];
    let currentIndex = 0;
    let audioElement;
    let repeat = false;
    let shuffle = false;
    let mouseDown = false;

    function playSong() {
        const playBtn = document.querySelector(".controlButton.play");
        const pauseBtn = document.querySelector(".controlButton.pause");
        playBtn.style.display = "none";
        pauseBtn.style.display = "inline-block";
        audioElement.play();
    }
    function pauseSong() {
        const playBtn = document.querySelector(".controlButton.play");
        const pauseBtn = document.querySelector(".controlButton.pause");
        playBtn.style.display = "inline-block";
        pauseBtn.style.display = "none";
        audioElement.pause();
    }
    function nextSong() {
        if(repeat == true) {
            audioElement.setTime(0);
            playSong();
            return;
        }
        if(currentIndex == currentPlaylist.length - 1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        let trackToPlay = shuffle ? shufflePlaylist[currentIndex] : currentPlaylist[currentIndex];
        setTrack(trackToPlay, currentPlaylist, true);
    }
    function prevSong() {
        if(audioElement.audio.currentTime >= 3 || currentIndex == 0) {
            audioElement.setTime(0);
        } else {
            currentIndex--;
            let trackToPlay = shuffle ? shufflePlaylist[currentIndex] : currentPlaylist[currentIndex];
            setTrack(trackToPlay, currentPlaylist, true);
        }
    }
    function setTrack(trackId, newPlaylist, play) { 
        if(newPlaylist != currentPlaylist) {
            currentPlaylist = newPlaylist;      
            shufflePlaylist = currentPlaylist.slice();
            shuffleArray(shufflePlaylist);
        }
        if (shuffle == true) {
            currentIndex = shufflePlaylist.indexOf(trackId);
        } else {
            currentIndex = currentPlaylist.indexOf(trackId);
        }
        pauseSong();

        let trackName = document.querySelector(".trackName span");
        trackName.textContent = trackId.title;
        let artistName = document.querySelector(".trackInfo .artistName span");
        artistName.textContent = trackId.artist;
        let albumArt = document.querySelector(".content .albumLink img");
        albumArt.src = "assets/images/artwork/" + trackId.artwork;
        audioElement.setTrack(trackId);
        if(play) {
            playSong();
            //setTimeout(() => playSong(), 80);
        }
    }
    function setShuffle() {
        shuffle = !shuffle;
        let shuffleButton = document.querySelector(".controlButton.shuffle img");
        let shuffleIcon = shuffle ? "shuffle-active.png" : "shuffle.png";
        shuffleButton.setAttribute("src", "assets/images/icons/" + shuffleIcon);

        if(shuffle == true) {
            shuffleArray(shufflePlaylist);
            currentIndex = shufflePlaylist.indexOf(audioElement.currentlyPlaying);
        } else {
            currentIndex = currentPlaylist.indexOf(audioElement.currentlyPlaying);
        }
    }
    function shuffleArray(a) {
        let y, x, z; //y = random pick, x = tmp storage, i = playlist index
        for (z = a.length; z; z--) {
            y = Math.floor(Math.random() * z);
            x = a[z - 1];
            a[z - 1] = a[y];
            a[y] = x;
        }
    }
    function setRepeat() {
        repeat = !repeat;
        let repeatButton = document.querySelector(".controlButton.repeat img");
        let repeatIcon = repeat ? "repeat-active.png" : "repeat.png";
        repeatButton.setAttribute("src", "assets/images/icons/" + repeatIcon);
    }

    function setMute() {
        audioElement.audio.muted = !audioElement.audio.muted;
        let volButton = document.querySelector(".controlButton.volume img");
        let volIcon = audioElement.audio.muted ? "volume-mute.png" : "volume.png";
        volButton.setAttribute("src", "assets/images/icons/" + volIcon);
    }

    // function playFirstSong() {
    //     setTrack(tempPlaylist[0], tempPlaylist, true);
    // }

    function updateVolumeProgressBar(audio) {
        let volume = audio.volume * 100;
        let volCSS = document.querySelector(".volumeBar .progress");
        volCSS.style.width = volume + "%";
    }

    function updateTimeProgressBar(audio) {
        const currTime = document.querySelector(".progressTime.current");
        const remTime = document.querySelector(".progressTime.remaining");
        currTime.textContent = formatTime(audio.currentTime);
        remTime.textContent = formatTime(audio.duration - audio.currentTime);

        const progress = audio.currentTime / audio.duration * 100;
        const progressBar = document.querySelector(".playbackBar .progress");
        progressBar.style.width = progress + "%";
    }

    function formatTime(secs) {
        const time = Math.round(secs);
        const minutes = Math.floor(time / 60);
        const seconds = time - minutes * 60;
        let extraZero = (seconds < 10) ? "0" : "";
        return minutes + ":" + extraZero + seconds;
    }

    function timeFromOffset(mouse, progressBar) {
        const percentage = mouse.offsetX / parseInt(getComputedStyle(progressBar).width) * 100; //optimize later
        const seconds = audioElement.audio.duration * (percentage / 100);
        audioElement.setTime(seconds);
    }

    function addListenerMulti(el, s, fn) {
        s.split(" ").forEach(e => el.addEventListener(e, fn, false));
    }

    function openPage(url) {
            //vanilla javascript/ajax method
        // req = new XMLHttpRequest();
        // req.onreadystatechange = function() {
        //     if(this.readyState == 4 && this.status == 200) {
        //         let content = document.getElementById("mainContent");
        //         content.innerHTML = req.responseText;
        //     }
        // }
        // req.open("GET", url, true);
        // req.send(null);

            //html method
        let content = document.getElementById("mainContent");
        content.innerHTML = "<object data='" + url + "'></object>";
        
    }


    class Audio {
        constructor() {
            this.currentlyPlaying;
            this.audio = document.createElement("audio");
        
            this.audio.addEventListener("ended", () => nextSong());

            this.audio.addEventListener("canplay", function() {
                const duration = formatTime(this.duration);
                document.querySelector(".progressTime.remaining").textContent = duration;
            });

            this.audio.addEventListener("timeupdate", function() {
                if(this.duration) updateTimeProgressBar(this);
            });
        
            this.audio.addEventListener("volumechange", function() {
                updateVolumeProgressBar(this);
            });
        }

        setTrack(track) {
            this.currentlyPlaying = track;
            this.audio.src = "assets/music/" + track.src;
        }
        play() {
            this.audio.play();
        }
        pause() {
            this.audio.pause();
        }
        setTime(seconds) {
            this.audio.currentTime = seconds;
        }

    }

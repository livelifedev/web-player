
    let songDB = ["test_audio.mp3", "test_audio2.mp3", "test_audio3.mp3"];
    let currentPlaylist = [];
    let shufflePlaylist = [];
    let tempPlaylist = [];
    let currentIndex = 0;
    let track = "";
    let audioElement = document.getElementById("currentSong");
    let repeat = false;
    let shuffle = false;
    let mouseDown = false;

    // function getSong(database) { //gets song from database, updates html audio src and track name
    //     //songDB[Math.floor(Math.random() * songDB.length)];
    //     let track = database[0];
    //     audioElement.src = "assets/music/" + track;
    //     let trackName = document.querySelector(".trackName span");
    //     trackName.textContent = track;
    // }
    
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
            audioElement.currentTime = 0;
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
        if(audioElement.currentTime >= 3 || currentIndex == 0) {
            audioElement.currentTime = 0;
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
            track = shufflePlaylist[currentIndex];//
        } else {
            currentIndex = currentPlaylist.indexOf(trackId);
            track = currentPlaylist[currentIndex];//
        }
        pauseSong();
        audioElement.src = "assets/music/" + track;//
        let trackName = document.querySelector(".trackName span");
        trackName.textContent = track;
        let artistName = document.querySelector(".trackInfo .artistName span");
        artistName.textContent = track;
        //let albumName = document.querySelector(".trackInfo .artistName span");
        //trackName.textContent = track;
        if(play) {
            playSong();
        }
    }
    function setShuffle() {
        shuffle = !shuffle;
        let shuffleButton = document.querySelector(".controlButton.shuffle img");
        let shuffleIcon = shuffle ? "shuffle-active.png" : "shuffle.png";
        shuffleButton.setAttribute("src", "assets/images/icons/" + shuffleIcon);

        if(shuffle == true) {
            shuffleArray(shufflePlaylist);
            currentIndex = shufflePlaylist.indexOf(track);
        } else {
            currentIndex = currentPlaylist.indexOf(track);
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
        audioElement.muted = !audioElement.muted;
        let volButton = document.querySelector(".controlButton.volume img");
        let volIcon = audioElement.muted ? "volume-mute.png" : "volume.png";
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
        const seconds = audioElement.duration * (percentage / 100);
        audioElement.currentTime = seconds;
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

            //jQuery method
        // $("#mainContent").load(url);
        
    }


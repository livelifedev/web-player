let songDB = [
    {title: "Sunny Sky", artist: "radBad", album: "Roadblock", artwork: "album1.jpg", src: "test_audio1.mp3", duration: "0:00"}, 
    {title: "Rainbow Redemption", artist: "Sykideric", album: "Dereck", artwork: "album2.jpg", src: "test_audio2.mp3", duration: "0:00"},
    {title: "Alpha Mantis", artist: "Eating Clouds", album: "Papayas", artwork: "album6.jpg", src: "test_audio3.mp3", duration: "0:00"},
    {title: "One Leg Theodore", artist: "Eating Clouds", album: "Papayas", artwork: "album6.jpg", src: "test_audio3.mp3", duration: "0:00"},
    {title: "Reckon Fate", artist: "Jumping Jonas", album: "Junkus", artwork: "album9.jpg", src: "test_audio3.mp3", duration: "0:00"}, 
    {title: "Sandman Haunting", artist: "Purple Vitalia", album: "Opus", artwork: "album12.jpg", src: "test_audio3.mp3", duration: "0:00"},
    {title: "Purple Nurples", artist: "Purple Vitalia", album: "Atari Trip", artwork: "album3.jpg", src: "test_audio1.mp3", duration: "0:00"}  
];
let artists = {}; //{radBad: [{title: "Sunny Sky", …}]
let artistsList = [];
let albums = {}; //{Road block:	[{title: "Sunny Sky", …}]
let albumsList = [];
let songsList = [];

let userPlaylists = [];
if(localStorage.getItem("playlist")) {
    userPlaylists = JSON.parse(localStorage.getItem("playlist"));
};

//Build album data list
for (let y of songDB) {
    if (albums[y.album] == null) {
        albums[y.album] = [y];
        albumsList.push(y.album);
    } else {
        albums[y.album].push(y);
    }
}; 

//Build artist data list
for (let z of songDB) {
    if (artists[z.artist] == null) {
        artists[z.artist] = [z];
        artistsList.push(z.artist);
    } else {
        artists[z.artist].push(z);
    }
}; 

//Build song title list
for (let x of songDB) {
        songsList.push(x.title);
}; 

function setPlaylist() {
    localStorage.setItem("playlist", JSON.stringify(userPlaylists));
}
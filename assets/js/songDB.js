console.log("loaded songDB.js");
let songDB = [
    {title: "Sunny Sky", artist: "radBad", album: "Roadblock", artwork: "album1.jpg", src: "test_audio1.mp3", duration: "0:00"}, 
    {title: "Rainbow Redemption", artist: "Sykideric", album: "Dereck", artwork: "album2.jpg", src: "test_audio2.mp3", duration: "0:00"},
    {title: "Alpha Mantis", artist: "Eating Clouds", album: "Papayas", artwork: "album6.jpg", src: "test_audio3.mp3", duration: "0:00"},
    {title: "One Leg Theodore", artist: "Eating Clouds", album: "Papayas", artwork: "album6.jpg", src: "test_audio3.mp3", duration: "0:00"},
    {title: "Reckon Fate", artist: "Jumping Jonas", album: "Junkus", artwork: "album9.jpg", src: "test_audio3.mp3", duration: "0:00"}, 
    {title: "Sandman Haunting", artist: "Purple Vitalia", album: "Opus", artwork: "album12.jpg", src: "test_audio3.mp3", duration: "0:00"} 
];

let albums = {}; //Maybe use the Map data structure instead, so it can be iterated
let albumsList = [];

let userPlaylists = [
    {name: "Playlist 1", songs: []},
    {name: "Playlist 2", songs: []},
    {name: "Playlist 3", songs: []}
];

for (let y of songDB) {
    if (albums[y.album] == null) {
        //still need to add char filter for name
        albums[y.album] = [y];
        albumsList.push(y.album);
    } else {
        albums[y.album].push(y);
    }
};
console.log(albums); //{Road block:	[{title: "Sunny Sky", …}]


function shuffleArray(a) {
    let y, x, z; //y = random pick, x = tmp storage, i = playlist index
    for (z = a.length; z; z--) {
        y = Math.floor(Math.random() * z);
        x = a[z - 1];
        a[z - 1] = a[y];
        a[y] = x;
    }
}
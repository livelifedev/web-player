let songDB = [
    {title: "Sunny Sky", artist: "radBad", album: "Roadblock", artwork: "album1.jpg", src: "test_audio1.mp3", duration: "0:32"}, 
    {title: "Rainbow Redemption", artist: "Sykideric", album: "Dereck", artwork: "album2.jpg", src: "test_audio2.mp3", duration: "0:26"},
    {title: "Alpha Mantis", artist: "Eating Clouds", album: "Papayas", artwork: "album6.jpg", src: "test_audio3.mp3", duration: "0:45"},
    {title: "One Leg Theodore", artist: "Eating Clouds", album: "Papayas", artwork: "album6.jpg", src: "test_audio3.mp3", duration: "0:45"},
    {title: "Reckon Fate", artist: "Jumping Jonas", album: "Junkus", artwork: "album9.jpg", src: "test_audio3.mp3", duration: "0:45"}, 
    {title: "Sandman Haunting", artist: "Purple Vitalia", album: "Opus", artwork: "album12.jpg", src: "test_audio2.mp3", duration: "0:26"},
    {title: "Purple Nurples", artist: "Purple Vitalia", album: "Atari Trip", artwork: "album3.jpg", src: "test_audio1.mp3", duration: "0:32"},
    {title: "Aardvark Gabba", artist: "radBad", album: "Roadblock", artwork: "album1.jpg", src: "test_audio2.mp3", duration: "0:26"}, 
    {title: "Stormpiper Trooper", artist: "Sykideric", album: "Dereck", artwork: "album2.jpg", src: "test_audio3.mp3", duration: "0:45"},
    {title: "Theta Whale", artist: "Eating Clouds", album: "Papayas", artwork: "album6.jpg", src: "test_audio1.mp3", duration: "0:32"},
    {title: "Pirate Flamingo", artist: "Eating Clouds", album: "Papayas", artwork: "album6.jpg", src: "test_audio2.mp3", duration: "0:26"},
    {title: "Pommus Pommul", artist: "Jumping Jonas", album: "Junkus", artwork: "album9.jpg", src: "test_audio1.mp3", duration: "0:32"}, 
    {title: "Booger Man Booger", artist: "Purple Vitalia", album: "Opus", artwork: "album12.jpg", src: "test_audio3.mp3", duration: "0:45"},
    {title: "Smurf Grape", artist: "Purple Vitalia", album: "Atari Trip", artwork: "album3.jpg", src: "test_audio2.mp3", duration: "0:26"},
    {title: "Jaaris Atari", artist: "radBad", album: "Roadblock", artwork: "album1.jpg", src: "test_audio3.mp3", duration: "0:45"}, 
    {title: "Slow Roast", artist: "Sunday Barb", album: "Pork-u-Pine", artwork: "album4.jpg", src: "test_audio2.mp3", duration: "0:26"},
    {title: "VB Marinate", artist: "Sunday Barb", album: "Pork-u-Pine", artwork: "album4.jpg", src: "test_audio3.mp3", duration: "0:45"},
    {title: "Pineapple Stuffing", artist: "Sunday Barb", album: "Pork-u-Pine", artwork: "album4.jpg", src: "test_audio3.mp3", duration: "0:45"},
    {title: "Citadel", artist: "Hunting Toppilus", album: "Maverick", artwork: "album5.jpg", src: "test_audio3.mp3", duration: "0:45"}, 
    {title: "Crud Bucket", artist: "Garage Grommet", album: "Zoot", artwork: "album7.jpg", src: "test_audio2.mp3", duration: "0:26"},
    {title: "Scratch My Car", artist: "Purple Vitalia", album: "Itch", artwork: "album8.jpg", src: "test_audio1.mp3", duration: "0:32"},
    {title: "Zachary", artist: "radBad", album: "Finalia", artwork: "album10.jpg", src: "test_audio2.mp3", duration: "0:26"}, 
    {title: "Pumping Gutters", artist: "radBad", album: "Finalia", artwork: "album10.jpg", src: "test_audio3.mp3", duration: "0:45"},
    {title: "King of Atlantis", artist: "Aqua Dude", album: "Sea Men", artwork: "album11.jpg", src: "test_audio1.mp3", duration: "0:32"},
    {title: "Fish N Chips", artist: "Aqua Dude", album: "Sea Men", artwork: "album11.jpg", src: "test_audio2.mp3", duration: "0:26"},
    {title: "Step On Lego", artist: "Jumping Jonas", album: "Junkus", artwork: "album9.jpg", src: "test_audio3.mp3", duration: "0:45"}, 
    {title: "Lemon Juice", artist: "Purple Vitalia", album: "Opus", artwork: "album12.jpg", src: "test_audio1.mp3", duration: "0:32"},
    {title: "Kangaro Ooster", artist: "Garage Grommet", album: "Zoot", artwork: "album7.jpg", src: "test_audio2.mp3", duration: "0:26"}    
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
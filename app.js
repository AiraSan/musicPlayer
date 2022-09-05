// DOM Selectors

const current = document.querySelector("#current");
const count = document.querySelector("#count");
const menu = document.querySelector("#menu");
const navList = document.querySelector("#nav-list");
const title = document.querySelector("#title");
const singer = document.querySelector("#singer");
const poster = document.querySelector("#poster");
const prev = document.querySelector("#prev");
const play = document.querySelector("#play");
const next = document.querySelector("#next");
const range = document.querySelector("#range");
const currentTime = document.querySelector("#currentTime");
const durationTime = document.querySelector("#durationTime");

// Global Variables

let musics = [
    {
        id : 1,
        title : "Lu Pyouk Kyw Nyar",
        singer : "Jixk Gabby",
        img_path : "img/1.png",
        music_path : "music/1.mp3"
    },
    {
        id : 2,
        title : "Min Namal Nat A Soe Ya",
        singer : "Jixk Gabby",
        img_path : "img/2.jpeg",
        music_path : "music/2.mp3"
    },
    {
        id : 3,
        title : "Oh Jesus Beautiful Troubles",
        singer : "Jixk Gabby",
        img_path : "img/3.png",
        music_path : "music/3.mp3"
    },
    {
        id : 4,
        title : "I saw u in my dream",
        singer : "Zenith",
        img_path : "img/4.png",
        music_path : "music/4.mp3"
    },
    {
        id : 5,
        title : "Elody",
        singer : "Adjustor & Floke Rose",
        img_path : "img/5.jpeg",
        music_path : "music/5.mp3"
    },
    {
        id : 6,
        title : "Min A Twat Ngar",
        singer : "Shine",
        img_path : "img/6.jpeg",
        music_path : "music/6.mp3"
    }
];

let playing = false;
let index = 0;

const track = document.createElement("audio");

// Load Track 

function loadTrack(index){
    title.innerHTML = musics[index].title;
    singer.innerHTML = musics[index].singer;
    poster.src = musics[index].img_path;
    track.src = musics[index].music_path;

    durationTime.textContent = track.duration;
    currentTime.textContent = track.currentTime;

    track.load();

    current.innerHTML = musics[index].id;
    count.innerHTML = musics.length;
    
    setInterval(trackCurrentTime, 1000);
}

loadTrack(index);

// Check Play or Pause

function check(){
    playing ? justPause() : justPlay();
}

// Play function

function justPlay(){
    play.className = "fas fa-pause";
    playing = true;
    track.play();
}

// Pause Function

function justPause(){
    play.className = "fas fa-play";
    playing = false;
    track.pause();
}

// Prev Song

function prevFunc(){
    if(index <= 0) index = musics.length - 1;
    else index--;
    loadTrack(index);

    playing = false;
    check();
}

//  Next Song

function nextFunc(){
    if(index > musics.length - 1) index = 0;
    else index++;
    loadTrack(index);

    playing = false;
    check();
}

// Dynamic Slider

function trackCurrentTime(){
    range.value = track.currentTime * (100 / track.duration);
    if(track.ended) nextFunc();

    currentTime.innerHTML = formatTime(track.currentTime);
    durationTime.innerHTML = formatTime(track.duration);
}

// Dynamic Range

function changeRange(){
    track.currentTime = track.duration * (range.value / 100);
}

// Nav List Toggle

function menuToggle(){
    navList.classList.toggle("nav-list-active");
    menu.classList.toggle("fa-times");
}

// Fetch Music

musics.map((music, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
        <div>
            <h3>${music.title}</h3>
            <p>${music.singer}</p>
        </div>
        <i class="trackSingle ${index} fas fa-play" id="playSingle"></i>
    `;

    navList.appendChild(li);
})

// Load Single Song

function loadSingleSong(e){
    if(e.target.classList.contains("fa-play") && e.target.classList.contains("trackSingle")){
        loadTrack(e.target.classList[1]);

        playing = false;
        check();

        Array.from(navList.children).forEach(el => {
            el.lastElementChild.classList.remove("fa-pause");
            el.lastElementChild.classList.add("fa-play");
        })

        e.target.classList.add("fa-pause");
        e.target.classList.remove("fa-play");
    }
    else if(e.target.classList.contains("fa-pause") && e.target.classList.contains("trackSingle")){
        playing = true;
        check();

        e.target.classList.add("fa-play");
        e.target.classList.remove("fa-pause");
    }
    else{
        navList.classList.toggle("nav-list-active");
        menu.classList.toggle("fa-times");
    }
}

// Format Duration

function formatTime(sec) {
    let minutes = Math.floor(sec / 60);
    let seconds = Math.floor(sec - minutes * 60);
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
}


// Event Listener
play.addEventListener('click',check);
prev.addEventListener('click',prevFunc);
next.addEventListener('click',nextFunc);
range.addEventListener('change',changeRange);
menu.addEventListener("click",menuToggle);
navList.addEventListener('click',loadSingleSong)
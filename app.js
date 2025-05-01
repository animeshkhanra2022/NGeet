// Your existing selectors and player logic...
const searchInput = document.querySelector(".search input");
const masterPlayIcon = document.querySelector(".bi-play-fill") || document.querySelector(".bi-pause-fill");
const prevBtn = document.querySelector(".bi-skip-start-fill");
const nextBtn = document.querySelector(".bi-skip-end-fill");
const downloadBtn = document.getElementById("download_music");
const poster = document.getElementById("poster_master_play");
const title = document.getElementById("title");
const subtitle = title.querySelector(".subtitle");
const seekBar = document.getElementById("seek");
const currentStart = document.getElementById("currentstart");
const currentEnd = document.getElementById("currentend");
const bar2 = document.getElementById("bar2");
const dot = document.querySelector(".bar .dot");
const volume = document.getElementById("vol");
const volBar = document.querySelector(".vol_bar");
const volDot = document.getElementById("vol_dot");
const volIcon = document.getElementById("vol_icon");
const wave = document.querySelector(".wave");
const menuSong = document.querySelector(".menu_song");
const mainPlayBtn = document.getElementById("mainPlay");
const mainFollowBtn = document.getElementById("mainFollow");

const tabPlaylist = document.getElementById("tab-playlist");
const tabLast = document.getElementById("tab-last");
const tabRecommended = document.getElementById("tab-recommended");
const shuffleBtn = document.querySelector(".shuffle");

const songs = [
  { title: "Namo Namo", artist: "Arijit Singh", src: "audio/Namo Namo.mp3", img: "images/download (3).jpeg" },
  { title: "Tum Hi Ho", artist: "Arijit Singh", src: "audio/Tum Hi Ho - Aashiqui 2 320 Kbps.mp3", img: "images/download.jpg" },
  { title: "Kesariya", artist: "Arijit Singh", src: "audio/Kesariya Brahmastra 320 Kbps.mp3", img: "images/download (2).jpg" },
  { title: "Raabta", artist: "Arijit Singh", src: "audio/Raabta - Agent Vinod 320 Kbps.mp3", img: "images/download (1).jpg" },
  { title: "Hamari Adhuri Kahani", artist: "Arijit Singh", src: "audio/01 Hamari Adhuri Kahani (Title Song) Arijit Singh 320Kbps.mp3", img: "images/download (3).jpg" },
  { title: "Humsafar", artist: "Arijit Singh", src: "audio/Humsafar (Badrinath Ki Dulhania) 128 Kbps.mp3", img: "images/download (4).jpg" },
  { title: "Ei Bhalo Ei Kharap", artist: "Arijit Singh", src: "audio/Ei Bhalo Ei Kharap Prem Mane - Male- [PagalWorld.NL].mp3", img: "images/download (5).jpg" },
  { title: "Deva Deva", artist: "Arijit Singh", src: "audio/Deva Deva Brahmastra 128 Kbps.mp3", img: "images/download (6).jpg" },
  { title: "Jaan Ban Gaye", artist: "Arijit Singh", src: "audio/Jaan Ban Gaye Reprise - Khuda Haafiz.mp3", img: "images/download (7).jpg" },
  { title: "Apna Bana Le", artist: "Arijit Singh", src: "audio/Apna Bana Le(PagalWorld).mp3", img: "images/download (8).jpg" },
  { title: "Abar Phire Ele", artist: "Arijit Singh", src: "audio/Abar Phire Ele Arijit Singh_128-(PagalWorld.uk).mp3", img: "images/download (9).jpg" },
  { title: "Nazar Na Lag Jaaye", artist: "Sachin-Jigar", src: "audio/03 Nazar Na Lag Jaaye - Stree.mp3", img: "images/download (11).jpg" },
  { title: "Dekha_Hazaro_Dafaa", artist: "Arijit Singh", src: "audio/04_-_Dekha_Hazaro_Dafaa.mp3", img: "images/download (10).jpg" },
  { title: "Tumse Hi", artist: "Mohit Chauhan", src: "audio/02. Tumse Hi.mp3", img: "images/download (12).jpg" },
  { title: "Ghar Se Nikalte Hi", artist: "Udit Narayan", src: "audio/Ghar Se Nikalte - Papa Kehte Hain 128 Kbps.mp3", img: "images/download (4).jpeg" },
  { title: "Abhi Kuch Dino Se", artist: "Mohit Chauhan", src: "audio/Abhi Kuch Dino Se Dil Toh Baccha Hai Ji 128 Kbps.mp3", img: "images/download (12).jpeg" },
  { title: "Tu Hi Junoon", artist: "Mohit Chauhan", src: "audio/Tu Hi Junoon Dhoom 3 128 Kbps.mp3", img: "images/download (13).jpeg" },
  { title: "Barfi", artist: "Mohit Chauhan", src: "audio/Barfi Mohit Chauhan 128 Kbps.mp3", img: "images/download (14).jpeg" },
  { title: "Bheegi Si Bhaagi Si", artist: "Mohit Chauhan", src: "audio/Bheegi Si Bhaagi Si Raajneeti 128 Kbps.mp3", img: "images/download (15).jpeg" },
];

const artists = {
  "Arijit Singh": {
    bio: "Arijit Singh is one of the most versatile and successful playback singers in India. Known for his soulful voice and romantic songs.",
    image: "images/arjit.jpg"
  },
  "Mohit Chauhan": {
    bio: "Mohit Chauhan is known for his soft rock and Bollywood hits. Former frontman of the band Silk Route.",
    image: "images/download (1).jpeg"
  },
  "Sachin-Jigar": {
    bio: "Sachin–Jigar is a music composing duo known for their energetic and catchy Bollywood compositions.",
    image: "images/download (2).jpeg"
  },
  "Udit Narayan": {
    bio: " Udit Narayan is an established Indian playback singer who works in Bollywood and whose songs have been featured mainly in Bollywood movies",
    image: "images/download (5).jpeg"
  },
  "Shreya Ghoshal": {
    bio:"Shreya Ghoshal is an Indian singer. Noted for her wide vocal range and versatility, she is one of the most prolific and influential singers of India.",
    image: "images/download (9).jpeg"
  },
  "Honey Singh": {
    bio: " Hirdesh 'Honey' Singh (born 15 March 1983), known professionally as Yo Yo Honey Singh, is an Indian singer and music producer.",
    image: "images/download (10).jpeg"
  },
  "Kishore Kumar": {
    bio: "Kishore Kumar was an Indian playback singer, musician and actor.",
    image: "images/download (7).jpeg"
  },
  "Rahat Fateh Ali Khan": {
    bio: "Rahat Fateh Ali Khan is a Pakistani singer, primarily Qawwali, a form of Sufi devotional music.",
    image: "images/download (8).jpeg"
  },
  "Lata Mangeshkar": {
    bio: "Lata Mangeshkar was an Indian playback singer and occasional music composer.",
    image: "images/download (6).jpeg"
  },
  "Ed Sheeran": {
    bio: "Edward Christopher Sheeran is an English singer-songwriter.",
    image: "images/download (11).jpeg"
  },
  "Alan Walker": {
    bio: "Alan Olav Walker (born 24 August 1997) is a Norwegian DJ and record producer.",
    image: "images/alan.jpeg"
  },
  "Asha Bhosle": {
    bio: "Asha Bhosle is an Indian playback singer, entrepreneur, actress and television personality who predominantly works in Indian cinema.",
    image: "images/download (16).jpeg"
  },
  "Sonu Nigam": {
    bio: "Sonu Nigam is an established playback singer, composer, live performer, host, and actor of Bollywood and known for his distinct style and versatile voice.",
    image: "images/download (17).jpeg"
  },
  "Kumar Sanu": {
    bio: "Kedarnath Bhattacharya (born 20 October 1957), professionally known as Kumar Sanu, is a leading Indian playback singer who primarily sings in Hindi film songs.",
    image: "images/download (17).jpeg"
  },
  "KK": {
    bio: "Krishnakumar Kunnath (23 August 1968 – 31 May 2022), popularly known as KK, was an Indian playback singer.",
    image: "images/download (17).jpeg"
  },
};

function showArtistDetails(artistName) {
  const artist = artists[artistName];
  if (!artist) return;

  // Update bio and name
  document.getElementById("artistName").textContent = artistName;
  document.getElementById("artistBio").textContent = artist.bio;

  // Filter and show songs by the artist
  const artistSongs = songs.filter(song => song.artist === artistName);
  renderSongs(artistSongs);
}


let isShuffle = false;
let lastPlayed = [];
const maxRecent = 5;
const recommendedSongs = [];

let currentSong = 0;
let audio = new Audio(songs[currentSong].src);

// Player logic...
function updatePlayer(index) {
  const song = songs[index];
  title.childNodes[0].nodeValue = song.title;
  subtitle.textContent = song.artist;
  poster.src = song.img;
  audio.src = song.src;
  audio.pause();
  masterPlayIcon.classList.remove("bi-pause-fill");
  masterPlayIcon.classList.add("bi-play-fill");
  wave.classList.remove("active1");

  if (!lastPlayed.some(s => s.title === song.title)) {
    lastPlayed.unshift(song);
    if (lastPlayed.length > maxRecent) lastPlayed.pop();
  }
  updateRecommended();
}

function updateRecommended() {
  const pool = songs.filter(song => !lastPlayed.some(recent => recent.title === song.title));
  const shuffled = pool.sort(() => 0.5 - Math.random());
  recommendedSongs.length = 0;
  recommendedSongs.push(...shuffled.slice(0, 5));
}

function playNextSong() {
  currentSong = (currentSong + 1) % songs.length;
  updatePlayer(currentSong);
  audio.play();
  masterPlayIcon.classList.replace("bi-play-fill", "bi-pause-fill");
  wave.classList.add("active1");
}

function playRandomSong() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * songs.length);
  } while (randomIndex === currentSong);
  currentSong = randomIndex;
  updatePlayer(currentSong);
  audio.play();
  masterPlayIcon.classList.replace("bi-play-fill", "bi-pause-fill");
  wave.classList.add("active1");
}

masterPlayIcon.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    masterPlayIcon.classList.replace("bi-play-fill", "bi-pause-fill");
    wave.classList.add("active1");
  } else {
    audio.pause();
    masterPlayIcon.classList.replace("bi-pause-fill", "bi-play-fill");
    wave.classList.remove("active1");
  }
});

prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  updatePlayer(currentSong);
});
nextBtn.addEventListener("click", () => {
  playNextSong();
});
shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle("active");
  shuffleBtn.textContent = isShuffle ? "shuffle" : "next";
});
downloadBtn.addEventListener("click", () => {
  const a = document.createElement("a");
  a.href = songs[currentSong].src;
  a.download = songs[currentSong].title + ".mp3";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

setInterval(() => {
  let current = audio.currentTime;
  let duration = audio.duration;

  if (!isNaN(duration)) {
    let progress = (current / duration) * 100;
    seekBar.value = progress;
    bar2.style.width = `${progress}%`;
    dot.style.left = `${progress}%`;

    let currentMin = Math.floor(current / 60);
    let currentSec = Math.floor(current % 60).toString().padStart(2, '0');
    let durationMin = Math.floor(duration / 60);
    let durationSec = Math.floor(duration % 60).toString().padStart(2, '0');

    currentStart.textContent = `${currentMin}:${currentSec}`;
    currentEnd.textContent = `${durationMin}:${durationSec}`;
  }
}, 500);

seekBar.addEventListener("input", () => {
  if (!isNaN(audio.duration)) {
    audio.currentTime = (seekBar.value / 100) * audio.duration;
  }
});

volume.addEventListener("input", () => {
  audio.volume = volume.value / 100;
  volBar.style.width = `${volume.value}%`;
  volDot.style.left = `${volume.value}%`;

  if (volume.value == 0) volIcon.className = "bi bi-volume-mute";
  else if (volume.value < 50) volIcon.className = "bi bi-volume-down";
  else volIcon.className = "bi bi-volume-up";
});

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  // Limit search filtering to the Playlist section only
  const playlistItems = document.querySelectorAll(".menu_song .songItem");
  playlistItems.forEach((item) => {
    const songName = item.querySelector("h5").textContent.toLowerCase();
    item.style.display = songName.includes(value) ? "flex" : "none";
  });
});


function renderSongs(songList) {
  currentPlaylist = songList;
  menuSong.innerHTML = "";
  songList.forEach((song, idx) => {
    const li = document.createElement("li");
    li.classList.add("songItem");
    li.innerHTML = `
      <span>${(idx + 1).toString().padStart(2, '0')}</span>
      <img src="${song.img}" alt="">
      <h5>${song.title} <br><div class="subtitle">${song.artist}</div></h5>
      <i class="bi playlistplay bi-play-circle-fill" id="${idx}"></i>
    `;
    menuSong.appendChild(li);
  });

  document.querySelectorAll(".playlistplay").forEach((icon, idx) => {
    icon.addEventListener("click", () => {
      const selectedSong = currentPlaylist[idx];
      currentSong = songs.findIndex(song => song.title === selectedSong.title && song.artist === selectedSong.artist);
      updatePlayer(currentSong);
      audio.play();
      masterPlayIcon.classList.replace("bi-play-fill", "bi-pause-fill");
      wave.classList.add("active1");
    });
  });
  
}

function setActiveTab(selected) {
  [tabPlaylist, tabLast, tabRecommended].forEach(tab => tab.classList.remove("active"));
  if (selected) selected.classList.add("active");
}

tabPlaylist.addEventListener("click", () => {
  setActiveTab(tabPlaylist);
  renderSongs(songs);
});
tabLast.addEventListener("click", () => {
  setActiveTab(tabLast);
  renderSongs(lastPlayed);
});
tabRecommended.addEventListener("click", () => {
  setActiveTab(tabRecommended);
  renderSongs(recommendedSongs);
});
mainPlayBtn.addEventListener("click", () => {
  const artistName = document.getElementById("artistName").textContent.trim();
  const artistSongs = songs.filter(song => song.artist === artistName);

  if (artistSongs.length > 0) {
    const selectedSong = artistSongs[0];
    currentSong = songs.findIndex(song => song.title === selectedSong.title && song.artist === selectedSong.artist);
    updatePlayer(currentSong);
    audio.play();
    masterPlayIcon.classList.replace("bi-play-fill", "bi-pause-fill");
    wave.classList.add("active1");
  } else {
    alert("No songs found for " + artistName);
  }
});
mainFollowBtn.addEventListener("click", () => {
  alert("You are now following Arijit Singh!");
});

const myLibrarySongs = [songs[0], songs[3]];
const myLibraryBtn = document.getElementById("myLibraryBtn");
myLibraryBtn.addEventListener("click", () => {
  setActiveTab(null);
  renderSongs(myLibrarySongs);
});

// Popular scroll buttons
const popSongContainer = document.querySelector(".pop_song");
document.getElementById("pop_song_left").addEventListener("click", () => {
  popSongContainer.scrollBy({ left: -300, behavior: "smooth" });
});
document.getElementById("pop_song_right").addEventListener("click", () => {
  popSongContainer.scrollBy({ left: 300, behavior: "smooth" });
});

const popArtContainer = document.querySelector(".popular_artists .items");
document.getElementById("pop_art_left").addEventListener("click", () => {
  popArtContainer.scrollBy({ left: -300, behavior: "smooth" });
});
document.getElementById("pop_art_right").addEventListener("click", () => {
  popArtContainer.scrollBy({ left: 300, behavior: "smooth" });
});

document.querySelectorAll(".popular_artists .items li img").forEach(img => {
  img.addEventListener("click", () => {
    const altText = img.alt || "Arijit Singh"; // fallback if alt is missing
    showArtistDetails(altText);
  });
});

function fetchPopularSongs() {
  const container = document.getElementById("popularSongsContainer");
  container.innerHTML = ""; // Clear previous content

  const topSongs = songs.sort(() => 0.5 - Math.random()).slice(0, 10);

  topSongs.forEach((song, index) => {
    const li = document.createElement("li");
    li.className = "songItem";
    li.innerHTML = `
      <div class="img_play">
        <img src="${song.img}" alt="${song.title}">
        <i class="bi playlistplay bi-play-circle-fill" id="pop-${index}"></i>
      </div>
      <h5>${song.title}<br><div class="subtitle">${song.artist}</div></h5>
    `;
    container.appendChild(li);
  });

  // Attach click listeners to dynamically generated play buttons
  document.querySelectorAll(".pop_song .playlistplay").forEach((icon, idx) => {
    icon.addEventListener("click", () => {
      const selected = topSongs[idx];
      currentSong = songs.findIndex(s => s.title === selected.title && s.artist === selected.artist);
      updatePlayer(currentSong);
      audio.play();
      masterPlayIcon.classList.replace("bi-play-fill", "bi-pause-fill");
      wave.classList.add("active1");
    });
  });
}

document.getElementById("refresh_pop_songs").addEventListener("click", fetchPopularSongs);


// 🎬 Initialize
updatePlayer(currentSong);
renderSongs(songs);
updateRecommended();
fetchPopularSongs();
fetchPopularArtists();

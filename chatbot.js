const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const audioPlayer = document.getElementById("audio-player");
let lastQueryContext = null;

function handleKey(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
}

function sendMessage() {
  const input = userInput.value.trim();
  if (input === "") return;

  appendMessage("user", input);
  const lower = input.toLowerCase();

  if (lower === "pause") {
    stopAllAudio();
    appendMessage("bot", "⏸️ Song paused.");
  } else if (lower === "play") {
    audioPlayer.play();
    appendMessage("bot", "▶️ Song resumed.");
  } else if (lower === "stop") {
    stopAllAudio(true);
    appendMessage("bot", "⏹️ Song stopped.");
  } else if (lower === "mute") {
    audioPlayer.muted = true;
    appendMessage("bot", "🔇 Song muted.");
  } else if (lower === "unmute") {
    audioPlayer.muted = false;
    appendMessage("bot", "🔊 Song unmuted.");
  } else if (lower.startsWith("volume")) {
    const volumeValue = parseInt(lower.split(" ")[1]);
    if (!isNaN(volumeValue) && volumeValue >= 0 && volumeValue <= 100) {
      audioPlayer.volume = volumeValue / 100;
      appendMessage("bot", `🔊 Volume set to ${volumeValue}%`);
      const volSlider = document.getElementById("volume-slider");
      if (volSlider) volSlider.value = volumeValue;
    } else {
      appendMessage("bot", "⚠️ Please provide volume between 0 and 100.");
    }
  } else if (["more like this", "similar songs"].some(p => lower.includes(p)) && lastQueryContext) {
    getMusicRecommendations(lastQueryContext);
  } else {
    getMusicRecommendations(lower);
  }

  userInput.value = "";
}

function appendMessage(sender, content, isHTML = false) {
  const msg = document.createElement("div");
  msg.className = sender;
  msg[isHTML ? "innerHTML" : "textContent"] = content;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function stopAllAudio(reset = false) {
  document.querySelectorAll("audio").forEach(audio => {
    audio.pause();
    if (reset) audio.currentTime = 0;
  });
}

function getMusicRecommendations(query) {
  appendMessage("bot", "Searching Results for: " + query);
  lastQueryContext = query;

  const moodMap = {
    sad: "sad songs",
    happy: "happy songs",
    romantic: "romantic songs",
    party: "party hits",
    chill: "chill tracks",
    arijit: "arijit singh"
  };

  for (let key in moodMap) {
    if (query.includes(key)) {
      query = moodMap[key];
      break;
    }
  }

  fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=5`)
    .then((res) => res.json())
    .then((data) => {
      if (!data.results || data.results.length === 0) {
        appendMessage("bot", "No songs found. Try another keyword.");
        return;
      }

      stopAllAudio(true); // Stop previous previews before showing new ones

      let html = "<strong>🎵 Songs Found:</strong><br><br>";
      data.results.forEach((track, index) => {
        html += `
          <div class="song-card">
            <img src="${track.artworkUrl100}" alt="Artwork">
            <div class="info">
              <div class="title">${track.trackName}</div>
              <div class="artist">${track.artistName}</div>
              <audio src="${track.previewUrl}" controls class="preview-audio"></audio>
            </div>
          </div>
        `;
      });

      appendMessage("bot", html, true);

      // Add event listeners to stop all other audio
      setTimeout(() => {
        const previews = document.querySelectorAll(".preview-audio");
        previews.forEach(audio => {
          audio.addEventListener("play", () => {
            previews.forEach(a => {
              if (a !== audio) a.pause();
            });
          });
        });
      }, 100); // delay to ensure DOM is updated
    })
    .catch((err) => {
      console.error(err);
      appendMessage("bot", "Something went wrong while searching.");
    });
}

window.onload = function () {
  appendMessage(
    "bot",
    `👋 Hello! Welcome to NGeet...<br>
    🎵 Ask me to play songs by artist, mood, or genre.<br>
    Try: <em>"Play romantic songs"</em>, <em>"Show Arijit tracks"</em>, or <em>"Party hits"</em><br>
    🗣️ Commands: <code>play</code>, <code>pause</code>, <code>stop</code>, <code>volume 70</code>, <code>mute</code>, <code>unmute</code>`,
    true
  );
};

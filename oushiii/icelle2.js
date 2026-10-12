
const songCards = document.querySelectorAll(".song-card");

songCards.forEach(card => {
    const audio = card.querySelector(".song");
    const playBtn = card.querySelector(".play-btn");
    const progress = card.querySelector(".progress-bar");
    const currentTime = card.querySelector(".current-time");
    const duration = card.querySelector(".duration");
    const volumeBtn = card.querySelector(".volume-btn");

    function formatTime(seconds) {
        if (!Number.isFinite(seconds)) return "0:00";

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
    }

    playBtn.addEventListener("click", () => {
        if (audio.paused) {
            songCards.forEach(otherCard => {
                const otherAudio = otherCard.querySelector(".song");

                if (otherAudio !== audio) {
                    otherAudio.pause();
                }
            });

            audio.play().catch(error => {
                console.error("Could not play audio:", error);
            });
        } else {
            audio.pause();
        }
    });

    audio.addEventListener("play", () => {
        playBtn.textContent = "Ⅱ";
        playBtn.setAttribute("aria-label", "Pause song");
    });

    audio.addEventListener("pause", () => {
        playBtn.textContent = "▶";
        playBtn.setAttribute("aria-label", "Play song");
    });

    audio.addEventListener("loadedmetadata", () => {
        duration.textContent = formatTime(audio.duration);
    });

    audio.addEventListener("timeupdate", () => {
        currentTime.textContent = formatTime(audio.currentTime);

        if (Number.isFinite(audio.duration) && audio.duration > 0) {
            progress.value = (audio.currentTime / audio.duration) * 100;
        }
    });

    progress.addEventListener("input", () => {
        if (Number.isFinite(audio.duration) && audio.duration > 0) {
            audio.currentTime = (progress.value / 100) * audio.duration;
        }
    });

    volumeBtn.addEventListener("click", () => {
        audio.muted = !audio.muted;

        volumeBtn.textContent = audio.muted ? "×" : "♫";
        volumeBtn.setAttribute(
            "aria-label",
            audio.muted ? "Unmute song" : "Mute song"
        );
    });

    audio.addEventListener("ended", () => {
        progress.value = 0;
        currentTime.textContent = "0:00";
    });
});

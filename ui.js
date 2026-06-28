class UI {
    constructor() {
        this.panel = document.getElementById("infoPanel");

        this.title = document.getElementById("songTitle");
        this.genre = document.getElementById("songGenre");

        this.moodBar = document.getElementById("moodBar");
        this.energyBar = document.getElementById("energyBar");
        this.tempoBar = document.getElementById("tempoBar");

        this.playBtn = document.getElementById("playPreview");
        this.closeBtn = document.getElementById("close");

        this.currentSong = null;

        this.bindEvents();
    }

    bindEvents() {
        this.closeBtn.addEventListener("click", () => {
            this.hide();
        });

        this.playBtn.addEventListener("click", () => {
            if (!this.currentSong?.preview) return;

            const audio = document.getElementById("audio");
            audio.src = this.currentSong.preview;
            audio.play();

            setTimeout(() => {
                audio.pause();
            }, 10000);
        });
    }

    show(song) {
        this.currentSong = song;

        this.title.textContent = song.title;
        this.genre.textContent = song.genre || "Unknown genre";

        // normalize values (0-1 → %)
        const mood = song.valence * 100;
        const energy = song.energy * 100;
        const tempo = Math.min(song.tempo / 200, 1) * 100;

        this.moodBar.style.width = mood + "%";
        this.energyBar.style.width = energy + "%";
        this.tempoBar.style.width = tempo + "%";

        this.panel.classList.remove("hidden");
    }

    hide() {
        this.panel.classList.add("hidden");
        this.currentSong = null;
    }
}

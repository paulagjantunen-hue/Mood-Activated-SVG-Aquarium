class UI {
    constructor() {
        this.panel = document.getElementById("infoPanel");
        this.closeBtn = document.getElementById("close");
        this.titleEl = document.getElementById("songTitle");
        this.genreEl = document.getElementById("songGenre");
        this.moodBar = document.getElementById("moodBar");
        this.energyBar = document.getElementById("energyBar");
        this.tempoBar = document.getElementById("tempoBar");
        this.previewBtn = document.getElementById("playPreview");
        this.audio = document.getElementById("audio");
        this.currentSong = null;

        this.closeBtn.addEventListener("click", () => this.hide());
        this.previewBtn.addEventListener("click", () => this.playPreview());
    }

    show(song) {
        this.currentSong = song;
        this.titleEl.textContent = song.title;
        this.genreEl.textContent = song.genre || "Unknown genre";
        this.moodBar.style.width = `${Math.min(Math.max(song.valence || 0, 0), 1) * 100}%`;
        this.energyBar.style.width = `${Math.min(Math.max(song.energy || 0, 0), 1) * 100}%`;
        this.tempoBar.style.width = `${Math.min((song.tempo || 0) / 200, 1) * 100}%`;
        this.panel.classList.remove("hidden");
    }

    hide() {
        this.panel.classList.add("hidden");
    }

    playPreview() {
        if (!this.currentSong || !this.currentSong.preview) return;
        this.audio.src = this.currentSong.preview;
        this.audio.play();
        setTimeout(() => this.audio.pause(), 10000);
    }
}

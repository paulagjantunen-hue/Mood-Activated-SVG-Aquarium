(function() {
    const fish = document.querySelector('.fish') || document.getElementById('fish');
    const audio = window.audio || new Audio();
    const song = window.song || null;

    if (!fish) return;

    fish.addEventListener('click', () => {
        if (!song || !song.previewUrl) {
            console.warn('No song.previewUrl available to play');
            return;
        }

        audio.src = song.previewUrl;
        audio.play();

        setTimeout(() => {
            audio.pause();
        }, 10000);
    });
})();
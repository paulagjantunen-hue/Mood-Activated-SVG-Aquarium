import { Aquarium } from "./aquarium/Aquarium.js";
import { UI } from "./ui/InfoPanel.js";
import { loadTracks } from "./data/Loader.js"

const canvas = document.getElementById("aquarium");
const audio = document.getElementById("audio");

let aquarium;
let ui;

/* BOOT */

async function boot() {
    const tracks = await loadTracks();

    ui = new UI(audio);

    aquarium = new Aquarium({
        svg: canvas,
        tracks,
        ui, audio
    });

    aquarium.init();
    loop();
}

/* MAIN LOOP */

function loop() {
    aquarium.update();
    requestAnimationFrame(loop);
}

/* START */

boot();
import { Fish } from "./Fish.js";
import { BoidsSystem } from "./Boids.js";
import { BubbleSystem } from "./BubbleSystem.js";

export class Aquarium {
    constructor({ svg, tracks, ui, audio }) {
        this.svg = svg;
        this.tracks = tracks;
        this.ui = ui;
        this.audio = audio;

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.fishes = [];

        this.boids = new BoidsSystem(this.width, this.height);
        this.bubbles = new BubbleSystem();

        window.addEventListener("resize", () => this.onResize());
    }

    init() {
        this.createFish();
        this.bubbles.init();
    }

    createFish() {
        this.tracks.forEach((track) => {
            const fish = new Fish({
                track,
                svg: this.svg,
                boids: this.boids,
                ui: this.ui,
                audio: this.audio,
                world: this
            });

            this.fishes.push(fish);
        });
    }

    update() {
        this.boids.update(this.fishes);

        for (const fish of this.fishes) {
            fish.update();
        }

        this.bubbles.update();
        this.updateOceanMood();
    }

    updateOceanMood() {
        let avg = 0;

        for (const f of this.fishes) {
            avg += f.track.valence;
        }

        avg /= this.fishes.length;

        const hue = 200 + avg * 80;

        document.body.style.background = `
            radial-gradient(circle at center,
            hsl(${hue}, 60%, 18%),
            #020b14)
        `;
    }

    onResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.boids.setBounds(this.width, this.height);
    }
}
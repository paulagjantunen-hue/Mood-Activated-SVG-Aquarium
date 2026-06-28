class Fish {
    constructor(song, svg, boids, audio, ui) {
        this.song = song;
        this.svg = svg;
        this.boids = boids;
        this.audio = audio;
        this.ui = ui;

        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;

        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;

        this.el = this.createFishSVG();

        this.svg.appendChild(this.el);

        this.boids.addFish(this);
    }

    createFishSVG() {
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.classList.add("fish");

        const body = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        body.setAttribute("rx", 20 + this.song.energy * 25);
        body.setAttribute("ry", 10 + this.song.valence * 15);
        body.setAttribute("fill", this.getColor());

        const tail = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        tail.setAttribute("points", "-25,0 -45,-12 -45,12");
        tail.setAttribute("fill", this.darken(this.getColor()));

        const eye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        eye.setAttribute("cx", 10);
        eye.setAttribute("cy", -3);
        eye.setAttribute("r", 2);
        eye.setAttribute("fill", "white");

        const pupil = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        pupil.setAttribute("cx", 11);
        pupil.setAttribute("cy", -3);
        pupil.setAttribute("r", 1);
        pupil.setAttribute("fill", "black");

        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.textContent = this.song.title;
        label.setAttribute("class", "label");
        label.setAttribute("y", 25);

        g.appendChild(tail);
        g.appendChild(body);
        g.appendChild(eye);
        g.appendChild(pupil);
        g.appendChild(label);

        g.addEventListener("click", () => this.onClick());

        return g;
    }

    getColor() {
        const v = this.song.valence;

        if (v > 0.8) return "#ffe066"; // happy
        if (v > 0.6) return "#72efdd"; // calm happy
        if (v > 0.4) return "#4ea8de"; // neutral
        if (v > 0.2) return "#5e60ce"; // sad
        return "#3a0ca3"; // very sad
    }

    darken(color) {
        return color + "aa";
    }

    update() {
        const angle = Math.atan2(this.vy, this.vx) * 180 / Math.PI;

        this.el.setAttribute(
            "transform",
            `translate(${this.x},${this.y}) rotate(${angle})`
        );
    }

    onClick() {
        // play preview
        if (this.song.preview) {
            this.audio.src = this.song.preview;
            this.audio.play(); 

            setTimeout(() => {
                this.audio.pause();
            }, 10000);
        }

        // show UI panel
        this.ui.show(this.song);
    }
}
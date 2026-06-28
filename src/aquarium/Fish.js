export class Fish {
    constructor({ track, svg, boids, ui, audio, world }) {
        this.track = track;
        this.svg = svg;
        this.boids = boids;
        this.ui = ui;
        this.audio = audio;
        this.world = world;

        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;

        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;

        this.element = this.createSVG();

        this.svg.appendChild(this.element);

        this.boids.add(this);
    }

    /* VISUAL */

    createSVG() {
        const NS = "http://www.w3.org/2000/svg";

        const g = document.createElementNS(NS, "g");
        g.classList.add("fish");

        const body = document.createElementNS(NS, "ellipse");
        body.setAttribute("rx", 18 + this.track.energy * 25);
        body.setAttribute("ry", 10 + this.track.valence * 15);
        body.setAttribute("fill", this.getColor());

        const tail = document.createElementNS(NS, "polygon");
        tail.setAttribute("points", "-25,0 -45,-12 -45,12");
        tail.setAttribute("fill", this.darken(this.getColor()));

        const eye = document.createElementNS(NS, "circle");
        eye.setAttribute("cx", 10);
        eye.setAttribute("cy", -3);
        eye.setAttribute("r", 2);
        eye.setAttribute("fill", "white");

        const pupil = document.createElementNS(NS, "circle");
        pupil.setAttribute("cx", 11);
        pupil.setAttribute("cy", -3);
        pupil.setAttribute("r", 1);
        pupil.setAttribute("fill", "black");

        const label = document.createElementNS(NS, "text");
        label.textContent = this.track.title;
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

    /* COLORS */

    getColor() {
        const v = this.track.valence;

        if (v > 0.8) return "#ffe066";
        if (v > 0.6) return "#72effd";
        if (v > 0.4) return "#4ea8de";
        if (v > 0.2) return "#5e60ce";
        return "#3a0ca3";
    }

    darken(color) {
        return color + "aa";
    }

    /* PHYSICS */

    update() {
        const force = this.boids.getForce(this);

        this.vx += force.x;
        this.vy += force.y;

        const maxSpeed = this.track.energy * 2.5 + 0.5;

        const speed = Math.sqrt(this.vx ** 2 + this.vy ** 2);

        if (speed > maxSpeed) {
            this.vx = (this.vx / speed) * maxSpeed;
            this.vy = (this.vy / speed) * maxSpeed;
        }

        this.x += this.vx;
        this.y += this.vy;

        this.wrapEdges();
        this.render();
    }

    wrapEdges() {
        if (this.x < 0) this.x = this.world.width;
        if (this.x > this.world.width) this.x = 0;
        if (this.y < 0) this.y = this.world.height;
        if (this.y > this.world.height) this.y = 0;
    }

    render() {
        const angle = Math.atan2(this.vy, this.vx) * 180 / Math.PI;

        const scale = 1 + Math.sin(Date.now() * 0.002 + this.x) * 0.03;

        this.element.setAttribute(
            "transform",
            `translate(${this.x},${this.y}) rotate(${angle}) scale(${scale})`
        );
    }

    /* INTERACTION */

    onClick() {
        if (this.track.preview) {
            this.audio.src = this.track.preview;
            this.audio.play();

            setTimeout(() => this.audio.pause(), 10000);
        }

        this.ui.show(this.track);
    }
}
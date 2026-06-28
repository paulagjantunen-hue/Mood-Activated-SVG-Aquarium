export class BubbleSystem {
    constructor() {
        this.bubbles = [];
        this.container = document.body;

        this.timer = null;
    }

    init() {
        // start spawning bubbles
        this.timer = setInterval(() => {
            this.spawnBubble();
        }, 400);
    }

    spawnBubble() {
        const bubble = document.createElement("div");
        bubble.className = "bubble";

        const size = 3 + Math.random() * 8;

        bubble.style.width = size + "px";
        bubble.style.height = size + "px";

        bubble.style.left = Math.random() * window.innerWidth + "px";
        bubble.style.bottom = "-10px";

        bubble.style.animationDuration = 4 + Math.random() * 6 + "s";

        this.container.appendChild(bubble);

        this.bubbles.push(bubble);

        // cleanup
        setTimeout(() => {
            bubble.remove();

            this.bubbles = this.bubbles.filter(b => b !== bubble);
        }, 10000);
    }

    update() {
        // reserved for future physics (currents, drift, interaction)
    }

    stop() {
        clearInterval(this.timer);
    }
}
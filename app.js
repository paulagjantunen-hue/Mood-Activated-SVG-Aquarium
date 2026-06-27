const svg = document.getElementById("aquarium");
const audio = document.getElementById("player");

const W = window.innerWidth;
const H = window.innerHeight;

svg.setAttribute("width", W)
svg.setAttribute("height", H);

let fishes = [];

fetch("tracks.json")
    .then(res => res.json())
    .then(data => {
        data.forEach(createFish);
        animate();
    });

function createFish(song) {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");

    const fish = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    fish.setAttribute("rx", 20 + song.energy * 20);
    fish.setAttribute("ry", 10 + song.valence * 10);
    fish.setAttribute("fill", song.color);

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("class", "label");
    label.setAttribute("y", 30);
    label.textContent = song.title;

    g.appendChild(fish);
    g.appendChild(label);
    svg.appendChild(g);

    const state = {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * song.energy * 3,
        vy: (Math.random() - 0.5) * song.energy * 3,
        song,
        el: g
    };

    g.addEventListener("click", () => {
        audio.src = song.preview;
        audio.play();
        setTimeout(() => audio.onpause(), 10000);
    });

    fishes.push(state);
}

function animate() {
    fishes.forEach(f => {
        f.vx += (Math.random() - 0.5) * 0.1 * f.song.energy;
        f.vy += (Math.random() - 0.5) * 0.1 * f.song.energy;

        f.vx *= 0.98;
        f.vy *= 0.98;

        f.x += f.vx;
        f.y += f.vy;

        if (f.x < 0) f.x = W;
        if (f.x > W) f.x = 0;
        if (f.y < 0) f.y = H;
        if (f.y > H) f.y = 0;

        f.el.setAttribute("transform", `translate(${f.x},${f.y})`);
    });

    requestAnimationFrame(animate);
}
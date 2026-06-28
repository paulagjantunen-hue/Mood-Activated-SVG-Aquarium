const svg = document.getElementById("aquarium");
const audio = document.getElementById("audio");

const ui = new UI();
const boids = new BoidsSystem(window.innerWidth, window.innerHeight);

let fishes = [];

/* LOAD DATA */

async function loadTracks() {
  try {
    const res = await fetch("data/tracks.json");

    if (!res.ok) {
      throw new Error("HTTP " + res.status);
    }

    const tracks = await res.json();

    createFishPopulation(tracks);

    document.getElementById("loading").classList.add("hidden");

  } catch (err) {
    console.error(err);

    document.getElementById("loading").innerHTML =
      "<h2>Ocean failed to load</h2><p>Check that tracks.json exists in /data</p>";
  }
}

/* CREATE FISH */

function createFishPopulation(tracks) {
    tracks.forEach(track => {
        const fish = new Fish(track, svg, boids, audio, ui);
        fishes.push(fish);
    });
}

/* ANIMATION LOOP */

function animate() {
    boids.update();

    fishes.forEach(fish => {
        fish.update();
    });

    requestAnimationFrame(animate);
}

/* BUBBLES SYSTEM */

function createBubble() {
    const bubble = document.createElement("div");
    bubble.className = "bubble";

    bubble.style.left = Math.random() * window.innerWidth + "px";
    bubble.style.bottom = "0px";

    const size = 4 + Math.random() * 6;
    bubble.style.width = size + "px";
    bubble.style.height = size + "px";

    bubble.style.animationDuration = 4 + Math.random() * 6 + "s";

    document.body.appendChild(bubble);

    setTimeout(() => {
        bubble.remove();
    }, 10000);
}

function startBubbles() {
    setInterval(createBubble, 500);
}

/* SEARCH FILTER */

function setupSearch() {
    const input = document.getElementById("search");

    input.addEventListener("input", (e) => {
        const value = e.target.value.toLowerCase();

        fishes.forEach(fish => {
            const match = fish.song.title.toLowerCase().includes(value);

            fish.el.style.opacity = match ? "1" : "0.1";
        });
    });
}

/* INIT */

function init() {
    loadTracks();
    animate();
    startBubbles();
    setupSearch();
}

init();
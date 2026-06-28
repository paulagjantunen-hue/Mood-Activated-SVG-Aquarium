const svg = document.getElementById("aquarium");
const audio = document.getElementById("audio");
const ui = new UI();
const boids = new BoidsSystem(window.innerWidth, window.innerHeight);
const fishes = [];

function resizeAquarium() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    boids.width = width;
    boids.height = height;
}

resizeAquarium();
window.addEventListener("resize", resizeAquarium);

fetch("tracks.json")
    .then(res => res.json())
    .then(data => {
        data.forEach(song => {
            const fish = new Fish(song, svg, boids, audio, ui);
            fishes.push(fish);
        });
        animate();
    })
    .catch(error => {
        console.error("Failed to load tracks:", error);
    });

function animate() {
    boids.update();
    fishes.forEach(fish => fish.update());
    requestAnimationFrame(animate);
}

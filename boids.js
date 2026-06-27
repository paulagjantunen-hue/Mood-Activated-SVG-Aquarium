class BoidsSystem {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.fishes = [];
    }

    addFish(fish) {
        this.fishes.push(fish);
    }

    update() {
        for (let fish of this.fishes) {
            const force = this.computeBoidForces(fish);

            fish.vx += force.x;
            fish.vy += force.y;

            // speed limit
            const speedLimit = fish.song.energy * 2.5 + 0.5;

            const speed = Math.sqrt(fish.vx * fish.vx + fish.vy * fish.vy);

            if (speed > speedLimit) {
                fish.vx = (fish.vx / speed) * speedLimit;
                fish.vy = (fish.vy / speed) * speedLimit;
            }

            fish.x += fish.vx;
            fish.y += fish.vy;

            // wrap edges (ocean loop)
            if (fish.x < 0) fish.x = this.width;
            if (fish.x > this.width) fish.x = 0;
            if (fish.y < 0) fish.y = this.height;
            if (fish.y > this.height) fish.y = 0;
        }
    }

    computeBoidForces(fish) {
        const neighborDist = 120;

        let align = { x: 0, y: 0 };
        let cohesion = { x: 0, y: 0 };
        let separation = { x: 0, y: 0 };

        let count = 0;

        for (let other of this.fishes) {
            if (other === fish) continue;

            const dx = other.x - fish.x;
            const dy = other.y - fish.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < neighborDist) {
                // ALIGNMENT (match velocity)
                align.x += other.vx;
                align.y += other.vy;

                // COHESION (move toward group center)
                cohesion.x += other.x;
                cohesion.y += other.y;

                // SEPARATION (avoid crowding)
                separation.x -= dx / (dist + 0.01);
                separation.y -= dy / (dist + 0.01);

                count++;
            }
        }

        if (count > 0) {
            align.x /= count;
            align.y /= count;

            cohesion.x /= count;
            cohesion.y /= count;

            cohesion.x = (cohesion.x - fish.x) * 0.002;
            cohesion.y = (cohesion.y - fish.y) * 0.002;
        }

        // weight based on mood (energy affects chaos)
        const energy = fish.song.energy;

        return {
            x:
                align.x * 0.02 * energy +
                cohesion.x * 0.6 +
                separation.x * 0.08,

            y:
                align.y * 0.02 * energy +
                cohesion.y * 0.6 +
                separation.y * 0.08
        };
    }
}
export class BoidsSystem {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.neighborDist = 120;
    }

    setBounds(width, height) {
        this.width = width;
        this.height = height;
    }

    add(fish) {
    }

    /* MAIN FORCE CALC */

    getForce(fish, fishes = []) {
        let align = { x: 0, y: 0 };
        let cohesion = { x: 0, y: 0 };
        let separation = { x: 0, y: 0 };

        let count = 0;

        for (const other of fishes) {
            if (other === fish) continue;

            const dx = other.x - fish.x;
            const dy = other.y - fish.y;

            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < this.neighborDist && dist > 0) {
                // ALIGNMENT (match velocity)
                align.x += other.vx;
                align.y += other.vy;

                // COHESION (move toward group center)
                cohesion.x += other.x;
                cohesion.y += other.y;

                // SEPARATION (avoid crowding)
                separation.x -= dx / dist;
                separation.y -= dy / dist;

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

        const energy = fish.track.energy;

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
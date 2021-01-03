class Particle {
    constructor(x, y, state, update){
        this.x = x;
        this.y = y;
        this.state = state
        this.update = update
    }
}

class ParticleTracker {
    constructor(){
        this.particles = []
    }

    update(){
        this.particles.forEach(p=>{
            p.update()
        })
    }

    handleUpdate(){
        this.update()
    }

    push(particle){
        this.particles.push(particle)
    }
}
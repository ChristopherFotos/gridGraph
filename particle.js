class Particle {
    constructor(color){
        this.color = color
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
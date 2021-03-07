// get canvas and context, set width and height
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx     = canvas.getContext('2d')
ctx.lineWidth = 1
document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX - 5;
    mouse.y = e.clientY - 5;
})

let props = {
    ctx: ctx,
    active: '#00ff00',
    waiting:'#ff0000'
}

// initialize new particle tracker
const tracker = new ParticleTracker()

// initialize mouse tracker object and event listener
let mouse = {
    x: undefined,
    y: undefined,
}

document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX - 5;
    mouse.y = e.clientY - 5;
})

document.addEventListener('click', ()=>{
    const p = new Particle(mouse.x, mouse.y, {}, function(){
        this.y += 1
    })

    tracker.push(p)
})

// every cell loops through the tracker's particle array. if there's a particle in the cell, cell.state.particle is set to true.
function update(cell){

    tracker.particles.forEach(p => {
        if(utils.pointInRect(p.x, p.y, {x: cell.x, y: cell.y, width: cell.width, height: cell.height})){
            cell.state.particle = true
            console.log(cell.state)
        }
    })
}

// the draw function

function draw(){
    this.board.props.ctx.beginPath();

    if(this.state.particle === true){
        this.board.props.ctx.fillStyle = '#ff0000';
        console.log('particle caught')
    }

    this.board.props.ctx.fillRect(this.x, this.y, this.size, this.size);
    this.board.props.ctx.stroke();
}

const board = new Board(window.innerWidth, window.innerHeight, 5, update, 10, true, props, draw)
board.addSubscriber(tracker)

board.start()
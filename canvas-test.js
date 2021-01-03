const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx    = canvas.getContext('2d')
ctx.lineWidth = 1

// getting mouse position and storing it in an objects
let mouse = {
    x: undefined,
    y: undefined,
}

document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX - 5;
    mouse.y = e.clientY - 5;
})

// setting up functions and variables for the board
let props = {
    ctx: ctx,
    active: '#00ff00',
    waiting:'#ff0000'
}

function draw(){

    this.board.props.ctx.beginPath();

    

    if(this.state.active === true){
        console.log(this.state)
        this.board.props.ctx.fillStyle = '#ff0000';
        console.log( this.board.props.ctx.fillStyle)
    }

    this.board.props.ctx.fillRect(this.x, this.y, this.size, this.size);
    // this.board.props.ctx.fillStyle = this.board.props.waiting;
    this.board.props.ctx.stroke();
}

function toggle(cell){
  if(utils.pointInRect(mouse.x, mouse.y, {x: cell.x, y: cell.y, width: cell.width, height: cell.height})){
        

        cell.newState.active  = true
        cell.newState.updates = cell.draw

        // console.log(cell.newState.active)
        // console.log(cell.state.active)

    
        // for(neighbor in cell.neighbors){
        //     cell.neighbors[neighbor].newState.active  = true
        //     cell.neighbors[neighbor].newState.updates = cell.neighbors[neighbor].draw
        // }
  }
}

// instantiating and starting the board
let board   = new Board(window.innerWidth, window.innerHeight, 2, toggle, 5, true, props, draw)
board.start()
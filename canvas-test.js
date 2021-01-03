const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx    = canvas.getContext('2d')
ctx.lineWidth = 1

// getting mouse position and storing it in an objects
let mouse = {
    x: undefined,
    y: undefined,
    drawing: false,
}

document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX - 5;
    mouse.y = e.clientY - 5;
})

document.addEventListener('mousedown', e=>{
    mouse.drawing = true
})
document.addEventListener('mouseup', e=>{
    mouse.drawing = false
})

// setting up functions and variables for the board
let props = {
    ctx: ctx,
    active: '#00ff00',
    waiting:'#ff0000'
}

function draw(){
    this.board.props.ctx.beginPath();

    if(this.state.particle === true){
        this.board.props.ctx.fillStyle = '#ff0000';
    } 
    
    if(this.state.particle === false) { 
        this.board.props.ctx.fillStyle = '#000'
    }

    this.board.props.ctx.fillRect(this.x, this.y, this.size, this.size);
    this.board.props.ctx.stroke();
}

function toggle(cell){
  if(utils.pointInRect(mouse.x, mouse.y, {x: cell.x, y: cell.y, width: cell.width, height: cell.height}) &&
    mouse.drawing  
  ){
    cell.newState.particle  = true
    cell.newState.updates   = cell.draw
  }

  if(cell.state.particle){
    if(cell.neighbors.bottom && !cell.neighbors.bottom.state.particle){
        cell.newState.particle = false
        cell.newState.updates  = cell.draw

        cell.neighbors.bottom.newState.particle = true
        cell.neighbors.bottom.newState.updates  = cell.neighbors.top.draw
    }

    if(cell.neighbors.bottom && cell.neighbors.bottom.state.particle){
        cell.newState.particle = true
        cell.newState.updates  = cell.draw
    
        cell.neighbors.bottom.newState.particle = true
        cell.neighbors.bottom.newState.updates  = cell.neighbors.bottom.draw
    }

    if(
        cell.neighbors.bottom && 
        cell.neighbors.bottom.state.particle &&
        cell.neighbors.bottomRight &&
        cell.neighbors.bottomRight.state.particle &&
        cell.neighbors.bottomLeft &&
        !cell.neighbors.bottomLeft.state.particle
    ) {
        cell.neighbors.bottomLeft.newState.particle = true
    }

    if(
        cell.neighbors.bottom && 
        cell.neighbors.bottom.state.particle &&
        cell.neighbors.bottomLeft &&
        cell.neighbors.bottomLeft.state.particle &&
        cell.neighbors.bottomRight &&
        !cell.neighbors.bottomRight.state.particle
    ) {
        cell.newState.particle = false
        cell.newState.updates  = cell.draw

        cell.neighbors.bottomRight.newState.particle = true
        cell.neighbors.bottomRight.newState.updates = cell.neighbors.bottomRight.draw
    }



    if(!cell.neighbors.bottom){
        cell.newState.particle = true
    }
  }

}

// instantiating and starting the board
let board   = new Board(window.innerWidth /3, window.innerHeight / 2, 4, toggle, 20, true, props, draw)
board.start()
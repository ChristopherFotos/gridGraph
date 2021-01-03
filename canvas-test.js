const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth / 3
canvas.height = window.innerHeight / 2 

const ctx    = canvas.getContext('2d')
ctx.lineWidth = 1

// getting mouse position and storing it in an objects
let mouse = {
    x: undefined,
    y: undefined,
    drawing: false,
}

// gameState object tracks what kind of operation the mouse click should do
let gameState = {
    empty: false
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

document.addEventListener('keydown', e=>{
    if(e.key === '1'){
        gameState.empty = !gameState.empty
    }
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
        this.board.props.ctx.fillStyle = '#000000'
    }

    this.board.props.ctx.fillRect(this.x, this.y, this.size, this.size);
    this.board.props.ctx.stroke();
}

function toggle(cell){

    // if mouse if on cell, and drawing, and not empty
  if(utils.pointInRect(mouse.x, mouse.y, {x: cell.x, y: cell.y, width: cell.width, height: cell.height}) &&
    mouse.drawing && 
    !gameState.empty 
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

    if( //fall to the bottom left
        cell.neighbors.bottom && 
        cell.neighbors.bottom.state.particle &&
        cell.neighbors.bottomRight &&
        cell.neighbors.bottomRight.state.particle &&
        cell.neighbors.bottomLeft &&
        !cell.neighbors.bottomLeft.state.particle
    ) {
        cell.newState.particle = false
        cell.newState.updates   = cell.draw

        cell.neighbors.bottomLeft.newState.particle = true
        cell.neighbors.bottomLeft.newState.updates = cell.neighbors.bottomLeft.draw
    }

    if( // fall to the bottom right
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



    if(!cell.neighbors.bottom){ // remain a particle if no bottom neighbor
        cell.newState.particle = true
    }
  }

  // if mouse is intersecting, and drawing, and empty
  if(utils.pointInRect(mouse.x, mouse.y, {x: cell.x, y: cell.y, width: cell.width, height: cell.height}) &&
    mouse.drawing && 
    gameState.empty 
  ) {
      cell.newState.particle = false 
      cell.newState.updates  = cell.draw

      for(n in cell.neighbors){
        if(cell.neighbors[n]){
            cell.neighbors[n].newState.particle = false
            cell.neighbors[n].newState.updates  = cell.neighbors[n].draw
        }
      }
  }

}

// instantiating and starting the board
let board   = new Board(window.innerWidth /3, window.innerHeight / 2, 3, toggle, 20, true, props, draw)
board.start()
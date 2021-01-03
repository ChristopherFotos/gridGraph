let colors = {
    particle: [
        '#E8383C',
        '#E3161B',
        '#E77072',
        '#CC292C',
        '#CC292C',
        '#E41014'
    ],

    fixed: [
        '#D4D4D4',
        '#B1ABB5',
        '#C4BDC8',
        '#858588'
    ]
}

function statefulDraw(){
    this.board.props.ctx.beginPath();

    if(this.state.particle){
        this.board.props.ctx.fillStyle = this.state.particle.color;
    } 
    
    if(!this.state.particle) { 
        this.board.props.ctx.fillStyle = '#000000'
    }

    this.board.props.ctx.fillRect(this.x, this.y, this.size, this.size);
    this.board.props.ctx.stroke();
}

function statefulToggle(cell){

  // if mouse is on cell, and drawing, and not empty
  if(utils.pointInRect(mouse.x, mouse.y, {x: cell.x, y: cell.y, width: cell.width, height: cell.height}) &&
    mouse.drawing && 
    (gameState.type === 'particle'|| gameState.type === 'fixed')

  ){
    cell.newState.particle  = {
        color: colors[gameState.type][Math.floor(Math.random() * colors[gameState.type].length - 1)], 
        movement: gameState.type === 'fixed' ? 'fixed' : 'normal'
    }

    cell.newState.updates   = cell.draw

    for(n in cell.neighbors){
        if(cell.neighbors[n]){
            cell.neighbors[n].newState.particle = {
                color: colors[gameState.type][Math.floor(Math.random() * colors[gameState.type].length - 1)],
                movement: gameState.type === 'fixed' ? 'fixed' : 'normal'
            }
            cell.neighbors[n].newState.updates  = cell.neighbors[n].draw
        }
      }
  }

  if(cell.state.particle){ // fall down
    if( cell.neighbors.bottom && 
        !cell.neighbors.bottom.state.particle &&
        cell.state.particle.movement !== 'fixed'
        ){

        console.log('fall down')
        cell.newState.particle = false
        cell.newState.updates  = cell.draw

        cell.neighbors.bottom.newState.particle = cell.state.particle
        cell.neighbors.bottom.newState.updates  = cell.neighbors.bottom.draw
    }

    if(cell.neighbors.bottom && cell.neighbors.bottom.state.particle){
        cell.newState.particle = cell.state.particle
        cell.newState.updates  = cell.draw
    
        cell.neighbors.bottom.newState.particle = cell.neighbors.bottom.state.particle
        cell.neighbors.bottom.newState.updates  = cell.neighbors.bottom.draw
    }

    if( //fall to the bottom left
        cell.neighbors.bottom && 
        cell.neighbors.bottom.state.particle &&
        cell.neighbors.bottomRight &&
        cell.neighbors.bottomRight.state.particle &&
        cell.neighbors.bottomLeft &&
        !cell.neighbors.bottomLeft.state.particle &&
        cell.state.particle.movement !== 'fixed'
    ) {
        console.log('fall left')
        cell.newState.particle = false
        cell.newState.updates   = cell.draw

        cell.neighbors.bottomLeft.newState.particle = cell.state.particle
        cell.neighbors.bottomLeft.newState.updates = cell.neighbors.bottomLeft.draw
    }

    if( // fall to the bottom right
        cell.neighbors.bottom && 
        cell.neighbors.bottom.state.particle &&
        cell.neighbors.bottomLeft &&
        cell.neighbors.bottomLeft.state.particle &&
        cell.neighbors.bottomRight &&
        !cell.neighbors.bottomRight.state.particle  &&
        cell.state.particle.movement !== 'fixed'
    ) {
        console.log('fall right')
        cell.newState.particle = false
        cell.newState.updates  = cell.draw

        cell.neighbors.bottomRight.newState.particle = cell.state.particle
        cell.neighbors.bottomRight.newState.updates = cell.neighbors.bottomRight.draw
    }



    if(!cell.neighbors.bottom){ // remain a particle if no bottom neighbor
        cell.newState.particle = true
    }
  }

  // if mouse is intersecting, and drawing, and gameState.type is eraser
  if(utils.pointInRect(mouse.x, mouse.y, {x: cell.x, y: cell.y, width: cell.width, height: cell.height}) &&
    mouse.drawing && 
    gameState.type === 'eraser' 
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
function step(cell){
    let liveNeighbors = 0

    for(neighbor in cell.neighbors){
        if(cell.neighbors[neighbor] && cell.neighbors[neighbor].state.alive){
            liveNeighbors += 1
        }
    }

    if(!cell.state.alive && liveNeighbors === 3){
        cell.newState.alive   = true
        cell.newState.updates = function(){
            let colors = ['a', 'b', 'c', 'd',]
            cell.div.classList.add(colors[Math.floor(Math.random() * 3)])
        }
        
    }

    if(cell.state.alive && (liveNeighbors === 3 || liveNeighbors === 2)){
        cell.newState.alive   = true    
        
    }

    if(cell.state.alive && liveNeighbors < 2){
        cell.newState.alive    = false
        cell.newState.updates  = function(){
            cell.div.classList = ['cell']
        }
        
    }

    if(cell.state.alive && liveNeighbors > 3){
        cell.newState.alive    = false
        cell.newState.updates  = function(){
            cell.div.classList = ['cell']
        }
        
    }
}
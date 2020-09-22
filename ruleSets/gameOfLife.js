
    // The ORDER of these if statements may matter. If that's the case, it may be wise to create an object and, instead of manipulating the cell's state in 
    // the body of the IF statement, create an object of modifications that need to be made and then execute each one
    // count live neighbors in the cell's update function 

function step(cell){
    let liveNeighbors = 0

    for(neighbor in cell.neighbors){
        if(cell.neighbors[neighbor] && cell.neighbors[neighbor].state.alive){
            liveNeighbors += 1
        }
    }

    if(!cell.state.alive && liveNeighbors === 3){
        console.log('Cell: ', cell, ' Live neighbors: ', liveNeighbors, ' Cell neighbor object', cell.neighbors)
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

    

    






    // // create variable for live and dead neighbors
    // let deadNeighbors = 0
    // let liveNeighbors = 0

    // // loop through the cell's neighbors. for each living neighbor, increment liveNeighbors. for each dead neighbor, increment deadNeighbors
    // let keys = Object.keys(cell.neighbors)
    // keys.forEach(k => {
    //     if(cell.neighbors[k] && cell.neighbors[k].state.alive){
    //         liveNeighbors    += 1
    //     } else deadNeighbors += 1
    // })

    
    // if(cell.state.alive){
    //     if(liveNeighbors !== 2 && liveNeighbors !== 3){
    //         cell.state.alive   = false
    //         cell.div.classList = ['cell']
    //     }
    // }
    // if(!cell.state.alive){
    //     if(liveNeighbors === 3){
    //         cell.state.alive = true
    //         cell.div.classList.add(colors[Math.floor(Math.random() * 3)])
    //     }
    // }
}
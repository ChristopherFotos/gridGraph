function euclidianDistance(c1, c2){
    let a = (c2.left - c1.left)
    let b = (c2.top  - c1.top )


    console.log('euc dis', c1, c2,1 (a * a)  +  (b * b))
    return  (a * a)  +  (b * b)
}

function calculateG(c, relation){ // relation can be neighbor in the for...in loop
    console.log('calculateing G of: ', c)
    let g

    relation     = 'topLeft' || 'bottomLeft' || 'topRight' || 'bottomRight' ?  g = 14 : g = 10

    let cameFrom = c.state.cameFrom 
    let checked  = []

    while(cameFrom && checked.indexOf(cameFrom) === -1){
        g += cameFrom.gScore
        checked.push(cameFrom)
        if(cameFrom.state.parent){
            cameFrom = cameFrom.state.parent
        } else {cameFrom = false}
    }
    console.log('gScore = ',g)
    return g
}

function aStar(){
    let current     ,
        open        = [],
        closed      = []

    current       = nodeInfo.start

    startDistance = euclidianDistance(nodeInfo.start, nodeInfo.end)

    nodeInfo
        .start       
        .state     
        .fScore     = startDistance

    nodeInfo
        .start       
        .state     
        .gScore     = 0

    let lowestF      = open[0]; console.log('lowestF: ', lowestF)
    let shortestPath = [nodeInfo.end]

    while(current !== nodeInfo.end){                                                                                         console.log('WHILE LOOP')
        for(neighbor in current.neighbors){                                                                                  console.log(current.neighbors[neighbor])
            if(!(open.includes(current.neighbors[neighbor]) || closed.includes(current.neighbors[neighbor]))){
                open.push(current.neighbors[neighbor]);                                                                      console.log('openList: ', open)
            }

            if(current.neighbors[neighbor] = nodeInfo.end){                                                                  console.log('end')
                nodeInfo.end.state.parent  = current
                let parent                 = current
                shortestPath.unshift(parent)
                if(parent.state.parent){ parent = parent.state.parent} else parent = false
                while(parent){                                                                                              console.log('end while parent', parent)
                    shortestPath.unshift(parent);                                                                           console.log('end while shortest path array', shortestPath)
                    if(parent.state.parent){ parent = parent.state.parent } else parent = false
                }
                return shortestPath                                      
            }

                current.neighbors[neighbor].state.cameFrom  = current
                if(!current.neighbors[neighbor].state.hScore) current.neighbors[neighbor].state.hScore = euclidianDistance(current.neighbors[neighbor], nodeInfo.end),
                current.neighbors[neighbor].state.gScore    = calculateG(current.neighbors[neighbor], neighbor)
                let fScore                                  = current.neighbors[neighbor].state.hScore + current.neighbors[neighbor].state.gScore

                if(fScore < current.neighbors[neighbor].state.fScore || !current.neighbors[neighbor].state.fScore){
                    current.neighbors[neighbor].state.fScore = fScore
                    current.neighbors[neighbor].state.parent = current
                }
            }

        closed.push(current)

        for(let i = 1; i < open.length - 1; i++){
            if(open[i].state.fScore < lowestF.state.fScore){
                lowestF = open[i]
            }
        }
        open.splice(open.indexOf(lowestF), 1)    
        current = lowestF
        console.log('current: ', current )
        lowestF = open[0]
        } 
} 


// make it so that a node never checks its own parent
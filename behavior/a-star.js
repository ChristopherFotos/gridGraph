function euclidianDistance(c1, c2){
    let a = (c2.left - c1.left)
    let b = (c2.top  - c1.top )


    console.log('euc dis', Math.sqrt((a * a)  +  (b * b)))
    return  Math.sqrt((a * a)  +  (b * b))
}

function calculateG(c, relation){ // relation can be neighbor in the for...in loop
    console.log('calculateing G of: ', c, 'with a relation of: ', relation)

    let g

    if (relation === 'topLeft'   || 
        relation ==='bottomLeft' || 
        relation ==='topRight'   || 
        relation ==='bottomRight'){g = 14; console.log('G INSIDE IF STATEMENT 1: ', g )} else if(
        relation === 'top'    ||
        relation === 'bottom' ||
        relation === 'left'   ||
        relation === 'right'){g = 10; console.log('G INSIDE IF STATEMENT 2: ', g )}


    let cameFrom = c.cameFrom  
    let checked  = []

    while(cameFrom && checked.indexOf(cameFrom) === -1){
        console.log('gScore before adding: ', g)
        console.log('cameFrom gScore: ', cameFrom.gScore)
        g += cameFrom.gScore
        console.log('gScore after adding: ', g)
        checked.push(cameFrom)
        if(cameFrom.parent){
            cameFrom = cameFrom.parent
        } else {cameFrom = false}
    }
    console.log('gScore = ', g)
    return g
}

function aStar(){
    let open    = [],
        closed  = [],
        current = nodeInfo.start

    current.hScore    = euclidianDistance(nodeInfo.start, nodeInfo.end)
    current.gScore    = 0
    current.fScore    = current.hScore + current.gScore
    console.log('START NODE:',nodeInfo.start.fScore, current.neighbors)
    let shortestPath = []
     

    while(current !== nodeInfo.end){
        for(neighbor in current.neighbors){
            if(!current.neighbors[neighbor].notNode){
                if(!open.includes(current.neighbors[neighbor]) && !closed.includes(current.neighbors[neighbor])){
                    open.push(current.neighbors[neighbor])
                }

                current.neighbors[neighbor].div.classList.add('a')

                current.neighbors[neighbor].cameFrom = current
                current.neighbors[neighbor].gScore   =  calculateG(current.neighbors[neighbor], neighbor)
                current.neighbors[neighbor].hScore   =  euclidianDistance(current.neighbors[neighbor], nodeInfo.end) 
                let fScore                           =  current.neighbors[neighbor].gScore + current.neighbors[neighbor].hScore
                console.log('hScore: ', current.neighbors[neighbor].hScore, 'gScore: ', current.neighbors[neighbor].gScore)
                
                if(!current.neighbors[neighbor].fScore || fScore < current.neighbors[neighbor].fScore){
                    current.neighbors[neighbor].fScore = fScore
                    current.neighbors[neighbor].parent = current
                    console.log('calculated fScore = ', current.neighbors[neighbor].fScore)
                }                                                       
            }
        }

        let lowestF = open[0]

        closed.push(current)
        console.log ('closed: ',closed , 'open: ', open)
        
        for(let i = 0; i < open.length - 1; i++){
            if(open[i].fScore < lowestF.fScore){
                console.log('GOING GOING GONE')
                lowestF = open[i]
            }
        }

        console.log(lowestF)
        open.splice(open.indexOf(lowestF), 1)
        current = lowestF
        console.log('THE CELL CURRENTLY IN THE WHILE LOOP IS: ', current)
    }

    parent = nodeInfo.end.parent 
    shortestPath.unshift(nodeInfo.end)
    shortestPath.unshift(parent)
    if(parent.parent){ parent = parent.parent} else parent = false
    while(parent){                                                                                              
        shortestPath.unshift(parent);                                                                           
        if(parent.parent){ parent = parent.parent } else parent = false
    }

    return shortestPath   
    
} 


// make it so that a node never checks its own parent
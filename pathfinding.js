let board   = new Board(window.innerWidth, window.innerHeight, 15, findPath, 300)

let cells   = Array.from(document.getElementsByClassName('cell'))

function findPath(){
    if( nodeInfo.start && nodeInfo.end && !board.state.path){
        board.state.path = aStar()
        board.state.path.forEach(c => {
            c.div.classList.add('start')
        })
    }
}

let nodeInfo   = {
    start: null,
    end  : null
}

let mouseState = {
    addingNode: 'start',
    obstacle  : false  ,
}

document.addEventListener('mousemove', e => {
    mouseState.mouseX = e.clientX
    mouseState.mouseY = e.clientY
})

document.addEventListener('mousedown', e => {
    e.preventDefault()
    mouseState.down = true
    mouseState.up   = false
})

document.addEventListener('mouseup', e => {
    mouseState.up   = true
    mouseState.down = false
})


document.addEventListener('keydown', e => {
    if (e.key === 'g'){
        board.start()
    } 
    
    if (e.key === 'h'){
        board.stop()
    }
    
    if (e.key === 'j'){
        board.update(board)
    }

    if (e.key === '1') {
        mouseState.addingNode = 'start'
    }

    if (e.key === '2') {
        
        mouseState.addingNode = 'end'
    }

    if (e.key === '3'){
        mouseState.addingNode = 'obstacle'
    }

    if (e.key === '4'){
        console.log('running')
        mouseState.addingNode = 'big-obstacle'
    }
})

cells.forEach(c => {
    c.addEventListener('click', e => {
        if(mouseState.addingNode === 'start'){
            nodeInfo.start = board.cellLookup[e.target.dataset.cell]
            e.target.classList.add('start')
            
        }  

        if(mouseState.addingNode === 'end'){
            nodeInfo.end = board.cellLookup[e.target.dataset.cell]
            e.target.classList.add('end') 
        }  

        if(mouseState.addingNode === 'obstacle'){
            board.cellLookup[e.target.dataset.cell].notNode = true
            e.target.classList.add('obstacle') 
        }
    })

    c.addEventListener('mouseenter', e => {
        if(mouseState.addingNode === 'obstacle' && mouseState.down === true){
            board.cellLookup[e.target.dataset.cell].notNode = true
            e.target.classList.add('obstacle') 
            }

            if(mouseState.addingNode === 'big-obstacle' && mouseState.down === true){
                for(cell in board.cellLookup[e.target.dataset.cell].neighbors){
                    board.cellLookup[e.target.dataset.cell].neighbors[cell].notNode = true
                    console.log(board.cellLookup[e.target.dataset.cell].neighbors[cell].notNode)
                    board.cellLookup[e.target.dataset.cell].neighbors[cell].div.classList.add('obstacle')
                }
            }
            
        }
    )
})





let int = 17
let board = new Board(window.innerWidth* 0.2, window.innerHeight* 0.4, int, step, 250, false) 

function step(){
    grow()
    moveSnake()
    kill()
}


let the_snake = {
    cells: {1: board.cellLookup[`${int * 6}_0`]},
    startLength: 1,
    direction: 'right',
    started: false
}

function makeSnake(snake){
    for(let i = 2, workingCell = snake.cells[1]; i <= snake.startLength; i++){

        let picker
        switch (snake.direction) {
            case 'left':
                picker = 'right'
                break;
            case 'right':
                picker = 'left'
                break;
            case 'up':
                picker = 'bottom'
                break;
            case 'down':
                picker = 'top'
                break;
        }

        snake.cells[i] = workingCell.neighbors[picker]
        workingCell   = snake.cells[i]
        console.log('run once')
    }

    for(let cell in snake.cells){
        snake.cells[cell].div.classList.add('a')
    }
}

let chunks = []

function placeChunk(){
    let int =  [Math.floor(Math.random() * board.cells.length)]
    board.cells[int].chunk = true
    board.cells[int].div.classList.add('start')
    chunks.push(board.cells[int])
}




 function chunkify(){
    for(let i = 0; i < 4; i++){
    placeChunk()
    }
}


placeChunk()

makeSnake(the_snake)

function moveSnake(){
    let picker

    switch (the_snake.direction) {
        case 'left':
            picker = 'left'

            break;
        case 'right':
            picker = 'right'

            break;
        case 'up':
            picker = 'top'

            break;
        case 'down':
            picker = 'bottom'

            break;
    }

    let oldCells = {
        ...the_snake.cells
    }
    let oldSnake = {
        ...the_snake
    }


    for(let cell in the_snake.cells){
        
        if(cell === '1'){
            the_snake.cells[1].div.classList.remove('a')
            the_snake.cells[1] = the_snake.cells[1].neighbors[picker]

        } else {
            the_snake.cells[cell].div.classList.remove('a')
            the_snake.cells[cell] = oldCells[(parseInt(cell) - 1).toString()]
        }
    }

    for(let cell in the_snake.cells){
        the_snake.cells[cell].div.classList.add('a')
    }

}

function grow (){
    if(the_snake.cells[1].chunk){

        for(let cell in the_snake.cells){
            the_snake.cells[cell].div.classList.remove('a')
        }

        let picker
        switch (the_snake.direction) {
            case 'left':
                picker = 'right'
                break;
            case 'right':
                picker = 'left'
                break;
            case 'up':
                picker = 'bottom'
                break;
            case 'down':
                picker = 'top'
                break;
        }

        if(the_snake.cells[Object.keys(the_snake.cells).length].neighbors[picker] && 
           !Array.from(the_snake.cells[Object.keys(the_snake.cells).length].neighbors[picker].div.classList).includes('a')) {
            the_snake.cells[Object.keys(the_snake.cells).length + 1] = the_snake.cells[Object.keys(the_snake.cells).length].neighbors[picker]
        } else {
            for(let cell in the_snake.cells[Object.keys(the_snake.cells).length].neighbors){
                if(the_snake.cells[Object.keys(the_snake.cells).length].neighbors[cell] && cell != 'bottomRight' && cell != 'topRight' && cell != 'bottomLeft' && cell != 'bottomLeft'){
                    the_snake.cells[Object.keys(the_snake.cells).length + 1] = the_snake.cells[Object.keys(the_snake.cells).length].neighbors[cell]
                    break
                }
            }
        }

        the_snake.startLength += 1

        the_snake.cells[1].chunk = false
        the_snake.cells[1].div.classList.remove('start')

        placeChunk()
        if(board.updateInterval > 50){
            board.updateInterval -= 5; 
            board.stop(); 
            board.start()
        }
    }
}


function kill (){
    let picker
    switch (the_snake.direction) {
        case 'left':
            picker = 'left'
            break;
        case 'right':
            picker = 'right'
            break;
        case 'up':
            picker = 'top'
            break;
        case 'down':
            picker = 'bottom'
            break;
    }

    let list = Array.from(the_snake.cells[1].neighbors[picker].div.classList)
    if(list.includes('a')){
        board.stop()
    }
}




document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'd':
            if(the_snake.direction !== 'left') the_snake.direction = 'right'
            if(!the_snake.started){
                board.start()
                the_snake.started = true
            }
            break;
        case 'a':
            if(the_snake.direction !== 'right') the_snake.direction = 'left'
            if(!the_snake.started){
                board.start()
                the_snake.started = true
            }
            break;
        case 'w':
            if(the_snake.direction !== 'down') the_snake.direction = 'up'
            if(!the_snake.started){
                board.start()
                the_snake.started = true
            }
            break;
        case 's':
            if(the_snake.direction !== 'up') the_snake.direction = 'down'
            if(!the_snake.started){
                board.start()
                the_snake.started = true
            }
            break;
    }
})








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

function draw(){

}

function toggle(cell){
  if(utils.pointInRect(mouse.x, mouse.y, {x: cell.x, y: cell.y, width: cell.width, height: cell.height})){
        

        cell.div.classList.add = 'looking'
        cell.newState.updates = cell.draw
    
        console.log(cell.div)

        // for(neighbor in cell.neighbors){
        //     cell.neighbors[neighbor].newState.active  = true
        //     cell.neighbors[neighbor].newState.updates = cell.neighbors[neighbor].draw
        // }
  }
}

// instantiating and starting the board
let board   = new Board(window.innerWidth, window.innerHeight, 100, toggle, 20, true, null, draw)
board.start()
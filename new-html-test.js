console.log('hello')

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

function drawcell(){
  console.log('draw')
  let cell             = document.createElement('div')
  let body             = document.getElementsByTagName('body')[0]
  cell.style.position  = 'absolute'
  cell.style.left      = this.x  + 'px'
  cell.style.top       = this.y   + 'px'
  cell.style.width     = this.size  + 'px'
  cell.style.height    = this.size  + 'px'
  cell.style.margin    = 'none'
  cell.classList.add     ('cell')
  cell.dataset.cell    = this.HTMLid
  body.append(cell)
  this.div = cell
}

function toggle(cell){
  
}

// instantiating and starting the board
let board = new Board({
  width: window.innerWidth / 2, 
  height: window.innerHeight / 2, 
  cellSize: 20, 
  stepFunction: toggle, 
  updateInterval:20, 
  cellByCell: true, 
  draw: drawcell
})
board.start()
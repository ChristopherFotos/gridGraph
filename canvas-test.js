const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth / 3
canvas.height = window.innerHeight / 2 

const ctx    = canvas.getContext('2d')
ctx.lineWidth = 1

// getting mouse position and storing it in an object
let mouse = {
    x: undefined,
    y: undefined,
    drawing: false,
}

// gameState object tracks what kind of operation the mouse click should do
let gameState = {
    type: 'particle'
}

// add event listeners to track mouse position, whether the mouse is held down,
// and the game state
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
        gameState.type = 'particle'
    }
    if(e.key === '2'){
        gameState.type = 'eraser'
    }
    if(e.key === '3'){
        gameState.type = 'fixed'
    }
})

// setting up functions and variables for the board
let props = {
    ctx: ctx,
    active: '#00ff00',
    waiting:'#ff0000'
}

// instantiating and starting the board
let board   = new Board({
        width: window.innerWidth /3, 
        height: window.innerHeight / 2, 
        cellSize: 3, 
        stepFunction: statefulToggle, 
        updateInterval:20, 
        cellByCell: true, 
        props: props, 
        draw: statefulDraw
    }
)

board.start()
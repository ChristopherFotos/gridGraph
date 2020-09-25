let board   = new Board(window.innerWidth * 2, window.innerHeight * 2, 20, step)


let cells   = Array.from(document.getElementsByClassName('cell'))
let colors  = ['a', 'b', 'c', 'd',]
let state   = {}


// modes to draw different kinds of square (put these options in an expandable menu)
// square types that affect the squares around them
// a music visualizer?


state.drawing = false 

document.addEventListener('mousedown', e => {
    e.preventDefault()
    state.drawing = true
})

document.addEventListener('mouseup', e => {
    state.drawing = false
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

})

document.addEventListener('mousemove', e => {
    state.mouseX = e.clientX
    state.mouseY = e.clientY
})


cells.forEach(c=> {
    c.addEventListener('mouseenter', e => {
        if(state.drawing){
            e.target.classList.add(colors[Math.floor(Math.random() * 3)])
            board.cellLookup[e.target.dataset.cell].state.alive = true
        }
    })

    c.addEventListener('mouseleave', e => {
        e.target.classList.toggle('looking')
    })

    c.addEventListener('mouseenter', e => {
        e.target.classList.toggle('looking')
})
    c.addEventListener('mousedown', e => {
        e.target.classList.add(colors[Math.floor(Math.random() * 3)])
            board.cellLookup[e.target.dataset.cell].state.alive = true       
    })
})




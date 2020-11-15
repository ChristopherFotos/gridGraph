const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx    = canvas.getContext('2d')
ctx.lineWidth = 1

let props = {ctx: ctx}

function draw(){
    this.board.customProperties.ctx.beginPath();
    this.board.customProperties.ctx.rect(this.top, this.left, this.size, this.size);
    this.board.customProperties.ctx.stroke();
    console.log('drawing')
}

let board   = new Board(window.innerHeight, window.innerWidth, 5, log, 300, false, props, draw)




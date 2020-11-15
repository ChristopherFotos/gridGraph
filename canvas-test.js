const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx    = canvas.getContext('2d')

ctx.lineWidth = 0.5



function log(){console.log('fish')}
let board   = new Board(window.innerHeight, window.innerWidth, 10, log, 300, false, ctx)



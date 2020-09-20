class Cell {
    constructor(left, top, size) {
      this.left = left;
      this.top  = top;
      this.size = size;
      this.draw()
    }
  
    draw() {
      

      let cell             = document.createElement('div')
      let body             = document.getElementsByTagName('body')[0]
      cell.style.position  = 'absolute'
      cell.style.left      = this.left  + 'px'
      cell.style.top       = this.top   + 'px'
      cell.style.width     = this.size  + 'px'
      cell.style.height    = this.size  + 'px'
      cell.style.margin    = 'none'
      cell.classList.add('cell')

      console.log('hello')

      body.append(cell)
    }
  }
  
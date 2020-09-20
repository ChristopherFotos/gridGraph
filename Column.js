class Column {
    constructor(left, width, height, id) {
      this.left   = left
      this.width  = width
      this.height = height
      this.range  = [this.x, this.x + this.width]
      this.cells  = []
      this.id     = id
      this.makeColumn()
    }
  
    addCell(left, top, size) {
      this.cells.push(new Cell(left, top, size))
    }
  
    makeColumn() {
      for (let i = 0; i < window.innerHeight + (this.width + 1); i += this.width) {
        this.addCell(this.left, i, this.width)
      }
    }
  }
  
class Board {
    constructor(width, height, cellSize) {
      this.width    = width
      this.height   = height
      this.cellSize = cellSize
      this.columns  = {}
      this.createGrid()
    }
  
    addColumn(left, width, height) {
      this.columns.push(new Column(left, width))
    }
  
    createGrid() {
      //Create columns
      for (
        let i = 0;
        i < this.width + (this.cellSize + 1);
        i += this.cellSize
      ) {
        this.addColumn(i, this.cellSize, this.height)
      }
    }
}
  
  
  
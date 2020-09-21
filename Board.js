class Board {
  constructor(width, height, cellSize, stepFunction) {
    this.width        = width
    this.height       = height
    this.cellSize     = cellSize
    this.columns      = {}
    this.cells        = []
    this.columnArray  = []
    this.stepFunction = stepFunction
    this.createGrid()
    this.createCells()
    this.getCells()
    this.findCellNeighbors()
    console.log(this.cells)
  }


  createGrid() {
    //Create columns
    for (
      let i = 0;
      i < this.width + (this.cellSize + 1);
      i += this.cellSize
    ) {
      this.columns[i] = new Column(i, this.cellSize, this.height, this, i)
    }
  }

  createCells(){
    for(let column in this.columns){
      this.columnArray.push(this.columns[column])
    }
    this.columnArray.forEach(c=>{
      c.makeColumn()
    })
  }

  getCells() {
    for(let column in this.columns){
      for(let cell in this.columns[column].cells){
        this.cells.push(this.columns[column].cells[cell])
      }
    }
  }

  findCellNeighbors(){
    this.cells.forEach(cell => {
      cell.findNeighbors()
    })
  }

  update(){
    this.cells.forEach(c => {
      this.stepFunction(c)
    })
  }
}



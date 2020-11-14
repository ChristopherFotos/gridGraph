class Board {
  constructor(width, height, cellSize, stepFunction, updateInterval, cellByCell = true) {
    this.width        = width  ;
    this.height       = height ;
    this.cellByCell   = cellByCell;
    this.cellSize     = cellSize; 
    this.updateInterval = updateInterval
    this.columns      = {};
    this.cells        = [];
    this.state        = {}
    this.cellLookup   = {};
    this.columnArray  = [];
    this.stepFunction = stepFunction;
    this.createGrid();
    this.createCells();
    this.getCells();
    this.findCellNeighbors();
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

  update(board){
    console.log(board.cellByCell)

      if(board.cellByCell){board.cells.forEach(c => {
        board.stepFunction(c)
      })

      board.cells.forEach(c => {
        if(c.newState){
        c.adoptNewState()
        if(c.newState.updates){
          c.newState.updates()
        }
        }
      })}
    
    if(!board.cellByCell){
      console.log('false running')
      board.stepFunction()
    }
  }

  start(){
    this.stopID = setInterval(this.update, this.updateInterval, this)
  }


  stop(){
    if(this.stopID)clearInterval(this.stopID)
  }

  clear(){
    this.columns = {}
    this.createGrid()
  }
}



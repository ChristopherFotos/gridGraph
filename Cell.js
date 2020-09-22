class Cell {
  constructor(left, top, size, column, id, cellObject, neighborColumns) {
    this.id              = id
    this.HTMLid          = column.id.toString() + '_' + id.toString()
    this.state           = {} 
    this.newState        = {}
    this.cellObject      = cellObject
    this.column          = column
    this.board           = this.column.board
    this.neighborColumns = neighborColumns 
    this.left            = left;
    this.top             = top;
    this.size            = size; 
    this.neighbors       = {}    
    this.addToLookupTable()                                            /* remember: the neighborhood can be as large as you want because you can reference your */
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
    cell.classList.add     ('cell')
    cell.dataset.cell    = this.HTMLid
    body.append(cell)
    this.div = cell
  }

  addToLookupTable(){
    this.column.board.cellLookup[this.HTMLid] = this
  }

  findNeighbors(){
    this.neighbors.top                                         = this.cellObject[this.id - this.column.board.cellSize ]
    this.neighbors.bottom                                      = this.cellObject[this.id + this.column.board.cellSize ]
    if(this.neighborColumns.left )  this.neighbors.left        = this.neighborColumns.left.cells  [this.id]
    if(this.neighborColumns.right)  this.neighbors.right       = this.neighborColumns.right.cells [this.id]
    if(this.neighborColumns.left )  this.neighbors.topleft     = this.neighborColumns.left.cells  [this.id - this.size]
    if(this.neighborColumns.right)  this.neighbors.topRight    = this.neighborColumns.right.cells [this.id - this.size]
    if(this.neighborColumns.right)  this.neighbors.bottomRight = this.neighborColumns.right.cells [this.id + this.size]
    if(this.neighborColumns.left)   this.neighbors.bottomLeft  = this.neighborColumns.left.cells  [this.id + this.size]
  }

  adoptNewState(){
    if(this.newState){
      this.state = this.newState
      if(this.newState.updates){
        let boundUpdate = this.newState.updates.bind(this)
        boundUpdate()
      }
    }
    this.newState = {}
  }

  
}

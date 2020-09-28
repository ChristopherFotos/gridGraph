class Snake {
    constructor(startPosition, startLength, startDirection, board){
        this.startPosition  = startPosition
        this.startLength    = startLength
        this.board          = board
        this.direction      = startDirection
        this.startDirection = startDirection
        this.cells          = {}  
        this.createSnake()
    }

    createSnake(){
        this.cells.head = this.startPosition


        for(let i = 2, workingCell = this.cells.head; i < this.startLength; i++){
            let picker
            switch (this.startDirection) {
                case 'left':
                    picker = 'right'
                    break;
                case 'right':
                    picker = 'left'
                    break;
                case 'up':
                    picker = 'bottom'
                    break;
                case 'down':
                    picker = 'top'
                    break;
            }

            this.cells[i] = workingCell.neighbors[picker]
            workingCell   = this.cells[i]
            console.log('run once')
        }

        for(let cell in this.cells){
            this.cells[cell].div.classList.add('a')
        }
    }
    
    move(){
        let picker
        console.log(this.cells)
        switch (this.direction) {
            case 'left':
                picker = 'right'
 
                break;
            case 'right':
                picker = 'left'
                break;
            case 'up':
                picker = 'bottom'
                break;
            case 'down':
                picker = 'top'
                break;
        }

        for(let cell in this.cells){
            console.log(this.cells[cell])
            if(cell === 'head'){
                this.cells.head = this.cells.head.neighbors.right
            }
        }
    }

    grow(){

    }

    setDirection(key){

    }

    getDirection(){

    }

    getCells(){

    }

}
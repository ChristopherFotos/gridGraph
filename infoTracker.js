

let numOfParticles = () => {

        let num = 0
        for(let i=0; i < board.cells.length; i++){
            if(board.cells[i].state.particle){
                num ++
            }
        }
        return num
}

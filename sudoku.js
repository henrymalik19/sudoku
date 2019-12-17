// let sudoku = document.getElementById('sudoku');
// let row = document.createElement('div');

(function(global) {
    
    /* HELPER FUNCTIONS ####################################
    ########################################################
    #######################################################*/

    function getRandomNum(max) {
        // Returns a random number between 1 & max (not inclusive)
        return (Math.floor(Math.random() * max) + 1);
    };

    function isNumInRow(n, row) {
        return (row.findIndex(val => val === n) !== -1);
    };

    /* HELPER FUNCTIONS ####################################
    ########################################################
    #######################################################*/

    /* BOARD FUNCTIONS #####################################
    ########################################################
    #######################################################*/

    function getFirstRow(length) {        
        // empty array to hold all values
        let row = [];

        // numbers (indexes) in rach row
        for(let i = 0; i < length; i++) {
            
            // Get a new random number
            let n = getRandomNum(length);

            // Make sure no duplicates in row
            while(isNumInRow(n, row)) {
                // if number is already in row get new number
                n = getRandomNum(length);
            };
            // Add number to row
            row.push(n);
        };
        return row;
    }

    function getNextRow(previousRow, spliceIndex) {
        let nextRow = Array.from(previousRow);
        let shift = nextRow.splice(0,spliceIndex);
        nextRow = nextRow.concat(shift);

        return nextRow;
    }

    function generateBoard(dim) { // dim sets height and width (dim x dim) of the board
        let length = dim * dim;
        let board = [];
        let previousRow = [];

        for(r = 0; r < length; r++){
            
            // Get Random First Row and Add to Board
            if(r === 0) {
                let firstRow = getFirstRow(length);
                board.push(firstRow);
                previousRow = firstRow;
            } 

            // Rows That are Divisible by dim Need to be shifted (index 0) to the end 
            else if((r % dim) === 0) {
 
                let nextRow = getNextRow(previousRow, 1);
                board.push(nextRow);
                previousRow = nextRow;
            }
            // Rows Remaining Need to be shifted (index 0:dim) to the end 
            else {
                let nextRow = getNextRow(previousRow, dim);
                board.push(nextRow);
                previousRow = nextRow;
            };
        };

        return board;
    }
    function shuffleboard(board, dim) {
        let shuffledBoard = [];

        // Shuffle from front
        for(i = 0; i < 100; i++) {

            let toColF = ((getRandomNum(dim-1) * dim)); // Get a Number to Move First Column to (between 1 & dim (not inclusive))
            let toColB = ((getRandomNum(dim-1) * dim)); // Get a Number to Move First Column to (between 1 & dim (not inclusive))

            for(r = 0; r < board.length; r++) {
    
                let row = Array.from(board[r]);
                let valF = row.shift(); // Get first element
                row.splice(toColF, 0, valF); // Move first element in rach row to a new column
                let valB = row.pop(); // Get last element
                row.splice(toColB+1, 0, valB); // Move last element in rach row to a new column

                shuffledBoard.push(row);
    
                if(shuffledBoard.length > (dim*dim)){
                    shuffledBoard.shift();
                };
        
            };

        };

        // // ROTATE BOARD
        // let shuffledBoardB = [];
        // for(r = 0; r < shuffledBoard.length; r++){
        //     let row = [];
        //     for(i = shuffledBoard[r].length -1; i > 0; i--){
        //         row.push(shuffledBoard[r][i]);
        //     };
        //     shuffledBoardB.unshift(row);
        // };

        return shuffledBoard;
    }

    /* BOARD FUNCTIONS #####################################
    ########################################################
    #######################################################*/



    /* DECLARE SUDOKY OBJECT ###############################
    ########################################################
    #######################################################*/
    let Sudoku = global.Sudoku = {
        board: [],
        fillBoard: '',
        solveBoard: '',
    };


    Sudoku.fillBoard = function(dim) {

        let board = generateBoard(dim);
        let shuffledBoard = shuffleboard(board, dim);
        // board = removeNums(board);
        console.log(board);
        this.board = shuffledBoard;
    };
})(this);

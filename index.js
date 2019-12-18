(function() {
    
    const Sudoku = window.Sudoku; // local variable points to Sudoku Object
    const boardSize = 3; // Board size x Board size

    const fillBtn = document.getElementById('fill'); // Grab Button to Fill Board
    const solveBtn = document.getElementById('solve'); // Grab Button to Solve Board
    const gameDiv = document.getElementById('game-area'); // Area will game is injected
    let chooseNumDiv = document.getElementById('choose-num'); // Area for number available in selected square
    let currentActive;

    fillBtn.addEventListener('click', e => { // add event listener to fill the board
        gameDiv.innerHTML = '';
        Sudoku.boardToDOM(Sudoku.getBoard(boardSize), gameDiv); // we get a board and then add board to dom
    });

    Sudoku.handleClick = function(e) { // handle clicking on square
        if(currentActive) currentActive.classList.toggle('active'); // toggle class that is currently active
        currentActive = e.target;
        currentActive.classList.toggle('active'); // make new active class active

        chooseNumDiv.innerText = ''; // Clear div so no data is left over when we add more
        let range = Array.from(Array(boardSize*boardSize + 1).keys()); // array from 0 to length of board (board * board)
        range.shift(); // we do not need zero so remove

        range.forEach(num => {
            let numDiv = document.createElement('div');
            numDiv.className = 'num-avail';
            numDiv.innerText = num;
            chooseNumDiv.appendChild(numDiv);
        });
        chooseNumDiv.style.display = 'flex';
    };


    Sudoku.boardToDOM(Sudoku.getBoard(boardSize), gameDiv); // fill board on start
})();



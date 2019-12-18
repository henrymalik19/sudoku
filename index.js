(function() {
    
    const Sudoku = window.Sudoku; // local variable points to Sudoku Object
    const boardSize = 3; // Board size x Board size

    const fillBtn = document.getElementById('sudoku-fill'); // Grab Button to Fill Board
    const solveBtn = document.getElementById('sudoku-solve'); // Grab Button to Solve Board
    const boardDiv = document.getElementById('sudoku-board'); // Area will game is injected
    let chooseNumDiv = document.getElementById('sudoku-choose-nums'); // Area for number available in selected square
    let boardItem = {
        previous: '',
        current: ''
    };
    let numSelection = {
    previous: '',
    current: ''
    };

    function handleNumAvailClick(e) {
        numSelection.previous = numSelection.current; // set previous current clicked number selection to previous so active class can be toggled
        if(numSelection.previous) numSelection.previous.classList.remove('active'); // Remove Previous Active Num Selection Active Class

        numSelection.current = e.target; // make current clicked number selection
        numSelection.current.classList.add('active'); // give current item active class
        boardItem.current.innerText = numSelection.current.innerText; // make board square text equal to current item value
        console.log(numSelection);
    };

    function handleBoardClick(e) { // handle clicking on square
        boardItem.previous = boardItem.current; // set previous current clicked square to previous so active class can be toggled

        if(boardItem.previous) boardItem.previous.classList.remove('active'); // toggle previously clicked squares active class
        boardItem.current = e.target; // set current clicked square
        boardItem.current.classList.add('active'); // give current clicked square active class

        chooseNumDiv.innerText = ''; // Clear div so no data is left over when we add more
        let range = Array.from(Array(boardSize*boardSize + 1).keys()); // array from 0 to length of board (board * board)
        range.shift(); // we do not need zero so remove

        range.forEach(num => {
            let numDiv = document.createElement('div');
            numDiv.className = 'num-avail';
            // if(e.target.innerText === num.toString()) {
            //     numDiv.classList.add('active');
            //     numSelection.current = numDiv;
            // };
            numDiv.innerText = num;
            numDiv.addEventListener('click', handleNumAvailClick);
            chooseNumDiv.appendChild(numDiv);
        });
        chooseNumDiv.style.display = 'flex';
    };

    function boardToDOM(board, rootEl) {

        board.forEach(row => {
            rowDiv = document.createElement('div');
            rowDiv.className = 'sudoku-board-row';
    
            row.forEach(el => {
                let elDiv = document.createElement('div');
                elDiv.innerText = el;

                elDiv.classList.add('sudoku-board-item');

                if(el === '') {    
                    elDiv.classList.add('interactive');
                    elDiv.addEventListener('click', handleBoardClick);
                };
                
                rowDiv.appendChild(elDiv);
            });
            rootEl.appendChild(rowDiv);
        });  
    };


    fillBtn.addEventListener('click', e => { // add event listener to fill the board
        boardDiv.innerHTML = '';
        chooseNumDiv.innerHTML = '';
        boardToDOM(Sudoku.getBoard(boardSize), boardDiv); // we get a board and then add board to dom
    });

    solveBtn.addEventListener('click', e => { // add event listener to fill the board
        console.log('Solve Board!');
    });

    boardToDOM(Sudoku.getBoard(boardSize), boardDiv); // fill board on start
})();



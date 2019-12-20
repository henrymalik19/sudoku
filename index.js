(function() {
    
    const Sudoku = window.Sudoku; // local variable points to Sudoku Object
    const boardSize = 3; // Board size x Board size
    let boardItem = '';
    let numSelection = '';
    
    const fillBtn = document.getElementById('sudoku-fill'); // Grab Button to Fill Board
    const solveBtn = document.getElementById('sudoku-solve'); // Grab Button to Solve Board
    const boardDiv = document.getElementById('sudoku-board'); // Area will game is injected
    const chooseNumDiv = document.getElementById('sudoku-choose-nums'); // Area for number available in selected square


    function handleNumAvailClick(e) {
        if(e.target.innerText === boardItem.innerText) { // if they are the same
            boardItem.innerText = ''; // board item is cleared 'deselected'
            e.target.classList.remove('active'); // num selection active is removed
            numSelection = ''; // number selection is set to empty
        } else {
            if(document.querySelector('.num-avail.active')) document.querySelector('.num-avail.active').classList.toggle('active');
            numSelection = e.target;
            numSelection.classList.toggle('active');
            boardItem.innerText = numSelection.innerText;
        };
    };

    function handleBoardClick(e) { // handle clicking on square
        if(document.querySelector('.interactive.active')) document.querySelector('.interactive.active').classList.toggle('active');
        if(document.querySelector('.num-avail.active')) document.querySelector('.num-avail.active').classList.toggle('active');
        boardItem = e.target;
        boardItem.classList.toggle('active');

        if(boardItem.innerText) {
            document.querySelectorAll('.num-avail').forEach(el =>{
                if(el.innerText === boardItem.innerText) {
                    numSelection = el;
                    numSelection.classList.toggle('active');
                };
            });
        };

        if(!chooseNumDiv.innerHTML) {
            chooseNumDiv.innerText = ''; // Clear div so no data is left over when we add more
            let range = Array.from(Array(boardSize*boardSize + 1).keys()); // array from 0 to length of board (board * board)
            range.shift(); // we do not need zero so remove

            range.forEach(num => {
                let numDiv = document.createElement('div');
                numDiv.className = 'num-avail';
                numDiv.innerText = num;
                numDiv.addEventListener('click', handleNumAvailClick);
                chooseNumDiv.appendChild(numDiv);
            });
            chooseNumDiv.style.display = 'flex';
        };
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
        boardToDOM(Sudoku.getBoard(boardSize, 3), boardDiv); // we get a board and then add board to dom
    });

    solveBtn.addEventListener('click', e => { // add event listener to fill the board
        console.log('Solve Board!');
    });

    boardToDOM(Sudoku.getBoard(boardSize, 3), boardDiv); // fill board on start
})();



(function() {
    
    const Sudoku = window.Sudoku; // local variable points to Sudoku Object
    const boardSize = 3; // Board size x Board size
    let boardItem = '';
    let numSelection = '';
    
    const fillBtn = document.getElementById('sudoku-fill'); // Grab Button to Fill Board
    const solveBtn = document.getElementById('sudoku-solve'); // Grab Button to Solve Board
    const boardDiv = document.getElementById('sudoku-board'); // Area will game is injected
    const chooseNumDiv = document.getElementById('sudoku-choose-nums'); // Area for number available in selected square

    function validateSelection(boardItem) {

        function inRow() {
            let dup = false;
            boardItem.parentNode.childNodes.forEach(child => {
                if(child !== boardItem) {
                    if(child.innerText === boardItem.innerText) {
                        dup = true;
                        child.classList.add('duplicateNum');
                        boardItem.classList.add('duplicateNum');
    
                        setTimeout(()=> {
                            child.classList.remove('duplicateNum');
                            boardItem.classList.remove('duplicateNum');
                            boardItem.innerText = '';
                            numSelection.classList.remove('active');
                            numSelection = '';
                        },500);
                    };
                };
            });
            return dup;
        };
        function inCol() {
            let dup = false;
            let index = Array.from(boardItem.parentNode.childNodes).indexOf(boardItem);

            boardDiv.childNodes.forEach(row => {
                if(row.childNodes[index] !== boardItem) {
                    if(row.childNodes[index].innerText === boardItem.innerText) {
                        dup = true;
                        row.childNodes[index].classList.add('duplicateNum');
                        boardItem.classList.add('duplicateNum');

                        setTimeout(()=> {
                            row.childNodes[index].classList.remove('duplicateNum');
                            boardItem.classList.remove('duplicateNum');
                            boardItem.innerText = '';
                            numSelection.classList.remove('active');
                            numSelection = '';
                        },500);
                    };
                };
            });
        }

        if(inRow()) return;
        if(inCol()) return;
    }


    function handleNumAvailClick(e) {
        if(e.target.innerText === boardItem.innerText) { // if they are the same
            boardItem.innerText = ''; // board item is cleared 'deselected'
            e.target.classList.remove('active'); // num selection active is removed
            numSelection = ''; // number selection is set to empty
        } else {
            if(numSelection) numSelection.classList.toggle('active');
            numSelection = e.target;
            numSelection.classList.toggle('active');
            boardItem.innerText = numSelection.innerText;
            validateSelection(boardItem);
        };
    };

    function handleBoardClick(e) { // handle clicking on square
        if(boardItem) boardItem.classList.toggle('active');
        if(numSelection) numSelection.classList.toggle('active');
        boardItem = e.target;
        boardItem.classList.toggle('active');
        numSelection = '';

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
        document.getElementById('sudoku-solve').disabled = false;
    });

    solveBtn.addEventListener('click', e => { // add event listener to fill the board
        e.target.disabled = true;
        Sudoku.solution.forEach((row, ri) => {
            row.forEach((el, ei) => {
                if(boardDiv.childNodes[ri].childNodes[ei].classList.contains('interactive')) {
                    boardDiv.childNodes[ri].childNodes[ei].classList.add('solved');
                    boardDiv.childNodes[ri].childNodes[ei].classList.remove('interactive');
                    boardDiv.childNodes[ri].childNodes[ei].innerText = el;
                    boardDiv.childNodes[ri].childNodes[ei].removeEventListener('click', handleBoardClick);
                    chooseNumDiv.innerHTML = '';
                } 
            });
        });
    });

    boardToDOM(Sudoku.getBoard(boardSize, 3), boardDiv); // fill board on start
})();



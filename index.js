const Sudoku = window.Sudoku;
Sudoku.fillBoard(3);

const gameDiv = document.getElementById('game-area');

Sudoku.board.forEach(row => {
    console.log(row);
    rowDiv = document.createElement('div');
    rowDiv.className = 'board-row';

    row.forEach(el => {
        elDiv = document.createElement('div');
        elDiv.innerText = el;
        elDiv.className = 'board-item';
        elDiv.addEventListener('click', () => console.log('!'));
        rowDiv.appendChild(elDiv);
    });

    gameDiv.appendChild(rowDiv);
});
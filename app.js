const WinningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
];

let board;
let turn;
let tie;
let winner;

const messageEl = document.querySelector('#message');
const squareEls = document.querySelectorAll('.sqr');

const init = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X'; 
    winner = false;
    tie = false;
    

    squareEls.forEach(square => {
        square.classList.remove('filled', 'winner-animation');
    });
    messageEl.classList.remove('winner-animation');
    
    render();
};

const render = () => {
    updateBoard();
    updateMessage();
};

const updateBoard = () => {
    board.forEach((value, idx) => {
        squareEls[idx].textContent = value;
        if (value !== '') {
            squareEls[idx].classList.add('filled');
        } else {
            squareEls[idx].classList.remove('filled');
        }
    });
};

const place = (idx) => {
    board[idx] = turn;
};

const checkTie = () => {
    if (winner) return;
    if (!board.includes('')) {
        tie = true;
    }
};

const checkWinner = () => {
    for (let combo of WinningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = board[a];

            messageEl.classList.add('winner-animation');
            return;
        }
    }
};

const switchPlayerTurn = () => {
    if (winner || tie) return;
    turn = turn === 'X' ? 'O' : 'X';
};

const handleClick = (evt) => {
    const sqIdx = parseInt(evt.target.id); 
    const squareIsFull = board[sqIdx] !== '';


    if (squareIsFull || winner || tie) return;

    place(sqIdx);
    checkWinner();
    checkTie();
    render();


    if (!winner && !tie) {
        switchPlayerTurn();
    }
};

const updateMessage = () => {
    if (!winner && !tie) {
        messageEl.textContent = turn === 'X' 
            ? "X's turn!" 
            : "O's turn!";
    } else if (tie && !winner) {
        messageEl.textContent = "It's a tie!";
    } else if (winner) {
        messageEl.textContent = winner === 'X' 
            ? 'X wins!' 
            : 'O wins!';
    }
};

// Add event listeners
squareEls.forEach((square) => {
    square.addEventListener('click', handleClick);
});


document.addEventListener('DOMContentLoaded', init);
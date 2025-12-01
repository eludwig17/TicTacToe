// Game state variables
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

// All possible winning combinations
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Get all DOM elements
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const winnerDisplay = document.getElementById('winnerDisplay');
const message = document.getElementById('message');
const btn = document.getElementById('btn');
const scoreXDisplay = document.getElementById('scoreX');
const scoreODisplay = document.getElementById('scoreO');

// Set up event listeners when page loads
function init() {
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    resetBtn.addEventListener('click', resetGame);
    btn.addEventListener('click', closeAndReset);
    updateStatus();
}

// Process player's move when they click a cell
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (!gameActive || board[clickedCellIndex] !== '') {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());

    checkResult();
}

// Check if someone won or if it's a draw
function checkResult() {
    let roundWon = false;
    let winningCombination = null;

    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        const a = board[condition[0]];
        const b = board[condition[1]];
        const c = board[condition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            winningCombination = condition;
            break;
        }
    }

    if (roundWon) {
        handleWin(winningCombination);
        return;
    }

    if (!board.includes('')) {
        handleDraw();
        return;
    }

    switchPlayer();
}

// Handle win scenario - update scores and show winner
function handleWin(winningCombination) {
    gameActive = false;

    winningCombination.forEach(index => {
        cells[index].classList.add('winning');
    });

    if (currentPlayer === 'X') {
        scoreX++;
        scoreXDisplay.textContent = scoreX;
        scoreXDisplay.classList.add('updated');
        setTimeout(() => scoreXDisplay.classList.remove('updated'), 500);
    } else {
        scoreO++;
        scoreODisplay.textContent = scoreO;
        scoreODisplay.classList.add('updated');
        setTimeout(() => scoreODisplay.classList.remove('updated'), 500);
    }

    const winnerText = `Player ${currentPlayer} Wins!`;
    statusDisplay.textContent = winnerText;
    statusDisplay.classList.add('winner');

    setTimeout(() => {
        showWinnerDisplay(winnerText);
    }, 800);
}

// Handle draw scenario - no winner
function handleDraw() {
    gameActive = false;
    const drawText = "It's a Draw!";
    statusDisplay.textContent = drawText;
    statusDisplay.classList.add('winner');

    setTimeout(() => {
        showWinnerDisplay(drawText);
    }, 800);
}

// Switch between X and O players
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
}

// Update the status message showing whose turn it is
function updateStatus() {
    if (gameActive) {
        statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
        statusDisplay.classList.remove('winner');
    }
}

// Display the winner popup with message
function showWinnerDisplay(msg) {
    message.textContent = msg;
    winnerDisplay.classList.add('show');
}

// Close popup and start new game
function closeAndReset() {
    winnerDisplay.classList.remove('show');
    setTimeout(resetGame, 300);
}

// Reset all game state and UI to start fresh
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winning');
    });

    updateStatus();
    winnerDisplay.classList.remove('show');
}

// Initialize game when page is ready
document.addEventListener('DOMContentLoaded', init);
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('resetGame');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        gameBoard[clickedCellIndex] = currentPlayer;
        clickedCell.innerText = currentPlayer;

        checkResult();
    }

    function checkResult() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c] && gameBoard[a] !== '') {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            showMessage(`${currentPlayer} has won!`, 'green');
            gameActive = false;
            return;
        }

        if (!gameBoard.includes('')) {
            showMessage('Draw!', 'red');
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function resetGame() {
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        cells.forEach(cell => cell.innerText = '');
        document.getElementById('messageText').classList.remove('glow-green', 'glow-red');
    }

    function showMessage(message, color) {
        const messageText = document.getElementById('messageText');
        messageText.innerText = message;
        if (color === 'green') {
            messageText.classList.add('glow-green');
        } else {
            messageText.classList.add('glow-red');
        }
        $('#messageModal').modal('show');

        // Automatically reset the game after 3 seconds
        setTimeout(() => {
            $('#messageModal').modal('hide');
            resetGame();
        }, 3000);
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
});

const CPU_NAME = 'cpu';

const Gameboard = () => {
    let board = Array(9).fill("");
    
    const getBoard = () => board;

    const setCell = (index, symbol) => {
        if (board[index] === "") {
            board[index] = symbol;
            return true;
        }
        return false;
    };
    
    const resetBoard = () => {
        board = Array(9).fill("");
    };

    return { getBoard, setCell, resetBoard };
}

const Player = (name, symbol) => {
    return { name, symbol };
}

const GameController = (() => {
    const board = Gameboard();
    let players = [];
    let currentPlayerIndex = 0;
    let isGameOver = false;

    const init = () => {
        players = [Player("Player 1", "X"), Player("Player 2", "O")];
        currentPlayerIndex = 0;
        isGameOver = false;
        board.resetBoard();
        renderBoard();
        updateStatus();
    };

    const playTurn = (index) => {
        if (isGameOver || !board.setCell(index, players[currentPlayerIndex].symbol)) {
            return;
        }
        renderBoard();
        if (checkWinner()) {
            document.getElementById("status").innerText = `${players[currentPlayerIndex].name} wins!`;
            isGameOver = true;
        } else if (board.getBoard().every(cell => cell !== "")) {
            document.getElementById("status").innerText = "It's a draw!";
            isGameOver = true;
        } else {
            currentPlayerIndex = 1 - currentPlayerIndex;
            updateStatus();
        }
    };

    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        return winPatterns.some(pattern => 
            pattern.every(index => board.getBoard()[index] === players[currentPlayerIndex].symbol)
        );
    };

    const renderBoard = () => {
        const gameboardDiv = document.getElementById("gameboard");
        gameboardDiv.innerHTML = "";
        board.getBoard().forEach((cell, index) => {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");
            cellDiv.innerText = cell;
            cellDiv.addEventListener("click", () => playTurn(index));
            gameboardDiv.appendChild(cellDiv);
        });
    };

    const updateStatus = () => {
        document.getElementById("status").innerText = `${players[currentPlayerIndex].name}'s turn (${players[currentPlayerIndex].symbol})`;
    };

    document.getElementById("restart").addEventListener("click", init);

    return { init };
})();

GameController.init();
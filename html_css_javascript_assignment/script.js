let currentScore = 0;
let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;
let gameOver = false;

function rollDice() {
    if (gameOver) return;

    let dice = Math.floor(Math.random() * 6) + 1;
    document.getElementById("diceImage").src = `dice ${dice}.png`;

    if (dice === 1) {
        currentScore = 0;
        switchTurn();
    } else {
        currentScore += dice;
        document.getElementById(`player${currentPlayer}Current`).innerText = currentScore;
    }
}

function saveScore() {
    if (gameOver) return;

    if (currentPlayer === 1) {
        player1Score += currentScore;
        document.getElementById("player1Saved").innerText = player1Score;
        if (player1Score >= 100) {
            announceWinner(1);
            return;
        }
    } else {
        player2Score += currentScore;
        document.getElementById("player2Saved").innerText = player2Score;
        if (player2Score >= 100) {
            announceWinner(2);
            return;
        }
    }

    currentScore = 0;
    switchTurn();
}

function switchTurn() {
    currentScore = 0;
    document.getElementById(`player${currentPlayer}Current`).innerText = currentScore;
    currentPlayer = currentPlayer === 1 ? 2 : 1;
}

function announceWinner(player) {
    gameOver = true;
    let winnerName = document.getElementById(`player${player}Name`).value;
    document.getElementById("winner").innerText = `${winnerName} Wins 🎉`;
}

function resetGame() {
    currentScore = 0;
    player1Score = 0;
    player2Score = 0;
    currentPlayer = 1;
    gameOver = false;

    document.getElementById("player1Saved").innerText = 0;
    document.getElementById("player2Saved").innerText = 0;
    document.getElementById("player1Current").innerText = 0;
    document.getElementById("player2Current").innerText = 0;
    document.getElementById("winner").innerText = "";

    console.log("Game Reset Successfully 🎯");
}

let player1Score = 0;
let player2Score = 0;
let player1 = "X";
let player2 = "O";
let currentPlayer = player1;
let boxes = {
  row1: { box1: "", box2: "", box3: "" },
  row2: { box1: "", box2: "", box3: "" },
  row3: { box1: "", box2: "", box3: "" },
};

updatePlayerScore();

function playerScore() {
  if (currentPlayer === player1) {
    player1Score++;
  } else if (currentPlayer === player2) {
    player2Score++;
  }
  updatePlayerScore();
}

function updatePlayerScore() {
  let player1Display = document.querySelector(".player1");
  let player2Display = document.querySelector(".player2");
  player1Display.innerHTML = "Player X: " + player1Score;
  player2Display.innerHTML = "Player O: " + player2Score;
}

function playerTurn() {
  currentPlayer = currentPlayer === player1 ? player2 : player1;
  return currentPlayer;
}

function checkBox(row, box) {
  return boxes[row][box] === "";
}

function resetBoard() {
  for (let i = 1; i <= 3; i++) {
    let rowKey = "row" + i;
    for (let e = 1; e <= 3; e++) {
      let boxKey = "box" + e;
      let screenBox = document.querySelector(`.${rowKey}#${boxKey}`);
      screenBox.innerHTML = e;
    }
  }
  boxes = {
    row1: { box1: "", box2: "", box3: "" },
    row2: { box1: "", box2: "", box3: "" },
    row3: { box1: "", box2: "", box3: "" },
  };
}

function checkDraw() {
  for (let row in boxes) {
    for (let box in boxes[row]) {
      if (boxes[row][box] === "") {
        return false;
      }
    }
  }
  return true;
}

function checkWin() {
  for (let i = 1; i <= 3; i++) {
    let row = "row" + i;
    if (
      boxes[row].box1 === currentPlayer &&
      boxes[row].box2 === currentPlayer &&
      boxes[row].box3 === currentPlayer
    ) {
      playerScore();
      resetBoard();
      return currentPlayer;
    }
  }
  for (let i = 1; i <= 3; i++) {
    let box = "box" + i;
    if (
      boxes.row1[box] === currentPlayer &&
      boxes.row2[box] === currentPlayer &&
      boxes.row3[box] === currentPlayer
    ) {
      playerScore();
      resetBoard();
      return currentPlayer;
    }
  }
  if (
    boxes.row1.box1 === currentPlayer &&
    boxes.row2.box2 === currentPlayer &&
    boxes.row3.box3 === currentPlayer
  ) {
    playerScore();
    resetBoard();
    return currentPlayer;
  } else if (
    boxes.row1.box3 === currentPlayer &&
    boxes.row2.box2 === currentPlayer &&
    boxes.row3.box1 === currentPlayer
  ) {
    playerScore();
    resetBoard();
    return currentPlayer;
  } else if (checkDraw()) {
    resetBoard();
  } else {
    return null;
  }
}

function playerIn() {
  let row = prompt("Pick a row number (1-3):");
  let input = prompt("Pick a box number (1-3):");
  if (row >= 1 && row <= 3 && input >= 1 && input <= 3) {
    let rowKey = "row" + row;
    let boxKey = "box" + input;

    if (checkBox(rowKey, boxKey)) {
      boxes[rowKey][boxKey] = currentPlayer;
      let screenBox = document.querySelector(`.${rowKey}#${boxKey}`);
      screenBox.innerHTML = currentPlayer;
      let winner = checkWin();
      if (winner) {
        alert(`Player ${winner} wins!`);
      } else {
        playerTurn();
      }
    } else {
      alert("Box is already occupied.");
    }
  } else {
    alert("Please pick a valid row and box number.");
  }
  updatePlayerScore();
}

function restart() {
  window.location.reload();
}

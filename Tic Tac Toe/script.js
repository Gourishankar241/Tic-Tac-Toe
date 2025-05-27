let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // true = O's turn, false = X
let count = 0; // total moves

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    box.innerText = turnO ? "O" : "X";
    box.disabled = true;
    count++;
    turnO = !turnO;

    const winnerFound = checkWinner();
    if (!winnerFound && count === 9) {
      gameDraw();
    }
  });
});

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (
      boxes[a].innerText &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[b].innerText === boxes[c].innerText
    ) {
      showWinner(boxes[a].innerText);
      return true;
    }
  }
  return false;
};

const showWinner = (winner) => {
  msg.innerText = `🎉 Congratulations! ${winner} wins!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const gameDraw = () => {
  msg.innerText = "😐 It's a Draw!";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  boxes.forEach((box) => box.disabled = true);
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

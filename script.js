/* =================================
   GET HTML ELEMENTS
================================= */

const playerScoreElement = document.getElementById("playerScore");
const computerScoreElement = document.getElementById("computerScore");

const playerChoiceElement = document.getElementById("playerChoice");
const computerChoiceElement = document.getElementById("computerChoice");

const resultMessage = document.getElementById("resultMessage");

const moveButtons = document.querySelectorAll(".move-btn");
const resetButton = document.getElementById("resetBtn");


/* =================================
   GAME VARIABLES
================================= */

let playerScore = 0;
let computerScore = 0;


/* =================================
   CHOICES AND EMOJIS
================================= */

const choices = ["rock", "paper", "scissors"];

const choiceEmoji = {
  rock: "✊",
  paper: "✋",
  scissors: "✌️"
};


/* =================================
   GET COMPUTER CHOICE
================================= */

function getComputerChoice() {

  // Generate a random number from 0 to 2
  const randomIndex = Math.floor(Math.random() * choices.length);

  // Return random choice
  return choices[randomIndex];
}


/* =================================
   CHECK WINNER
================================= */

function getWinner(player, computer) {

  // Same choices = draw
  if (player === computer) {
    return "draw";
  }

  // Winning combinations
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "player";
  }

  // Otherwise computer wins
  return "computer";
}


/* =================================
   UPDATE CHOICE DISPLAY
================================= */

function updateChoice(element, choice) {

  element.textContent = choiceEmoji[choice];

  // Restart animation
  element.classList.remove("pop");

  // Force browser to restart animation
  void element.offsetWidth;

  element.classList.add("pop");
}


/* =================================
   PLAY GAME
================================= */

function playGame(playerChoice) {

  // Get random computer choice
  const computerChoice = getComputerChoice();

  // Show both choices
  updateChoice(playerChoiceElement, playerChoice);
  updateChoice(computerChoiceElement, computerChoice);

  // Find winner
  const winner = getWinner(playerChoice, computerChoice);


  /* -----------------------------
     UPDATE SCORE AND MESSAGE
  ----------------------------- */

  if (winner === "player") {

    playerScore++;

    resultMessage.textContent = "🎉 You Win!";

  } else if (winner === "computer") {

    computerScore++;

    resultMessage.textContent = "💻 Computer Wins!";

  } else {

    resultMessage.textContent = "🤝 It's a Draw!";

  }


  // Update score on screen
  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;
}


/* =================================
   BUTTON EVENTS
================================= */

moveButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    // Get selected choice from data-choice
    const playerChoice = button.dataset.choice;

    // Start the game
    playGame(playerChoice);

  });

});


/* =================================
   RESET GAME
================================= */

resetButton.addEventListener("click", function () {

  // Reset scores
  playerScore = 0;
  computerScore = 0;

  // Update score display
  playerScoreElement.textContent = "0";
  computerScoreElement.textContent = "0";

  // Reset choices
  playerChoiceElement.textContent = "❔";
  computerChoiceElement.textContent = "❔";

  // Reset message
  resultMessage.textContent = "Make your move!";

});
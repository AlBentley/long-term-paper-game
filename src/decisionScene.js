let currentDate;
let isPlaying = false;
let nextChangeTime = 0;
let gameFinished = false; // Flag to indicate if the game has finished
let bankBalance = 100000; // Initial bank balance


function drawDecisionScene() {
  // Display the background image
  image(bgImage, 0, 0, width, height); // Adjust image to cover canvas
  
  if (!gameFinished) {
    if (isPlaying && millis() > nextChangeTime) {
      incrementDay();
      nextChangeTime = millis() + 250; // Next increment in 0.5 seconds
    }

    // Set up black background for date
    fill(0); // Black fill
    noStroke(); // No border
    rect(0, 0, 200, 45); // Adjust size as needed for the date display

    // Display the date
    fill(255, 0, 0); // Red color for the "alarm clock" effect
    displayDate();

    // Display bank balance
    displayBankBalance();
    
    // Display instruction with a background in the middle bottom
    displayInstruction();
  } else {
    displayFinishMessage();
    if (song.isPlaying()) {
      song.pause(); // Pause the song when the game finishes
    }
  }
}

function keyPressed() {
  if (keyCode === 32) { // Space bar
    if (!gameFinished) {
      isPlaying = !isPlaying;
      if (isPlaying && !song.isPlaying()) {
        song.loop(); // Play the song if the game is playing
      } else if (!isPlaying && song.isPlaying()) {
        pauseSong.play();
        song.pause(); // Pause the song if the game is paused  
      }
    } else {
      resetGame();
    }
  }
}

function incrementDay() {
  currentDate.setDate(currentDate.getDate() + 1);
  if (currentDate >= new Date(1990, 0, 1)) {
    gameFinished = true;
  }
}

function displayDate() {
  textSize(24); // Reset text size for the date display
  text(currentDate.toDateString().substring(4, 10) + " " + currentDate.getFullYear(), 10, 10);
}

function displayInstruction() {
  fill(50); // Dark grey background for contrast
  rect(width / 2 - 110, height - 40, 220, 30); // Positioning in the middle bottom
  fill(255); // White text for visibility
  textSize(16); // Text size for instructions
  textAlign(CENTER, CENTER);
  text(isPlaying ? "Hit space to pause" : "Hit space to continue", width / 2, height - 25);
  textAlign(LEFT, TOP); // Reset alignment for other text
}

function displayBankBalance() {
  fill(0); // Black background for bank balance
  noStroke();
  rect(width - 150, 10, 140, 50); // Position and size for the bank balance
  fill(255); // White text
  textSize(16); // Smaller text for the bank balance
  text(`$${bankBalance.toLocaleString()}`, width - 140, 20);
  textSize(14); // Even smaller text for "Cash" label
  text('Cash', width - 140, 40);
}


function displayFinishMessage() {
  textSize(32);
  fill(255); // White color for the text
  text("Game Finished", width / 2 - 100, height / 2);
}

function resetGame() {
  currentDate = new Date(1980, 0, 1);
  gameFinished = false;
  isPlaying = false;
}
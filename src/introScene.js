
 function drawIntro() {
  if (currentIntroScene === 'splash') {
    drawSplash();
  } else if (currentIntroScene === 'intro') {
    drawInstructions();
  } 
}

function drawSplash() {
  background(introImage);
  let paperX = width /2 - 200;
  let paperY = height - 100;
  let paperWidth = 400;
  let paperHeight = 50; // Adjusted for only showing the description

  fill(0); 
  noStroke();
  rect(paperX, paperY, paperWidth, paperHeight, 20); // Slightly rounded corners

  // Event Name and Description
  fill(255); // Black text
  textSize(24);

  textSize(16);
  textAlign(CENTER, CENTER);
  text("press any key to continue", paperX + 200, paperY + 25, ); // Adjust padding as necessary
}


function drawInstructions() {
  background(bgBoss);
  // Draw "paper"
  let paperX = width / 6;
  let paperY = height / 2;
  let paperWidth = (width / 3) * 2;
  let paperHeight = height / 4; // Adjusted for only showing the description

  fill(0); // White paper
  noStroke();
  rect(paperX, paperY, paperWidth, paperHeight, 10); // Slightly rounded corners

  // Event Name and Description
  fill(255); // Black text
  textSize(24);
  textAlign(CENTER, CENTER);

  textSize(16);
  textAlign(LEFT, TOP);
  text("Your internship begins now! You’ve been assigned five stocks. Your job is to read up on everything and assess what you think is a fair value. Every month we'll re-allocate our funds portfolio based on your fair value, the more under valued, the more we'll allocate. Do well and the Junior Analyst role is yours. Reckon you can handle that?", paperX + 20, paperY + 30, paperWidth - 40); // Adjust padding as necessary
}
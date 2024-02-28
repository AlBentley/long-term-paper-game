
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

  fill(000); 
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
  let paperX = width / 4;
  let paperY = height / 2;
  let paperWidth = width / 2;
  let paperHeight = height / 5; // Adjusted for only showing the description

  fill(000); // White paper
  noStroke();
  rect(paperX, paperY, paperWidth, paperHeight, 10); // Slightly rounded corners

  // Event Name and Description
  fill(255); // Black text
  textSize(24);
  textAlign(CENTER, CENTER);

  textSize(16);
  textAlign(LEFT, TOP);
  text("Your internship begins now so listen up! You’ve been assigned five stocks, read up on everything there is to know and send me your fair value estimates by the end of the week, I’ll take it from there. Reckon you can handle that?", paperX + 20, paperY + 30, paperWidth - 40); // Adjust padding as necessary
}
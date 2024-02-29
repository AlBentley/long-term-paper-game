
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
  let paperHeight = height / 2; // Adjusted for only showing the description

  fill(0); // White paper
  noStroke();
  rect(paperX, paperY, paperWidth, paperHeight, 10); // Slightly rounded corners

  // Event Name and Description
  fill(255); // Black text
  textSize(24);
  textAlign(CENTER, CENTER);

  textSize(16);
  textAlign(LEFT, TOP);
  text("Welcome to your first day at Goldmans intern!\n\n You’ve been assigned five stocks. Your job is to read up on everything and assess what you think is a fair value.\n\n Every month the trading desk re-allocates our funds portfolio based on your fair value, the more under valued, the more we'll allocate.\n\n The fund starts with $100,000. Turn that in $500,000 in 5 years and the Junior Analyst role is yours.\n\n Reckon you can handle that? If not we need a new caretaker.\n\n\n Stay liquid,\n-Chad", paperX + 20, paperY + 30, paperWidth - 40); // Adjust padding as necessary
}
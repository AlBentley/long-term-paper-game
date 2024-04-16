
 function drawIntro() {
  if (currentIntroScene === 'splash') {
    drawSplash();
  } else if (currentIntroScene === 'intro') {
    drawInstructions();
  } else if (currentIntroScene === 'onboarding') {
    drawOnboarding();
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
  text("Welcome to your first day at Goldmans intern!\n\n You’ve been assigned five stocks. Your job is to read up on everything and assess what you think is a fair value.\n\n Every month the trading desk re-allocates our funds portfolio based on your fair value, the more under valued, the more we'll allocate.\n\n The fund starts with $100,000. Turn that in $500,000 in 5 years and the Junior Analyst role is yours.\n\n Reckon you can handle that?\n\n\n Stay liquid,\n-Chad", paperX + 20, paperY + 30, paperWidth - 40); // Adjust padding as necessary
}

function drawOnboarding() {
  background(bgBoss);
  // Draw "paper"
  let paperX = width / 6;
  let paperY = height / 2.5;
  let paperWidth = (width / 3) * 2;
  let paperHeight = height / 1.5; // Adjusted for only showing the description

  fill(0); // White paper
  noStroke();
  rect(paperX, paperY, paperWidth, paperHeight, 10); // Slightly rounded corners

  // Event Name and Description
  fill(255); // Black text
  textSize(24);
  textAlign(CENTER, CENTER);

  textSize(13);
  textAlign(LEFT, TOP);
  let txt = "The aim of “Investing at Goldmans” is to practice long term investing. \n\nAll the events, prices and financial data in the game are from real companies which traded in the 1990s and 2000s.\n\nTheir names and the names of competitors have been changed.\n\nInstead of trying to time the market, you need to estimate the fair value.\n\n\nHOW TO PLAY?\nThe game follows 5 companies over a 10 year period from 1995 to 2005.\n\nRead the background and look at the financials for each company to forecast the revenue, earnings and PE multiple to estimate a fair value.\n\nThe trading desk will buy and sell on your behalf. They allocate more to the undervalued stocks and less (or none) for overvalued ones.\n\nEach time a new earnings report is released you have the opportunity to update your forecasts and fair value.\n\nBefore starting you will be asked to submit a fair value for all 5 companies.\n\n\nPro Tip: Use the cursor keys and Enter to quickly navivgate and submit reports."
  text(txt, paperX + 20, paperY + 20, paperWidth - 40); // Adjust padding as necessary
}
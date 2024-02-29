
  
  
  function drawEnding() {
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
    let txt = "";
    if(bankBalance > 500000){
        txt+="Great job Intern!!\n\n You've returned our fund five times over. You've earned that promotion to Junior Analyst. \n\n Now I have a plane to catch.\n\n Stay liquid\n-Chad"
        ///reveal the stock shere
    }
    else if(bankBalance >100000){
        txt+="Better luck next time Intern!\n\n See you in the gents.\n\n Stay liquid\n-Chad"
    }
    else {
        txt+="You've ruined us!!\n\n I'll have to sell the rolls just to keep the company afloat. Get out of my sight."
    }
    text(txt, paperX + 20, paperY + 30, paperWidth - 40); // Adjust padding as necessary
  }
let terminalLeft;
let terminalTop;
let terminalRight;
let terminalBottom;
let terminalWidth;
let terminalHeight;

function drawTimeLine() {
  
  background(bgImg);
  
  //increment date
  incrementDate();

  // Update the stockPrices array to simulate the chart moving over time
  // updatePrices();

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
   //displayInstruction();

  //draw chart
  //drawBarChart(tableExample, 160, 120, 300, 160);

  //find the row of prices
  rowIndex = max(30, companyPricesCSV.getArray().findIndex(x => x[0] === formatDate(currentDate)) );

  drawPortfolio(rowIndex);

  drawStocks(rowIndex);

  drawUpdateLog();
 
}

function drawUpdateLog(){

  fill(255); // White text for visibility
  
  textSize(8); // Text size for instructions
  textAlign(LEFT, BOTTOM); // Reset alignment for other text

  //
  fill(50); // Dark grey background for contrast
  strokeWeight(2);
  stroke(233,28,159);
  rect(terminalLeft + (terminalWidth/3.5), terminalBottom - 90, (terminalWidth/2), 90);
  strokeWeight(0);
  fill(255);
  for (var i = 0; i < 7 ; i++) { 

    let txt = tradeLog[i];
    text(txt, terminalLeft + (terminalWidth/3.5) + 5  , terminalBottom - (i * 12) - 5);
    
  };

}

function drawPortfolio(rowIndex){

  let table = [];

  //header
  table[0] = ["Stock", "Holding", "Gain", "Total Return", "30d return", "Fair Value", "Last Price", "Discount %" ]


  bankBalance = 0;

  for (var i = 0; i < companies.length ; i++) { 

    let holding = fairValues[i].amount_invested;
    bankBalance += holding;

    let last_price = parseFloat(companyPricesCSV.getColumn(companies[i].name)[rowIndex]);
    companies[i].latestPrice = last_price;

    let no_shares = fairValues[i].amount_invested / fairValues[i].avg_price;

    let current_value = no_shares * last_price;
    fairValues[i].current_value = current_value;

    let total_return = last_price/fairValues[i].avg_price * 100; //fairValues[i].capital_gain;

    let monthReturn = parseFloat(
                      companyPricesCSV.getColumn(companies[i].name)[rowIndex]/
                      companyPricesCSV.getColumn(companies[i].name)[rowIndex-30] * 100);

    let FV = fairValues[i].fv;


    let discount = (fairValues[i].fv - last_price)/ fairValues[i].fv * 100;
    fairValues[i].discount = discount/100;

    //["Stock", "Holding", "Total Return", "30d return", "Fair Value", "Last Price", "Discount %" ]
    table[i+1] = [companies[i].name.slice(0,7),
                  "$" + holding.toFixed(0).toString(),
                  "$" + (current_value-holding).toFixed(0).toString(),
                  total_return.toFixed(0).toString() + "%", 
                  monthReturn.toFixed(0).toString() + "%",
                  "$" + FV.toFixed(0).toString(),
                  "$" + last_price.toFixed(0).toString(),
                  discount.toFixed(0).toString() + "%"];

  };
  
  renderTable( table, terminalLeft + (terminalWidth/3.5), terminalTop + 15, width / 2, height / 3.2);

}

function drawStocks(rowIndex){

  // loop through all the stocks and render the charts
  for (var i = 0; i < companies.length ; i++) { 

      let chartHeight = 40;
      let padding = 20;

      let priceData = companyPricesCSV.getColumn(companies[i].name); // Fetch by company name
    
      let chartData = priceData.slice(rowIndex-30, rowIndex).map(function(item) {
        return parseFloat(item);
    });
      
    //width is not accounted for!
      drawLineChart(chartData, terminalLeft, terminalTop + 30 + (i*(chartHeight + padding)), 180, chartHeight, companies[i].name.slice(0,5));

  }
}

function incrementDate(){
  if (!gameFinished) {
    if (isPlaying && millis() > nextChangeTime) {
      incrementDay();
      nextChangeTime = millis() + 50; // Next increment in 0.5 seconds
    }
   
  } else {
    //displayFinishMessage();
    if (song.isPlaying()) {
      song.pause(); // Pause the song when the game finishes
    }
  }
}

function incrementDay() {
  currentDate.setDate(currentDate.getDate() + 1);

  if(currentDate.getDate() == 1) {  //first day of every month
    reviewPortfolio(rowIndex);
  }

  //check if there is an event and if there is display EventScene
  let matchingEvent = eventsJSON.events.find(event => event.date == formatDate(currentDate));
  if (matchingEvent && currentScene != 4) {
    eventSong.play();
    lastEvent=matchingEvent;
    currentScene = 4;
  }


  if (currentDate >= new Date(2005, 0, 1)) {
    gameFinished = true;
  }
}

function displayDate() {
  textSize(14); // Reset text size for the date display
  text("Goldman Pleasure Fund " + currentDate.toDateString().substring(4, 10) + " " + currentDate.getFullYear(), terminalLeft, terminalTop);
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
  //rect(terminalRight - 200, 10, terminalTop, 50); // Position and size for the bank balance
  fill(255); // White text
  textSize(16); // Smaller text for the bank balance
  textAlign(RIGHT, TOP);
  text(`$${bankBalance.toLocaleString()}`, terminalRight, terminalTop);
  textSize(14); // Even smaller text for "Cash" label
  //text('Cash', width - 140, 40);
}


function displayFinishMessage() {
  textSize(32);
  fill(255); // White color for the text
  text("Game Finished", width / 2 - 100, height / 2);
}

function resetGame() {
  currentDate = new Date(1995, 0, 1);
  gameFinished = false;
  isPlaying = false;
}

function formatDate(date) {
  // Extract the year, month, and day from the date object
  let year = date.getFullYear();
  let month = nf(date.getMonth() + 1, 2); // Months are 0-indexed; add 1 to get the correct month number
  let day = nf(date.getDate(), 2); // Pad the day with a leading zero if necessary

  // Concatenate the parts together with dashes
  return `${year}-${month}-${day}`;
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
  } else if (currentScene === 4) { //key handler for Event scene
    //handle keyboard entry for events
    if (keyCode === RIGHT_ARROW && currentEventScene === 'description') {
      currentEventScene = 'financials'; // Switch to financials view
      pageSong.play();
    } else if (keyCode === LEFT_ARROW && currentEventScene === 'financials') {
      currentEventScene = 'description'; // Switch back to description view
      pageSong.play();
    } else if (keyCode === LEFT_ARROW && currentEventScene === 'narrative') {
      currentEventScene = 'financials'; // Switch back to description view
      pageSong.play();
    } else if (keyCode === RIGHT_ARROW && currentEventScene === 'financials') {
      currentScene = 2;
      currentEventScene = 'description';
      eventSong.stop();
    } else if (key === 'U' || key === 'u') {
      drawNarrative();
    } else if (keyCode === ESCAPE) {
      hideNarrative();
    }
  } else if (currentScene === 5) { //key handler for introduction splash screen
    if (currentIntroScene === 'splash') { 
      currentIntroScene === 'intro';
    }
  }
}
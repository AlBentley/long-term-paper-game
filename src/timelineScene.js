let maxStockPrice = 150; // Adjust based on your needs
let currentIndex = 0; // To keep track of the current index in the loaded data

// each time draw runs remove the last value add random value

var marketvalue = []; //81 values that vary. // saves all the positions of the graph
//change scale from 0 to height in map variable
var noiseParam = 0;
var noiseStep = 0.1; // this defines how jagged the curve is

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   noSmooth(); // This disables anti-aliasing, making the line pixelated
// }

function setupTimeLine() {
    for ( var i = 0; i <= width/5; i++) { //this makes it suited for any width
        var n = noise(noiseParam);
        var value = map(n, 0, 1, 0, 160);  //if n = o.5 then value will be halfway between 0 and height
        marketvalue.push(value); //appends the value to the latest market value
        noiseParam += noiseStep;
    } 
}

function drawTimeLine() {
  background(bgImg);
  
  //increment date
  incrementDate();

  // Update the stockPrices array to simulate the chart moving over time
  updatePrices();

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

  //drawPortfolio();

  drawStocks();

  
 
}

function drawStocks(){

  // loop through all the stocks and render the charts
  for (var i = 0; i < companies.length ; i++) { 

      let chartHeight = 100;
      let padding = 10;

      let rowIndex = max(30, companyPricesCSV.getArray().findIndex(x => x[0] === formatDate(currentDate)) );

      console.log('i:',(i))
      console.log('TEST:',companies[i])
      let priceData = companyPricesCSV.getColumn(companies[i].name); // Fetch by company name

      let chartData = priceData.slice(rowIndex-30, rowIndex).map(function(item) {
        return parseFloat(item);
    });;
      
      drawLineChart(chartData, 400, 60 + (i*(chartHeight + padding)), 180, chartHeight);

  }
}

function updatePrices() {
  // Increment the currentIndex to "move" the chart
  currentIndex++;
  // If currentIndex goes beyond the length of stockPrices, reset it to loop the animation
  if (currentIndex >= stockPrices.length) {
    currentIndex = 0; // Or handle as needed for continuous data
  }

  // Optionally, you could add logic here to fetch new data points dynamically
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
    reviewPortfolio();
  }

  if (currentDate >= new Date(2005, 0, 1)) {
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

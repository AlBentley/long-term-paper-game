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
  
//   stroke(255, 0, 0); // Red color for the stock price line
//   noFill();
//   beginShape();


//   for (let i = currentIndex; i < currentIndex + 25; i++) {
//     let x = map(i, 0, stockPrices.length - 1, 0, width); // Distribute points along the width
//     let y = map(stockPrices[i], 0, Math.max(...stockPrices), height, 0); // Adjust based on stock price
//     vertex(x, y);
//   }
//   endShape();

  //draw chart
  drawBarChart(tableExample, 160, 120, 300, 160);

  drawLineChart(null, 450, 120, 180, 160);

 // Update the stockPrices array to simulate the chart moving over time
 updatePrices();
 
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

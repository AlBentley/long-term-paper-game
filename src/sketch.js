let bgImg;
let stockPrices = [];
let maxStockPrice = 150; // Adjust based on your needs
let currentIndex = 0; // To keep track of the current index in the loaded data


function preload() {
  bgImg = loadImage('img/terminal2.png'); // Make sure to place the correct path to your image
  loadJSON('data/stock_prices.json', loadData); // Load the stock prices from the JSON file
}

function loadData(data) {
  // Assuming data is an array of objects with 'price' as one of the keys
  stockPrices = data.map(entry => entry.price);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noSmooth(); // This disables anti-aliasing, making the line pixelated
}

function draw() {
  background(bgImg);
  
  stroke(255, 0, 0); // Red color for the stock price line
  noFill();
  beginShape();
  for (let i = currentIndex; i < currentIndex + 25; i++) {
    let x = map(i, 0, stockPrices.length - 1, 0, width); // Distribute points along the width
    let y = map(stockPrices[i], 0, Math.max(...stockPrices), height, 0); // Adjust based on stock price
    vertex(x, y);
  }
  endShape();
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

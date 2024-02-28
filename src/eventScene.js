

// SCENE CONTROLLER
function drawEvent(event) {
  background(eventImage);
  console.log(currentEventScene);
  if (currentEventScene === 'description') {
    drawDescription(event);
  } else if (currentEventScene === 'financials') {
    drawFinancials(event);
  } 
}

// EVENT TEXT SCENE

function drawDescription(event) {
  // Draw "paper"
  let paperX = 100;
  let paperY = 100;
  let paperWidth = width - 200;
  let paperHeight = height - 200; // Adjusted for only showing the description

  fill(255); // White paper
  noStroke();
  rect(paperX, paperY, paperWidth, paperHeight, 10); // Slightly rounded corners

  // Event Name and Description
  fill(0); // Black text
  textSize(24);
  textAlign(CENTER, CENTER);
  text(event.eventName, width / 2, paperY + 30);

  textSize(16);
  textAlign(LEFT, TOP);
  text(event.description, paperX + 20, paperY + 60, paperWidth - 40); // Adjust padding as necessary
  drawButton("Financials ->", "right");
  drawButton("[U] Update Narrative", "middle");
}

// FINANCIAL SCENE

function drawFinancials(event) {
  // Define the paper area
  // Draw "paper"
  let paperX = 100;
  let paperY = 100;
  let paperWidth = width - 200;
  let paperHeight = height - 200; // Adjusted for only showing the description

  fill(255); // White paper
  noStroke();
  rect(paperX, paperY, paperWidth, paperHeight, 10); // Slightly rounded corners


  // Financials Name and Description
  fill(0); // Black text
  textSize(24);
  textAlign(CENTER, CENTER);
  text("Revenue & Earnings", width / 2, paperY + 30);


  // Define the graph area (inside the paper)
  let graphX = paperX + 100;
  let graphY = paperY + 150;
  let graphWidth = paperWidth - 100; // Leave some padding on sides
  let graphHeight = paperHeight - 200; // Adjust based on the position of text

  // Find the maximum value in both datasets to set the scale
  let maxRevenue = max(event.financials.revenue);
  let maxEarnings = max(event.financials.earnings);
  let maxValue = max(maxRevenue, maxEarnings);

  // Optionally, draw the axis for the graph
  drawAxis(graphX, graphY, graphWidth, graphHeight);

  // Legend for the chart
  drawLegend(graphX + graphWidth - 120, graphY, [
    { label: "Revenue", color: 'rgb(35, 148, 223)' },
    { label: "Earnings", color: 'rgb(114, 231, 214)' }
  ]);
  
    // Add Y-axis values
  drawYAxisValues(graphX, graphY, graphHeight, maxValue);
  drawButton("<- Event", "left");
  drawButton("Continue ->", "right");
  drawButton("[U] Update Narrative", "middle");
  // Draw the line charts on the same axis
  drawLineGraph(event.financials.revenue, graphX, graphY, graphWidth, graphHeight, maxValue, 'rgb(35, 148, 223)');
  drawLineGraph(event.financials.earnings, graphX, graphY, graphWidth, graphHeight, maxValue, 'rgb(114, 231, 214)');
}








//GRAPH FUNCTIONS

function drawLegend(x, y, items) {
  let btnWidth = 100; // Width of the Next button for reference
  let legendWidth = 100; // Assuming legend width for calculation
  let legendX = width - btnWidth - legendWidth - 40; // Adjust legend X to avoid overlap, 40 is the margin
  let legendY = y - 80; // Keep the Y position as passed to the function

  items.forEach((item, index) => {
    fill(item.color);
    noStroke();
    rect(legendX, legendY + 30 * index, 20, 20); // Draw colored box

    fill(0); // Black text
    textSize(14);
    text(item.label, legendX + 65, legendY + 10 + 30 * index); // Offset text to the right of the box
  });
}

function drawYAxisValues(x, y, height, maxValue) {
  const steps = 4; // Number of steps or "ticks" on the y-axis
  const stepValue = maxValue / steps;
  const stepHeight = height / steps;

  for (let i = 0; i <= steps; i++) {
    let value = stepValue * i; // Calculate the value for this step
    let yPos = y + height - i * stepHeight; // Calculate the y position for this step

    fill(0); // Black text
    noStroke();
    textSize(12);
    textAlign(RIGHT, CENTER);
    text(`$${nf(value, 1, 2)}`, x - 10, yPos); // Use template literals to include the $ symbol
  }
}

// Adjusted drawLineGraph to include maxValue for scaling
function drawLineGraph(data, x, y, width, height, maxValue, color) {
  stroke(color);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let i = 0; i < data.length; i++) {
    let xPos = map(i, 0, data.length - 1, x, x + width);
    let yPos = map(data[i], 0, maxValue, y + height, y);
    vertex(xPos, yPos);
  }
  endShape();
}

// Function to draw the graph axis
function drawAxis(x, y, width, height) {
  stroke(0);
  strokeWeight(1);
  fill(255);

  // Draw axis lines
  line(x, y, x, y + height); // Y-axis
  line(x, y + height, x + width, y + height); // X-axis
}









//NEXT BUTTON FUNCS

function drawButton(buttonText, placement, symbol) {
  // Button dimensions
  let btnWidth = 210;
  let btnHeight = 50;

  // Determine button X position based on placement param
  let btnX;
  switch (placement) {
    case "left":
      btnX = 20; // 20 pixels from the left edge
      break;
    case "middle":
      btnX = (width / 2) - (btnWidth / 2); // Centered
      break;
    case "right":
      btnX = width - btnWidth - 20; // 20 pixels from the right edge
      break;
    default:
      btnX = 20; // Default to left if placement is unspecified
  }
  let btnY = 20; // Position from the top

  // Draw rounded rectangle for the button
  fill(240); // Light gray background
  stroke(0); // Black border
  strokeWeight(2);
  rect(btnX, btnY, btnWidth, btnHeight, 15); // Rounded corners

  // Draw button text
  fill(0); // Black text
  noStroke();
  textSize(14);
  textStyle(BOLD); 
  textAlign(CENTER, CENTER);
  text(buttonText, btnX + btnWidth / 2, btnY + btnHeight / 2);
}
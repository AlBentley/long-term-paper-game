let inputs = [];
let labels = [];
let fairValueLabel;


// SCENE CONTROLLER
function drawEventScene(event) {
  let companyName = event.company;
  let company = companies.find(company => company.name === companyName);
  fairValueIndex = fairValues.findIndex(fairValue => fairValue.company === companyName);
  
  background(eventImage);
  if (currentEventScene === 'company') {
    drawCompanyInfo(company);
    toggleInputsVisibility(false);
  } else if (currentEventScene === 'event') {
    let descDiv = select('#company-description');
    if (descDiv){
      descDiv.remove();
    }
    toggleInputsVisibility(true);
    drawEvent(event);
    drawNarrative(fairValueIndex);
  } else if (currentEventScene === 'financials') {
    drawFinancials(company);
    drawNarrative(fairValueIndex);
    toggleInputsVisibility(true);
  } else if (currentEventScene === 'report') {
    drawReport(fairValueIndex);
    toggleInputsVisibility(false);
  }
}

function convertMarkdownToHTML(markdown) {
  // Convert headings
  markdown = markdown.replace(/^### (.*$)/gim, '<h3>$1</h3>');

  // Convert bold text
  markdown = markdown.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');

  // Convert italic text
  markdown = markdown.replace(/\*(.*?)\*/gim, '<em>$1</em>');

    // Convert line breaks
  markdown = markdown.replace(/\n/gim, '<br />');

  // Handle bold followed by line break
  markdown = markdown.replace(/<\/strong><br \/>/gim, '</strong>');

  // Ensure correct HTML structure by wrapping in a div
  let html = `<div style="font-family: 'Courier New', Courier, monospace;">${markdown}</div>`;


  return html;
}


// COMPANY BACKGROUND SCREEN
function drawCompanyInfo(company) {

  let descDiv = select('#company-description');
  
  let paperX = 10;
  let paperY = 100;
  let margin = 25;
  let paperWidth = (width / 3 * 2) - margin; // To thirds of the screen minus 100 margin
  let paperHeight = height - 150; // Adjusted for only showing the description
  
  // Draw "paper" as before
  fill(255); // White paper
  noStroke();
  rect(100, 100, width - 200, height - 200, 10); // Slightly rounded corners

  // Set up the company name as before
  fill(0); // Black text
  textSize(24);
  textAlign(CENTER, CENTER);
  text(company.name, width / 2, 120);
  

  if (!descDiv) {
    // If it doesn't exist, create it
    descDiv = createDiv();
    descDiv.id('company-description');
    descDiv.style('position', 'absolute');
    descDiv.style('top', '150px');
    descDiv.style('left', '160px');
    descDiv.style('width', (width - 210) + 'px');
    descDiv.style('height', (height - 250) + 'px');
    descDiv.style('overflow-y', 'scroll'); // Enable vertical scrolling
    descDiv.style('background', 'white');
    descDiv.style('padding', '20px');
    descDiv.style('box-sizing', 'border-box'); // Include padding in the div's dimensions
    descDiv.style('border-radius', '10px'); // Match the canvas corners
    descDiv.parent('sketch-holder'); // Attach it to the sketch holder
  }

  let htmlContent = convertMarkdownToHTML(company.description);
  descDiv.html(htmlContent);

  drawButton("News ->", "right");
}

// VALUTOR
function initializeInputsAndLabels() {
  // Create the wrapper div
  inputWrapper = createDiv('');
  inputWrapper.position((width / 3) * 2, 100);
  
  const inputNames = ["What might revenue be in 5 years?", "What might earnings be in 5 years?", "What is a reasonable future PE Multiple"];
  const inputIds = [ "revenue", "earnings", "pe", "fv"]
  const defaultValues = ["0", "0", "0"];

  percentOverUnder = createDiv('');
  percentOverUnder.parent(inputWrapper); // Set the wrapper as the parent
  percentOverUnder.id('fvCurrent');
  percentOverUnder.style('margin-bottom', '20px');
  percentOverUnder.style('font-family', 'monospace');

  inputNames.forEach((name, index) => {
    let label = createDiv(name);
    label.parent(inputWrapper); // Set the wrapper as the parent
    label.style('margin-bottom', '10px');
    let input = createInput(defaultValues[index]);
    input.style('margin-bottom', '20px');
    input.id(inputIds[index]);
    input.parent(inputWrapper); // Set the wrapper as the parent
    label.style('font-family', 'monospace');

    input.input(() => {
      let newValue = parseFloat(input.value()) || 0; // Parse input value, defaulting to 0 if NaN
      // Update the corresponding property in fairValue based on input's ID
      switch (inputIds[index]) {
        case 'revenue':
          fairValues[fairValueIndex].r = newValue;
          break;
        case 'earnings':
          fairValues[fairValueIndex].e = newValue;
          break;
        case 'pe':
          fairValues[fairValueIndex].pe = newValue;
          break;
      }

      //calculate FV and update
      let earnings = fairValues[fairValueIndex].e * 1000
      let pe = fairValues[fairValueIndex].pe 
      let outstanding = fairValues[fairValueIndex].outstanding
      
      let newFV = (earnings * pe) / outstanding;
      
      fairValues[fairValueIndex].fv = newFV;
      console.log('Calculation: earnings of ',earnings, '* ratio of ', pe, '/ outstanding shares of ', outstanding, ' equal fv of', newFV);
    });

  });
  fairValueLabel = createDiv('Your Fair Value: $0');
  fairValueLabel.parent(inputWrapper); // Set the wrapper as the parent
  fairValueLabel.id('fvOutput');
  fairValueLabel.style('font-family', 'monospace');
  

  percentOverUnder = createDiv('Your Fair Value: $0');
  percentOverUnder.parent(inputWrapper); // Set the wrapper as the parent
  percentOverUnder.id('fvDiff');
  percentOverUnder.style('font-family', 'monospace');
  
  toggleInputsVisibility(false);
}

function drawNarrative(fairValueIndex) {
  let company = fairValues[fairValueIndex].company;
  let priceData = companyPricesCSV.getColumn(company);
  let priceRowIndex = companyPricesCSV.getArray().findIndex(x => x[0] === formatDate(currentDate));
  let currentPrice = priceData[priceRowIndex];
  let futurePrice = fairValues[fairValueIndex].fv;
  let percentageChange = ((futurePrice - currentPrice) / currentPrice) * 100;


  // Draw "paper"
  let margin = 25;
  let startX = ((width / 3) * 2) + (margin / 2);
  let startY = 100;
  let sectionWidth = (width / 3) - margin;
  let inputGap = 75; // Gap between inputs
  let newPositionY = 100;
  
  // Update the position of the inputWrapper
  inputWrapper.position(startX + 60, startY + 50);
  inputWrapper.style('width', '270px');

  fill(255); // White paper
  noStroke();
  rect(startX, startY, sectionWidth, height - 150, 10); // Adjusted for showing the description

   // Text "Your Forecast"
   fill(0); // Black text
   textSize(24);
   textAlign(LEFT, TOP);
   text("Your Assessment", startX + 8, startY + 15);
   select('#revenue').value(fairValues[fairValueIndex].r);
   select('#earnings').value(fairValues[fairValueIndex].e);
   select('#pe').value(fairValues[fairValueIndex].pe);
   let fvOutput = select('#fvOutput'); // Select the element by ID
   fvOutput.html(`Fair Value: $${fairValues[fairValueIndex].fv}`); // Update its HTML content

   let fvCurrent = select('#fvCurrent'); // Select the element by ID
   fvCurrent.html(`The stock price is currently $${currentPrice}, enter forecasted revenues & earnings below to calculate your fair value.`); // Update its HTML content


   let fvDiff = select('#fvDiff'); // Select the element by ID
   
   let backgroundColor;
    if (parseFloat(currentPrice) === parseFloat(futurePrice)) {
      valuationMessage = "Fairly valued";
      backgroundColor = '#C1A200'; // Yellow for fairly priced
    } else {
      valuationMessage = `${percentageChange.toFixed(2)}% ${percentageChange > 0 ? "undervalued" : "overvalued"}`;
      backgroundColor = percentageChange > 0 ? '#00C11C' : '#C10000'; // Red for overvalued, Green for undervalued
    }
  
  


  fvDiff.html(valuationMessage); // Update its HTML content
  fvDiff.style('background-color', backgroundColor); // Set background color based on valuation
  fvDiff.style('border-radius', '8px'); // Rounded corners
  fvDiff.style('padding', '10px'); // Some padding for aesthetics
  fvDiff.style('color', '#FFFFFF'); // Text color
  fvDiff.style('font-weight', 'bold'); // Bold text
  fvDiff.style('text-align', 'center'); // Center-align text
  fvDiff.style('margin-top', '10px'); // Margin top for spacing
  fvDiff.style('width', 'fit-content'); // Adjust width to fit content
  fvDiff.style('margin-left', 'auto'); // Centering the div horizontally
  fvDiff.style('margin-right', 'auto'); // Centering the div horizontally
}

function toggleInputsVisibility(show) {
  if (show) {
    inputWrapper.style('display', 'block');
  } else {
    inputWrapper.style('display', 'none');
  }
}


// EVENT SCENE
function drawEvent(event) {
  let paperX = 10;
  let paperY = 100;
  let margin = 25;
  let paperWidth = (width / 3 * 2) - margin; // To thirds of the screen minus 100 margin
  let paperHeight = height - 150; // Adjusted for only showing the description
  

  fill(255); // White paper
  noStroke();
  rect(paperX + (margin/2), paperY, paperWidth, paperHeight, 10); // Slightly rounded corners

  // Event Name and Description
  fill(0); // Black text
  textSize(24);
  textAlign(CENTER, CENTER);
  text(event.eventName, paperWidth / 2 , paperY + 30);

  textSize(16);
  textAlign(LEFT, TOP);
  text(event.description, paperX + 20, paperY + 60, paperWidth - 40); // Adjust padding as necessary
  drawButton("<- Company Info", "left");
  drawButton("Financials ->", "right");
}

// FINANCIAL SCENE
function drawFinancials(company) {
  let financials; //where we'll put the finacial data

  switch (company.name) {
    case 'TreadMaster Corp':
      financials = treadMasterCSV;
      break;
    case 'earnings':
      financials = treadMasterCSV;
      break;
    case 'pe':
      financials = treadMasterCSV;
      break;
  }
  
  //revenue
  let revenueAndEarningsData = new p5.Table();
  let currentYear = currentDate.getFullYear();
// Add columns for Date and Revenue
  revenueAndEarningsData.addColumn('Date');
  revenueAndEarningsData.addColumn('Revenue');
  revenueAndEarningsData.addColumn('Earnings');


  for (let r = 0; r < financials.getRowCount(); r++) {
    let row = financials.getRow(r);
    let yearString = row.getString("Date"); // Assuming this is just the year in "YYYY" format
    let revenueString = row.getString("Revenue").replace(/,/g, ''); // Remove commas and convert to number
    let earningsString = row.getString("Earnings").replace(/,/g, ''); // Remove commas and convert to number
    let revenue = parseFloat(revenueString);
    let earnings = parseFloat(earningsString);
    
    // Convert the year string to an integer for comparison
    let rowYear = parseInt(yearString);
  
    // Add row to revenueAndEarningsData only if rowYear is less than or equal to currentYear
    if (rowYear <= currentYear) {
      let newRow = revenueAndEarningsData.addRow();
      newRow.setString('Date', yearString);
      newRow.setNum('Revenue', revenue);
      newRow.setNum('Earnings', earnings);
    }
  }


  
  
  // Define the paper area
  // Draw "paper"
  let paperX = 10;
  let paperY = 100;
  let margin = 25;
  let paperWidth = (width / 3 * 2) - margin; // To thirds of the screen minus 100 margin
  let paperHeight = height - 150; // Adjusted for only showing the description

// Adjusted chart position and size to fit within the white rectangle
let chartMargin = 75; // Additional margin inside the rectangle for the chart
let chartX = paperX + (margin / 2) + chartMargin; // Start chart inside the rectangle
let chartY = paperY + chartMargin; // Adjust y-position to start inside the rectangle
let chartWidth = paperWidth - (chartMargin * 4.5 ); // Adjust chart width to fit inside the rectangle
let chartHeight = (paperHeight / 2) - (chartMargin * 1.5);


  fill(255); // White paper
  noStroke();
  rect(paperX + (margin/2), paperY, paperWidth, paperHeight, 10); // Slightly rounded corners
  

  // Financials Name and Description
  fill(0); // Black text
  textSize(24);
  textAlign(CENTER, CENTER);
  text("Revenue & Earnings", paperWidth / 2 , paperY + 30);
  drawButton("<- News", "left");
  drawButton("Your Report", "right");
  drawBarChartFinancials(revenueAndEarningsData, chartX, chartY, chartWidth, chartHeight);
  let tableStartY = chartY + chartHeight + 100; // Start the table 50 pixels below the chart
  drawTableBelowChart(revenueAndEarningsData, chartX - 50, tableStartY, paperWidth - chartMargin, 200);
}

// YOUR NARRATIBE
function drawReport(fairValueIndex) {

  let company = fairValues[fairValueIndex].company;
  let fv = fairValues[fairValueIndex].fv
  // Draw "paper"
  let paperX = 100;
  let paperY = 200;
  let paperWidth = width - 200;
  let paperHeight = height / 5; // Adjusted for only showing the description

  fill(255); // White paper
  noStroke();
  rect(paperX, paperY, paperWidth, paperHeight, 10); // Slightly rounded corners

  // Event Name and Description
  fill(0); // Black text
  textSize(24);
  textAlign(CENTER, CENTER);
  text("Your Report", width / 2, paperY + 30);

  textSize(16);
  textAlign(LEFT, TOP);
  drawButton("<- Financials", "left");
  drawButton("Submit [enter]", "right");
  text(`Well done! Your assessment of ${company} is that it's fair value is $${fv}. Submit your report to your boss to ensure your fund takes appropriately allocations funds.`, paperX + 20, paperY + 80, paperWidth - 40); 

}


function drawTableBelowChart(data, startX, startY, tableWidth, tableHeight) {
  let numberOfRows = data.getRowCount();
  let numberOfColumns = 3; // Including Date, Revenue, and Earnings
  let columnWidth = tableWidth / numberOfColumns;
  let rowHeight = 20;
  let headersHeight = 20;

  textSize(12);
  stroke(0);
  strokeWeight(1);

 // Draw headers with consistent background and centered text
fill(240); // Light gray background for headers
for (let i = 0; i < numberOfColumns; i++) {
  let headerX = startX + i * columnWidth;
  rect(headerX, startY, columnWidth, headersHeight);
}

// Ensure text color is set to black (or a visible color against the header background)
fill(0); // Black for text visibility
textAlign(CENTER, CENTER);
text("Date", startX + columnWidth / 2, startY + headersHeight / 2);
text("Revenue", startX + columnWidth * 1.5, startY + headersHeight / 2);
text("Earnings", startX + columnWidth * 2.5, startY + headersHeight / 2);

  // Draw data rows
  for (let i = 0; i < numberOfRows; i++) {
    let rowY = startY + headersHeight + (i * rowHeight);
    for (let j = 0; j < numberOfColumns; j++) {
      let cellX = startX + j * columnWidth;
      fill(0); // Reset for text
      textAlign(CENTER, CENTER); // Center text within each cell
      let textValue;
      if (j == 0) {
        textValue = data.getString(i, 'Date');
      } else if (j == 1) {
        textValue = data.getNum(i, 'Revenue').toLocaleString('en-US');
      } else if (j == 2) {
        textValue = data.getNum(i, 'Earnings').toLocaleString('en-US');
      }
      text(textValue, cellX + columnWidth / 2, rowY + rowHeight / 2);
    }
  }

  // Draw the table grid
  noFill();
  rect(startX, startY, tableWidth, headersHeight + numberOfRows * rowHeight);
  // Vertical lines
  for (let i = 0; i <= numberOfColumns; i++) {
    line(startX + i * columnWidth, startY, startX + i * columnWidth, startY + headersHeight + numberOfRows * rowHeight);
  }
  // Horizontal lines
  for (let j = 0; j <= numberOfRows + 1; j++) {
    line(startX, startY + j * rowHeight, startX + tableWidth, startY + j * rowHeight);
  }
}





function drawBarChartFinancials(data, xPos, yPos, wSize, hSize) {
  let numberOfRows = data.getRowCount();
  let numberOfColumns = data.getColumnCount();
  let tempRevenueValues = [];
  let tempEarningsValues = [];

  // Extract revenue and earnings data
  for (let i = 0; i < numberOfRows; i++) {
    tempRevenueValues.push(data.getNum(i, "Revenue")); // Assuming the second column is "Revenue"
    tempEarningsValues.push(data.getNum(i, "Earnings")); // Assuming the third column is "Earnings"
  }

  // Determine highest value for scaling
  let maxValue = max(tempRevenueValues.concat(tempEarningsValues));

  fill(0);
  stroke(0);
  textSize(11);
  let padding = 20;
  let barWidth = 15; // Width of each bar
  let gap = (wSize - (2 * padding)) / numberOfRows - barWidth; // Gap between groups of bars

  for (let i = 0; i < numberOfRows; i++) {
    // Place years
    text(data.getString(i, 0), xPos + i * (2 * barWidth + gap) + padding, yPos + hSize + 15); // Adjust text positioning as needed

    // Draw revenue bar
    fill(0, 255, 0); // Green for revenue
    let revenueHeight = tempRevenueValues[i] / maxValue * (hSize - padding);
    rect(xPos + i * (2 * barWidth + gap) + padding, yPos + hSize - revenueHeight, barWidth, revenueHeight);

    // Draw earnings bar
    fill(255, 0, 0); // Red for earnings
    let earningsHeight = tempEarningsValues[i] / maxValue * (hSize - padding);
    rect(xPos + i * (2 * barWidth + gap) + padding + barWidth, yPos + hSize - earningsHeight, barWidth, earningsHeight);
  }

  // Draw axis labels and steps
  let step = Math.round(maxValue / 10 / 50) * 50;
  for (let k = 0; k <= maxValue; k += step) {
    let y = yPos + hSize - (k / maxValue * (hSize - padding));
    text(k, xPos - 30, y); // Position y-axis labels
  }
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
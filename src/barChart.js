budgetValues = [];

function drawBarChart(data, xPos, yPos, wSize, hSize) {
  numberOfRows = data.getRowCount();
  numberOfColumns = data.getColumnCount();
  let tempValues = [];

  for (var i = 0; i < numberOfRows; i++) {
    tempValues[i] = data.getNum(i, 1);
  }

  //determine highest value
  maxValue=max(tempValues);

  //background(220);
  fill(0, 255,0);
  stroke(0);
  textSize(8);
  let padding = 20;
  let gap = (wSize - (2*padding)) / numberOfRows;

  for (var i = 0; i < numberOfRows; i++) {
    //place years
    text(data.getString(i, 0), xPos + i * gap + padding, yPos + hSize);
    //pull numbers
    budgetValues[i] = data.getString(i, 1) / maxValue * hSize;
    //draw graph
    rect(xPos +i * gap + padding, yPos + hSize - padding - budgetValues[i], padding, budgetValues[i])
  }
  step = Math.round(maxValue / 10 / 50) * 50;
  for (var k=0;k<maxValue;k=k+step){
    text(k,xPos,yPos + hSize-(k/ maxValue * hSize));
  }

}
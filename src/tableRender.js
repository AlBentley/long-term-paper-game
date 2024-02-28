function renderTable(tableData, x, y, w, h, cellPadding = 5) {
    
    let rowHeight = h / tableData.length;
    let colWidth = w / tableData[0].length;
  
    for (let i = 0; i < tableData.length; i++) {
      for (let j = 0; j < tableData[i].length; j++) {
        let cellX = x + j * colWidth;
        let cellY = y + i * rowHeight;
  
        noFill(); // Cell background color
        stroke(100);
        strokeWeight(i == 0 ? 0 : 1);
        rect(cellX, cellY, colWidth, rowHeight);
  
        fill(255); // Text color
        strokeWeight(0);
        textStyle(i == 0 ? BOLD : NORMAL);
        textAlign(LEFT, TOP);
        textSize(12);
  
        let cellText = tableData[i][j];
        let wrappedText = wrapText(cellText, colWidth - 2 * cellPadding); // Adjust width for padding
        let textHeight = wrappedText.length * (textAscent() + textDescent());
        let textY = cellY + (rowHeight - textHeight) / 2; // Center vertically
  
        wrappedText.forEach((line, lineIndex) => {
          text(line, cellX + cellPadding, textY + lineIndex * (textAscent() + textDescent()));
        });
      }
    }
  }
  
  // Helper function to wrap text within a specified width
  function wrapText(str, maxWidth) {
    let words = str.split(' ');
    let lines = [];
    let currentLine = '';
  
    for (let word of words) {
      let testLine = currentLine + word + ' ';
      let testWidth = textWidth(testLine);
      if (testWidth > maxWidth && currentLine !== '') {
        lines.push(currentLine);
        currentLine = word + ' ';
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine.trim());
    return lines;
  }
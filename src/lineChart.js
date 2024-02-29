

function drawLineChart(data, xPos, yPos, wSize, hSize, stock) {
  //background(0,0,255);

  strokeWeight (3);

  let maxPrice = max(data);
  let minPrice = min(data);

  for (var i = 0; i <= data.length-1 ; i++) { //here you don't use <= 
    
    if (data[i] >= data[i+1]) {
      stroke(0,255,0); 
      fill(0,255,0); 
    } else {
      stroke(255, 0,0);
      fill(255, 0,0);
    }
    line(xPos + i*5, yPos + map(data[i], minPrice, maxPrice, 0, hSize) ,
         xPos + i*5 + 5, yPos + map(data[i+1], minPrice, maxPrice, 0, hSize));
    
    if(i == data.length - 2){
      strokeWeight (0);
      textSize(10); // Text size for instructions
      textAlign(LEFT, CENTER);
      text("$" + data[i+1].toFixed(2).toString(), xPos + i*5 + 15, yPos + map(data[i+1], minPrice, maxPrice, 0, hSize));
      textSize(8); // Text size for instructions
      text(stock, xPos + i*5 + 15, yPos + map(data[i+1], minPrice, maxPrice, 0, hSize) + 14);
      
    }

    }

    
}
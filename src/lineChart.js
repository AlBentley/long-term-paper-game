

function drawLineChart(data, xPos, yPos, wSize, hSize) {
  //background(0,0,255);

  strokeWeight (5);

  let maxPrice = max(data);
  let minPrice = min(data);

  for (var i = 0; i < data.length ; i++) { //here you don't use <= 
    
    if (data[i] >= data[i+1]) {
      stroke(0,255,0); 
      fill(0,255,0); 
    } else {
      stroke(255, 0,0);
      fill(255, 0,0);
    }
    line(xPos + i*5, yPos + map(data[i], minPrice, maxPrice, 0, hSize) ,
         xPos + i*5 + 5, yPos + map(data[i+1], minPrice, maxPrice, 0, hSize));
    
    if(i == (wSize/5) - 1){
      strokeWeight (0);
      textSize(12); // Text size for instructions
      textAlign(LEFT, CENTER);
      text("$" + data[i].toFixed(2).toString(), xPos + i*5 + 15, yPos + data[i+1]);
    }

    }

    
}
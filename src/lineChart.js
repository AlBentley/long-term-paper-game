

function drawLineChart(data, xPos, yPos, wSize, hSize) {
  //background(0,0,255);

  strokeWeight (5);



  marketvalue.shift();
  var n = noise (noiseParam);
  var value = map (n, 0,1, 0, hSize);
  
  marketvalue.push(value);
  noiseParam += noiseStep;

  data = marketvalue;

  let maxPrice = max(data);
  let minPrice = min(data);

  for (var i = 0; i < wSize/5 ; i++) { //here you don't use <= 
    //marketvalue [i+1] = random[i];
    if (marketvalue[i] >= marketvalue[i+1]) {
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
      text("$" + marketvalue[i].toFixed(2).toString(), xPos + i*5 + 15, yPos + marketvalue[i+1]);
    }

    }

    
}
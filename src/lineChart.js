

function drawLineChart(data, xPos, yPos, wSize, hSize) {
  //background(0,0,255);

  strokeWeight (5);

  marketvalue.shift();
  var n = noise (noiseParam);
  var value = map (n, 0,1, 0, hSize);
  
  marketvalue.push(value);
  noiseParam += noiseStep;
  for (var i = 0; i < wSize/5 ; i++) { //here you don't use <= 
    //marketvalue [i+1] = random[i];
    if (marketvalue[i] >= marketvalue[i+1]) {
      stroke(0,255,0); 
    } else {
      stroke(255, 0,0);
    }
    line(xPos + i*5, yPos + marketvalue[i] ,
         xPos + i*5 + 5, yPos + marketvalue[i+1]);
    }
}
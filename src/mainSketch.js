let companies = [
  {
    name:'Microsoft', //only setting FV for now, padding out data structure for how it might scale if we tackle other aspects of forecasting
    description:'A software company with global....',
  },
  {
    name:'Microsoft', //only setting FV for now, padding out data structure for how it might scale if we tackle other aspects of forecasting
    description:'A software company with global....',
  },
  {
    name:'Microsoft', //only setting FV for now, padding out data structure for how it might scale if we tackle other aspects of forecasting
    description:'A software company with global....',
  },
  {
    name:'Microsoft', //only setting FV for now, padding out data structure for how it might scale if we tackle other aspects of forecasting
    description:'A software company with global....',
  },
  {
    name:'Microsoft', //only setting FV for now, padding out data structure for how it might scale if we tackle other aspects of forecasting
    description:'A software company with global....',
  },
  ];

let fairValues = [
{
  fv:10, //only setting FV for now, padding out data structure for how it might scale if we tackle other aspects of forecasting
  r:0,
  e:0,
  pe:0,
},
{
  fv:12,
  r:0,
  e:0,
  pe:0,
},
{
  fv:0,
  r:0,
  e:0,
  pe:0,
},
{
  fv:0,
  r:0,
  e:0,
  pe:0,
},
{
  fv:0,
  r:0,
  e:0,
  pe:0,
},
];
let bgImg;
let stockPrices = [];
let song; // Variable to hold the song
let bgImage; // Variable to hold the background image
let pauseSong;
let musicTime;
let tableExample; // example of CSV
let currentScene = 2; // Start with scene 1

let isPlaying = true;
let nextChangeTime = 0;
let gameFinished = false; // Flag to indicate if the game has finished
let bankBalance = 100000; // Initial bank balance

let currentDate = new Date(1995, 0, 1);


function preload() {
  bgImg = loadImage('img/terminal2.png'); // Make sure to place the correct path to your image
  loadJSON('data/stock_prices.json', loadData); // Load the stock prices from the JSON file

  // Load the song
  song = loadSound('short-test.mp3');
  pauseSong = loadSound('pause.mp3');
  musicTime = loadSound('music.mp3');
  // Load the background image, replace 'background.jpg' with your image file path
  bgImage = loadImage('splash.png');


  tableExample = loadTable("data/example.csv", "csv", "header");
}


function loadData(data) {
  // Assuming data is an array of objects with 'price' as one of the keys
  stockPrices = data.map(entry => entry.price);
}


function setup() {

  //createCanvas(windowWidth, windowHeight);
  noSmooth(); // This disables anti-aliasing, making the line pixelated

  createCanvas(800, 600);
  
  textFont('Courier New'); // Monospace font for uniform character spacing
  textSize(12); // Larger size for readability
  textAlign(LEFT, TOP);
  frameRate(10);

  setupTimeLine();

  select('#scene1Button').mousePressed(() => {
        currentScene = 1;
        song.play();
        //musicTime.stop();
    });
    // Button for switching to scene 2
    select('#scene2Button').mousePressed(() => {
        currentScene = 2;
        song.stop();
        //musicTime.play();
    });

    // Button for switching to scene 2
    select('#scene3Button').mousePressed(() => {
      currentScene = 3;
      song.stop();
      musicTime.stop();
  });


    //song.play();
}

function draw() {

  if (currentScene === 1) {
    drawDecisionScene();
  } else if (currentScene === 2) {
    drawTimeLine();
  } else if (currentScene === 3) {
    drawNarrative();
  }


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

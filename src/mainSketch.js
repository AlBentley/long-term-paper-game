let inputContainer;

let fairValues = [
{
  company:'TreadMaster Corp',
  fv:33.63, 
  r:12288200,
  e:567000,
  pe:8.9977,
  outstanding:151533606,
  avg_price: 0,
  amount_invested: 0,
  current_value: 0,
  capital_gain: 0,
  discount: 0,
  no_shares: 0
},
{
  company:'HealthCare Haven',
  fv:243.75,
  r:4058711,
  e:26208,
  pe:79.99496838,
  outstanding:8601059,
  avg_price: 0,
  amount_invested: 0,
  current_value: 0,
  capital_gain: 0,
  discount: 0,
  no_shares: 0
},
{
  company:'DrillTech Industries',
  fv:9.13,
  r:5661100,
  e:175400,
  pe:4.352730103,
  outstanding:83622000,
  avg_price: 0,
  amount_invested: 0,
  current_value: 0,
  capital_gain: 0,
  discount: 0,
  no_shares: 0
},
{
  company:'PharmaVital Inc',
  fv:7.33,
  r:1647900,
  e:319700,
  pe:24.27589615,
  outstanding:1058800000,
  avg_price: 0,
  amount_invested: 0,
  current_value: 0,
  capital_gain: 0,
  discount: 0,
  no_shares: 0
},
{
  company:'Smart Mart',
  fv:3.56,
  r:3006534,
  e:41710,
  pe:32.42868952,
  outstanding:379944000,
  avg_price: 0,
  amount_invested: 0,
  current_value: 0,
  capital_gain: 0,
  discount: 0,
  no_shares: 0
},
];
let bgImg;
let fairValueIndex = 0;
let stockPrices = [];
let eventsJSON = [];
let companies = [];
let companyPricesCSV; //Global variable for prices CSV
let TreadMaster; //Global variable for TredMaster financials
let song; // Variable to hold the song
let bgImage; // Variable to hold the background image
let pauseSong;
let pageSong;
let eventSong;
let musicTime;
let lastEvent= { //remove this once we tidy up the UI
  date: "1995-10-01",
  company: "Company A",
  eventName: "Company A Q3 Update",
  sharePrice: "$124.50",
  description: "IBM has continued to aggressively restructure its worldwide business operations to improve its competitive position within a rapidly changing market for information technology products and services. Industry demand has slowed in recent years, and the industry continues to suffer from excess capacity and sluggish economic growth, particularly in Europe and Japan. The company's recent business results reflect these realities, as well as an ongoing revenue shift to offerings with lower gross profit margins, such as services and personal computers. During 1993, a number of actions were announced to \"right-size\" the company. These actions, including reductions in the company's worldwide work force, office space, capacity and related expenses, are intended to bring the company's cost and expense structure in line with industry levels. They were based on the company's assumptions of future industry demand and revenue growth. If these assumptions prove correct, the company believes it will be  able to absorb, without resorting to additional special charges, the costs  associated with any future productivity improvements. If the company's current  view of future industry revenue and demand proves incorrect, the company will  have to take further actions. The company's management strategy also shifted in  1993 from the establishment of increasingly autonomous business units--an  emerging federation of companies--to remaining an integrated provider of  information technology",
  financials: {
    revenue: [1200, 1300, 1250, 1280, 1320, 1350, 1400, 1450, 1500, 1550, 1600, 1650],
    earnings: [200, 210, 205, 215, 220, 225, 230, 235, 240, 245, 250, 255]
  }
};


let tableExample; // example of CSV
let currentScene = 5; // Start with scene 1
let currentEventScene = 'company';
let currentIntroScene = 'splash';
let isPlaying = true;
let nextChangeTime = 0;
let gameFinished = false; // Flag to indicate if the game has finished
let bankBalance = 100000; // Initial bank balance

let currentDate = new Date(1995, 0, 1);
let rowIndex = 0; // To keep track of the current index in the loaded data
let aspectRatio = (600/800);

let tradeLog = [];

let helpOverlay = [];


function preload() {
  bgImg = loadImage('img/terminal_wide.png'); // Make sure to place the correct path to your image
  loadJSON('data/stock_prices.json', loadData); // Load the stock prices from the JSON file
  eventsJSON = loadJSON('data/events.json');
  loadJSON('data/companies.json', (data) => {
    companies = data.companies; // Assuming your JSON structure has a "companies" array
  });
  companyPricesCSV = loadTable('data/companyPrices.csv', 'csv', 'header');
  treadMasterCSV = loadTable('data/treadmaster.csv', 'csv', 'header');
  drilltechCSV = loadTable('data/drilltech.csv', 'csv', 'header');
  healthcareCSV = loadTable('data/healthcare.csv', 'csv', 'header');
  pharamaCSV = loadTable('data/pharama.csv', 'csv', 'header');
  smartmartCSV = loadTable('data/smartmart.csv', 'csv', 'header');
  // Load the song
  //song = loadSound('mp3/short-test.mp3');
  pauseSong = loadSound('mp3/pause.mp3');
  pageSong = loadSound('mp3/page.mp3');
  cashSong = loadSound('mp3/cash.mp3');
  eventSong = loadSound('mp3/event.mp3');
  musicTime = loadSound('mp3/music.mp3');
  timelineMusic = [];
  timelineMusic[0] = loadSound('mp3/1.mp3');
  timelineMusic[1] = loadSound('mp3/2.mp3');
  timelineMusic[2] = loadSound('mp3/3.mp3');
  // Load the background image, replace 'background.jpg' with your image file path
  bgImage = loadImage('splash.png');
  bgBoss = loadImage('boss.png');
  introImage = loadImage('splash.jpg');
  eventImage = loadImage('event.png');

  //rooms
  tradeImg = [];
  tradeImg[0] = loadImage('img/trade1.png');
  tradeImg[1] = loadImage('img/trade2.png');
  tradeImg[2] = loadImage('img/trade3.png');
  eventImg = [];
  eventImg[0] = loadImage('img/event1.png');
  eventImg[1] = loadImage('img/event2.png');
  eventImg[2] = loadImage('img/event3.png');


  tableExample = loadTable("data/example.csv", "csv", "header");
}


function loadData(data) {
  // Assuming data is an array of objects with 'price' as one of the keys
  stockPrices = data.map(entry => entry.price);
}

function setup() {

  //createCanvas(windowWidth, windowHeight);
  noSmooth(); // This disables anti-aliasing, making the line pixelated
  initializeInputsAndLabels();
  //set the aspect ratio
  
  createCanvas(windowWidth, windowWidth * aspectRatio);
  createCanvas(1024,768);
  
  textFont('Courier New'); // Monospace font for uniform character spacing
  textSize(12); // Larger size for readability
  textAlign(LEFT, TOP);
  frameRate(10);

 setupNarrative();

//   select('#scene1Button').mousePressed(() => {
//         currentScene = 1;
//         song.play();
//         //musicTime.stop();
//     });
//     // Button for switching to scene 2
//     select('#scene2Button').mousePressed(() => {
//         currentScene = 2;
//         song.stop();
//         //musicTime.play();
//     });

//     // Button for switching to scene 2
//     select('#scene3Button').mousePressed(() => {
//       currentScene = 3;
//       song.stop();
//       musicTime.stop();
//   });

//   // Button for switching to scene 2
//   select('#scene4Button').mousePressed(() => {
//     currentScene = 4;
//     eventSong.jump(0);
//     eventSong.play();
//     song.stop();
//     musicTime.stop();
// });

    

    terminalLeft = width * 0.15;
    terminalTop = height * 0.15;
    terminalRight = width * 0.85;
    terminalBottom = height * 0.62;
    terminalWidth = terminalRight - terminalLeft;
    terminalHeight = terminalBottom - terminalTop;

}

function draw() {

  if (currentScene === 1) {
    drawDecisionScene();
  } else if (currentScene === 2) {
    drawTimeLine();
  } else if (currentScene === 3) {
    drawNarrative();
  } else if (currentScene === 4) {
    drawEventScene(lastEvent);
  } else if (currentScene === 5) {
    drawIntro();
  } else if (currentScene === 6) {
    drawEnding();
  }

  drawHelpOverLay();

}

function drawHelpOverLay(){

  let txt;
  let myImage;

  for (var i = 0; i < helpOverlay.length ; i++) { 
    //debugger
    if(millis() < helpOverlay[i].milliSec){
      txt = helpOverlay[i].txt;
      myImage = helpOverlay[i].img;
      break;
      //play relevant sound here

    }
  }

  if(txt == null) {return;}
    
  // Define the rectangle and its properties
  let rectX = 50; // X position of the rectangle
  let rectWidth = 500; // Width of the rectangle
  let rectHeight = 80; // Height of the rectangle

  let rectY = height - rectHeight - 20; // Y position of the rectangle
  let cornerRadius = 20; // Corner radius for rounded corners
  
  // Draw the rectangle with rounded corners
  fill(255); // Set the fill color for the rectangle
  //noStroke(); // No stroke for the rectangle
  stroke(100);
  strokeWeight(2);
  rect(rectX, rectY, rectWidth, rectHeight, cornerRadius);
  
  // Calculate the image size to fit the height of the rectangle
  let imageHeight = rectHeight;
  let imageWidth = (myImage.width * imageHeight) / myImage.height;
  
  // Draw the image on the left side of the rectangle
  image(myImage, rectX + cornerRadius, rectY, imageWidth, imageHeight);
  
  // Set up the text properties
  fill(0); // Set the text color
  textSize(14); // Set the text size
  strokeWeight(0);
  textStyle(BOLDITALIC);
  textAlign(LEFT, TOP);
  // Define the text box dimensions and position
  let textBoxX = rectX + imageWidth + 20 + cornerRadius; // X position of the text box, with some padding from the image
  let textBoxY = rectY + 10; // Y position of the text box, with some padding from the top of the rectangle
  let textBoxWidth = rectWidth - imageWidth - 40; // Width of the text box, accounting for padding
  let textBoxHeight = rectHeight - 10; // Height of the text box, accounting for padding

  // Draw the text within the text box area
  text(txt, textBoxX, textBoxY, textBoxWidth, textBoxHeight);
}


function keyPressed() {
  if (document.activeElement.tagName === 'INPUT') {
    // If so, return and don't execute the rest of the code
    return;
  }

  if (keyCode === 32 && currentScene === 2 ) { // Space bar
    if (!gameFinished) {
      isPlaying = !isPlaying;
      if (isPlaying && !song.isPlaying()) {
        song.loop(); // Play the song if the game is playing
      } else if (!isPlaying && song.isPlaying()) {
        pauseSong.play();
        song.pause(); // Pause the song if the game is paused  
      }
    } else {
      resetGame();
    }
  }
  
  if (currentScene === 4) { //key handler for Event scene
    //handle keyboard entry for events
    console.log('CURRENTSCENE:',currentEventScene)
    if (keyCode === RIGHT_ARROW && currentEventScene === 'company') {
      currentEventScene = 'event'; // Switch to financials view
    } else if (keyCode === LEFT_ARROW && currentEventScene === 'event') {
      currentEventScene = 'company'; // Switch to financials view
    }else if (keyCode === RIGHT_ARROW && currentEventScene === 'event') {
      currentEventScene = 'financials'; // Switch to financials view
    } else if (keyCode === LEFT_ARROW && currentEventScene === 'financials') {
      currentEventScene = 'event'; // Switch back to description view
    } else if (keyCode === RIGHT_ARROW && currentEventScene === 'financials') {
      currentEventScene = 'report'; // Switch back to description view
    } else if (keyCode === LEFT_ARROW && currentEventScene === 'report') {
      currentEventScene = 'financials'; // Switch to financials view
    } else if (keyCode === ENTER && currentEventScene === 'report') {
      currentScene = 2;
      
      //set scene to company intro for first month, otherwise get straight into the event
      var targetDate = new Date('1995-01-27');
      if (currentDate < targetDate){
        currentEventScene = 'company';
      } else {
        currentEventScene = 'event';
      }
      eventSong.pause();
  }} else if (currentScene === 5) { //key handler for introduction splash screen
    if (currentIntroScene === 'splash') { 
      currentIntroScene = 'intro';
      musicTime.play();
    } else if (currentIntroScene === 'intro') {
      currentScene = 2;
    }
  }
}



function windowResized() {
  positionInputWrapper();
}

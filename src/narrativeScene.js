let inputFieldsCreated = false;
let inputContainer; // Ensure this is declared globally

function setup() {
  createCanvas(windowWidth, windowHeight);
  inputContainer = createDiv(''); // Dynamically create the container
  inputContainer.id('input-fields'); // Assign an ID to the container
  inputContainer.style('position', 'absolute'); // Position the container
  inputContainer.style('top', '10px'); // Adjust the position as needed
  inputContainer.style('left', '10px');
  // Removed createInputFields() from here
}

function drawNarrative() {
  background(bgImg);
  if (!inputFieldsCreated) {
    createInputFields();
    inputFieldsCreated = true; // Prevent further calls
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function createInputFields() {
  companies.forEach((company, index) => {
    // Create a div for each row to keep label and input together
    const rowDiv = createDiv('');
    rowDiv.style('margin-bottom', '10px'); // Add some spacing between rows

    const label = createElement('label', `${company.name}: `);
    label.parent(rowDiv); // Append the label to the row div

    // Initialize the input with the fair value for this company
    const input = createInput(fairValues[index].fv.toString());
    input.attribute('placeholder', 'Enter Fair Value');
    input.parent(rowDiv); // Append the input to the row div

    rowDiv.parent(inputContainer); // Append the row div to the main container

    input.changed(() => {
      // Update the fair value when the input changes
      const newValue = parseFloat(input.value());
      if (!isNaN(newValue)) { // Ensure the input is a valid number
        fairValues[index].fv = newValue; // Update the fair value
      }
    });
  });

  const submitButton = createButton('Submit');
  submitButton.parent(inputContainer);
  submitButton.mousePressed(updateFairValues);
}

function updateFairValues() {
  // Iterate over all input fields to update the fairValues array
  const inputs = selectAll('input'); // This selects all input elements. If you have other input elements, you might need to refine this selector.
  inputs.forEach((input, index) => {
    const value = parseFloat(input.value()); // Parse the input value as a float
    if (!isNaN(value)) { // Check if the parsed value is a valid number
      fairValues[index].fv = value; // Update the fair value at the corresponding index
    }
  });

  // Optional: Log the updated fairValues array to console for verification
  console.log(fairValues);

  // Here you can also add any other logic you need after updating the fairValues, 
  // such as re-rendering parts of your interface or saving the updated values somewhere.
}
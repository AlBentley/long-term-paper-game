let inputFieldsCreated = false;
 // Ensure this is declared globally

function setupNarrative() {
  // createCanvas(windowWidth, windowHeight);
  inputContainer = createDiv(''); // Dynamically create the container
  inputContainer.id('input-fields'); // Assign an ID to the container
  // Apply styles to make it look like a modal and center it
  inputContainer.style('display', 'flex');
  inputContainer.style('flex-direction', 'column');
  inputContainer.style('align-items', 'center');
  inputContainer.style('justify-content', 'center');
  inputContainer.style('position', 'absolute');
  inputContainer.style('top', '50%');
  inputContainer.style('left', '50%');
  inputContainer.style('transform', 'translate(-50%, -50%)');
  inputContainer.style('background-color', 'rgba(255, 255, 255, 0.95)');
  inputContainer.style('padding', '20px');
  inputContainer.style('border-radius', '8px');
  inputContainer.style('box-shadow', '0 4px 8px rgba(0, 0, 0, 0.1)');
  inputContainer.style('width', 'auto');
  inputContainer.style('max-width', '90%'); // Prevents the modal from being too wide on larger screens
  inputContainer.hide();
}

function drawNarrative() {
  if (!inputFieldsCreated) {
    createInputFields();
    inputFieldsCreated = true; // Prevent further calls
  } else if (inputFieldsCreated) {
    inputContainer.show(); //Show input fields if narrativeScene is being reDrawn
  }
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
  hideNarrative()
}

function hideNarrative() {
  inputContainer.hide();
}
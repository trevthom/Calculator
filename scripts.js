let btnClear = document.getElementById("clear");
let btnChangeSign = document.getElementById("changeSign");
let btnPercentage = document.getElementById("percentage");
let btnDecimal = document.getElementById("decimal");
let resultDisplay = document.getElementById("result");
let leftOperand = 0;
let rightOperand = 0;
let operator = '';
let firstClick = true;
let decimal = false;
let numClicks = 0;

// populate 0-9 with onclick attributes
const digitNodes = document.getElementsByClassName("number");
Array.from(digitNodes).forEach(( node ) => { 
	node.setAttribute("onclick", "digitClicked()");
});

// populate operators with onlick attributes
const operatorNodes = document.getElementsByClassName("operator");
Array.from(operatorNodes).forEach(( node ) => { 
	node.setAttribute("onclick", "operatorClicked()");
});

btnClear.onclick = function() {
	resultDisplay.innerText = 0;
	leftOperand = 0;
	rightOperand = 0;
	operator = '';
	firstclick = true;
	decimal = false;
	numClicks = 0;
}

btnChangeSign.onclick = function() {
	if (leftOperand != 0) {
		leftOperand *= -1;
		resultDisplay.innerText = leftOperand;
	}
}

btnPercentage.onclick = function() {
	percentage = true;
	operatorClicked();
}

btnDecimal.onclick = function() {
	decimal = true;
}

function operatorClicked() {
	if (operator == 'divide') {
		if (percentage) {
			leftOperand = parseFloat((leftOperand / (rightOperand / 100 * leftOperand)).toFixed(10));
		} else {
			leftOperand = parseFloat((leftOperand / rightOperand).toFixed(9));
		}	
	} else if (operator == 'multiply') {
		if (percentage) {
			leftOperand = parseFloat((leftOperand * (rightOperand / 100 * leftOperand)).toFixed(10));
		} else {
			leftOperand = parseFloat((leftOperand * rightOperand).toFixed(9));
		}
	} else if (operator == 'subtract') {
		if (percentage) {
			leftOperand = parseFloat((leftOperand - (rightOperand / 100 * leftOperand)).toFixed(10));
		} else {
			leftOperand = parseFloat((leftOperand - rightOperand).toFixed(9));
		}
	} else if (operator == 'add') {
		if (percentage) {
			leftOperand = parseFloat((leftOperand + (rightOperand / 100 * leftOperand)).toFixed(10));
		} else {
			leftOperand = parseFloat((leftOperand + rightOperand).toFixed(9));
		}
	} else {
		operator = '';
	}

	operator = event.target.id;
	resultDisplay.innerText = leftOperand;
	firstClick = true;
	percentage = false;
	decimal = false;
	numClicks = 0;
}

function digitClicked() {
	// handles 1s & 0.1s place
	if (firstClick) {
		// no operator clicked yet
		if (operator == '') {
			if (decimal) {
				console.log(leftOperand);
				console.log(event.target.textContent);
				numClicks++;
				leftOperand += parseFloat(event.target.textContent) * 0.1;
				console.log(leftOperand);
			} else {
				leftOperand = parseFloat(event.target.textContent);
			}

			resultDisplay.innerText = leftOperand;
		} 
		// an operator has been clicked
		else {
			if (decimal) {
				rightOperand += parseFloat(event.target.textContent) * 0.1;
			} else {
				rightOperand = parseFloat(event.target.textContent);
			}

			resultDisplay.innerText = rightOperand;
		}

		firstClick = false;

	// handles multiples of 10's & 0.10s places
	} else {
		// no operator clicked yet
		if (operator == '') {
			if (decimal) {
				numClicks++;
				leftOperand += .1 ** numClicks * parseFloat(event.target.textContent);
			} else {
				leftOperand *= 10;
				leftOperand += parseFloat(event.target.textContent);
			}
			
			resultDisplay.innerText = leftOperand;
		} 
		// an operator has been clicked
		else {
			if (decimal) {
				numClicks++;
				rightOperand += .1 ** numClicks * parseInt(event.target.textContent);
			} else {
				rightOperand *= 10;
				rightOperand += parseFloat(event.target.textContent);
			}
			resultDisplay.innerText = rightOperand;
		}
	}
}

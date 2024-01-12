class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.currentOperandText = currentOperandText;
    this.previousOperandText = previousOperandText;
    this.clear();
    this.previousEntries = [];
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.Number = "";
    this.operation = undefined;
    this.previousEntries = [];
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    if (this.currentOperand === "") {
      this.currentOperand = this.previousOperand;
      this.previousOperand = "";
      this.operation = undefined;
    }
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
    this.Number += number;
  }

  chooseOperation(operation) {
    if (this.currentOperand === "" && operation !== "-") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    if (
      this.operation == "%" ||
      this.operation == "sin" ||
      this.operation == "cos" ||
      this.operation == "tan" ||
      this.operation == "x2" ||
      this.operation == "x3" ||
      this.operation == "√" ||
      this.operation == "∛"
    ) {
      this.compute();
    } else {
      this.previousOperand = this.currentOperand;
      this.currentOperand = "";
    }
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand) || 0;
    const curr = parseFloat(this.currentOperand);
    if (isNaN(curr) || isNaN(prev)) return;
    switch (this.operation) {
      case "+":
        computation = prev + curr;
        break;
      case "-":
        computation = prev - curr;
        break;
      case "*":
        computation = prev * curr;
        break;
      case "÷":
        computation = prev / curr;
        break;
      case "%":
        computation = curr / 100;
        break;
      case "sin":
        computation = Math.sin(curr);
        break;
      case "cos":
        computation = Math.cos(curr);
        break;
      case "tan":
        computation = Math.tan(curr);
        break;
      case "x2":
        computation = curr * curr;
        break;
      case "x3":
        computation = curr * curr * curr;
        break;
      case "√":
        computation = Math.sqrt(curr);
        break;
      case "∛":
        computation = Math.cbrt(curr);
        break;
      default:
        return;
    }
    this.previousEntries.push(
      `${this.getDisplayNumber(prev)} ${this.operation} ${this.getDisplayNumber(
        curr
      )} = ${this.getDisplayNumber(computation)}`
    );
    this.currentOperand = computation;
    if (
      this.operation == "%" ||
      this.operation == "sin" ||
      this.operation == "cos" ||
      this.operation == "tan" ||
      this.operation == "x2" ||
      this.operation == "x3" ||
      this.operation == "√" ||
      this.operation == "∛"
    ) {
      this.updateDisplay();
    } else {
      this.operation = undefined;
      this.previousOperand = "";
    }
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  choosing(operation) {
    switch (operation) {
      case "sin":
        this.previousOperandText.innerText = `sin(${this.Number})=`;
        break;
      case "cos":
        this.previousOperandText.innerText = `cos(${this.Number})=`;
        break;
      case "tan":
        this.previousOperandText.innerText = `tan(${this.Number})=`;
        break;
      case "x2":
        this.previousOperandText.innerText = `(${this.Number})^2=`;
        break;
      case "x3":
        this.previousOperandText.innerText = `(${this.Number})^3=`;
        break;
      case "√":
        this.previousOperandText.innerText = `√${this.Number}=`;
        break;
      case "∛":
        this.previousOperandText.innerText = `∛${this.Number}=`;
        break;
      default:
        return;
    }
  }

  updateDisplay() {
    this.currentOperandText.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      if (
        this.operation == "%" ||
        this.operation == "sin" ||
        this.operation == "cos" ||
        this.operation == "tan" ||
        this.operation == "x2" ||
        this.operation == "x3" ||
        this.operation == "√" ||
        this.operation == "∛"
      ) {
        this.choosing(this.operation);
      } else {
        this.previousOperandText.innerText = `${this.getDisplayNumber(
          this.previousOperand
        )} ${this.operation} ${this.getDisplayNumber(this.currentOperand)}`;
        this.currentOperandText.innerText = "";
      }
    } else {
      this.previousOperandText.innerText = "";
    }
  }

  showPreviousEntries() {
    if (this.previousEntries.length > 0) {
      this.currentOperandText.innerText = "";
      this.previousOperandText.innerText = this.previousEntries.join(" | ");
    }
  }
}

const toggle = document.getElementById("togglemodeicon");

toggle.onclick = function () {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    toggle.src = "./assests/moon.png";
  } else {
    toggle.src = "./assests/sun.png";
  }
};

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equal]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousEntriesButton = document.querySelector("[data-previous]");
const previousOperandText = document.querySelector("[data-previous-operand]");
const currentOperandText = document.querySelector("[data-current-operand]");

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

previousEntriesButton.addEventListener("click", () => {
  calculator.showPreviousEntries();
});

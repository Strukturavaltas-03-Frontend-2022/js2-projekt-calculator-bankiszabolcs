//Variables
const inputResult = document.getElementById("inputResult");
const numberCells = Array.from(document.querySelectorAll(".numbers__cell"));
const equalButton = document.querySelector(".equal");

//A function that gives you the value of inputResult.
const getValueFromInput = () => inputResult.value;

//A function that deletes all the values from the input.
const deleteValueFromInput = () => (inputResult.value = "");

//A function that modify the input value the way add the new value to the previous
const modifyInput = (newValue) => {
  if (
    !isNaN(Number(newValue)) ||
    newValue === "." ||
    newValue === "-" ||
    newValue === "+" ||
    newValue === "÷" ||
    newValue === "x"
  )
    inputResult.value = `${getValueFromInput()}${newValue}`;
};

//A function that put eventlisteners on the cells containing numbers.
(function () {
  const newNumberCells = numberCells.filter((cell) => cell.textContent !== "C");
  console.log(newNumberCells);
  newNumberCells.map((cell) =>
    cell.addEventListener("click", function (event) {
      modifyInput(event.target.dataset.value);
    })
  );
})();

//Put event listeners on the cells containing arithmetics
(function () {
  document
    .querySelector(".arithmetics")
    .addEventListener("click", function (e) {
      const actualEl = e.target.textContent;
      if (
        actualEl === "-" ||
        actualEl === "+" ||
        actualEl === "÷" ||
        actualEl === "x"
      )
        modifyInput(actualEl);
    });
})();

//Make Clear button work
(function () {
  document
    .getElementsByClassName("numbers__cell--clear")[0]
    .addEventListener("click", deleteValueFromInput);
})();

// Make Equal button work
equalButton.addEventListener("click", function () {
  let userInput = getValueFromInput().replaceAll("x", "*").replaceAll("÷", "/");
  let result = new Function("return " + userInput)();
  console.log(result);
});

const adder = (a, b) => a + b;
const extraction = (a, b) => a - b;
const multiplier = (a, b) => a * b;
const divider = (a, b) => a / b;

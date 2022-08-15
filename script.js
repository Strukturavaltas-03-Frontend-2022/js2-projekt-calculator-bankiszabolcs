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
    newValue === " - " ||
    newValue === " + " ||
    newValue === " ÷ " ||
    newValue === " x "
  )
    inputResult.value = `${getValueFromInput()}${newValue}`;
  const inputArr = [...getValueFromInput().trimEnd()];
  const lastChar = inputArr[inputArr.length - 1];
  lastChar === "-" || lastChar === "+" || lastChar === "÷" || lastChar === "x"
    ? deleteArithmeticsClick()
    : arithmeticsClick();
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
  arithmeticsClick();
})();
function check(e) {
  const actualEl = e.target.textContent;
  if (
    actualEl === "-" ||
    actualEl === "+" ||
    actualEl === "÷" ||
    actualEl === "x"
  )
    modifyInput(" " + actualEl + " ");
  console.log(e);
}
//Put event listeners on the cells containing arithmetics
function arithmeticsClick() {
  document.querySelector(".arithmetics").addEventListener("click", check);
}
//Delete event listeners from the aritmetics buttons
function deleteArithmeticsClick() {
  document.querySelector(".arithmetics").removeEventListener("click", check);
}
//Make Clear button work
(function () {
  document
    .getElementsByClassName("numbers__cell--clear")[0]
    .addEventListener("click", deleteValueFromInput);
})();

// Make Equal button work
equalButton.addEventListener("click", function () {
  let userInput = getValueFromInput().replaceAll("x", "*").replaceAll("÷", "/");

  const tag = (texts, ...values) => {
    console.log(texts);
    console.log(values);
  };

  let userInputArr = userInput.split(" ");
  let arithmeticArr = userInputArr.filter(
    (item) => item === "+" || item === "-" || item === "*" || item === "/"
  );
  let numberArr = userInputArr.filter(
    (item) => item !== "+" && item !== "-" && item !== "*" && item !== "/"
  );

  console.log(userInputArr);
  console.log(arithmeticArr);
  console.log(numberArr);
  let sum = 0;
  //tag("" + userInput);
  numberArr.map((item, index) => {
    let partSum = 0;
    if (arithmeticArr[index] === "+")
      partSum = Number(item) + Number(numberArr[index + 1]);
    if (arithmeticArr[index] === "-") partSum = item - numberArr[index + 1];
    if (arithmeticArr[index] === "*") partSum = item * numberArr[index + 1];
    if (arithmeticArr[index] === "/") partSum = item / numberArr[index + 1];
    sum = partSum + sum;
  });
  console.log(sum);
  deleteValueFromInput();
  modifyInput(sum);
});

const adder = (a, b) => a + b;
const extraction = (a, b) => a - b;
const multiplier = (a, b) => a * b;
const divider = (a, b) => a / b;

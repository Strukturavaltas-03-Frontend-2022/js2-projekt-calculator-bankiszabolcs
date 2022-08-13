/* 
Event propagation kéne
rákattintok a calculatorra kell egyszer:
a)
    számra kattintok mit csináljon meghívja


b) function(érték)
input értéke =+ érték
    */

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
    newValue === "/" ||
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
      console.log(e.target.textContent);
      const actualEl = e.target.textContent;
      if (
        actualEl === "-" ||
        actualEl === "+" ||
        actualEl === "/" ||
        actualEl === "x"
      ) {
        console.log("lefutott");
        modifyInput(e.target.textContent);
      }
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
  console.log(Number(getValueFromInput()));
});

//Extract values from input
const extractValues = () => {
  console.log(getValueFromInput().split("+"));
};

extractValues();

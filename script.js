//Variables
const inputResult = document.getElementById("inputResult");
const numberCells = Array.from(document.querySelectorAll(".numbers__cell"));
const equalButton = document.querySelector(".equal");
let sum = 0;
let partSum=0;
const validKeys= ['0','1','2','3','4','6','7','8','9',',','+','-','/','*', 'Backspace', '.', ' ']
const arithmeticSigns = ['+', '-', '/', '*']

//A function that gives you the value of inputResult.
const getValueFromInput = () => inputResult.value;

//A function that deletes all the values from the input.
const deleteValueFromInput = () => (inputResult.value = "");

 //Enter Button
 window.addEventListener("keydown", function(e){
  if(e.key==='Enter') equal()
 })

//To avoid you are able to type strings
inputResult.addEventListener("keydown", function (e) {
  if(validKeys.indexOf(e.key) < 1) e.preventDefault()
  if(arithmeticSigns.indexOf(e.key) > -1)modifyInput(" ");
/*   if(arithmeticSigns.indexOf([...inputResult.value][length-1])) */
  if(arithmeticSigns.indexOf(e.target.value[e.target.value.length-1]) > -1) modifyInput(" ");
});



//A function that modify the input value the way add the new value to the previous
const modifyInput = (newValue) => {
  if (
    !isNaN(Number(newValue)) ||
    newValue === "." ||
    newValue === " " ||
    newValue === " - " ||
    newValue === " + " ||
    newValue === " ÷ " ||
    newValue === " x "
  ){ 
    inputResult.value = `${getValueFromInput()}${newValue}`;
  const inputArr = [...getValueFromInput().trimEnd()];
  const lastChar = inputArr[inputArr.length - 1];
  lastChar === "-" || lastChar === "+" || lastChar === "÷" || lastChar === "x" //Avoid multiple arithmetic signs
    ? deleteArithmeticsClick()
    : arithmeticsClick();
  }else{
    alert('Write numbers or arithmetic signs!')
  }
};


//A function that put eventlisteners on the cells containing numbers.
(function () {
  const newNumberCells = numberCells.filter((cell) => cell.textContent !== "C");
  newNumberCells.map((cell) =>
    cell.addEventListener("click", function (event) {
      modifyInput(event.target.dataset.value);
    })
  );
  arithmeticsClick();
})();

//Check if one wrote a correct sign and make a whitespace to the calculation algorythm
function checkTheInputs(e) {
  let userInput = getValueFromInput().replaceAll("x", "*").replaceAll("÷", "/");

  //Extract and group the numbers and the arithmetics signs from the big user input array
  let userInputArr = userInput.split(" ");
  let arithmeticArr = userInputArr.filter(
    (item) => item === "+" || item === "-" || item === "*" || item === "/");
    console.log(arithmeticArr);
    if(arithmeticArr.length>0) equal()
  
  const actualEl = e.target.textContent;
  if (
    actualEl === "-" ||
    actualEl === "+" ||
    actualEl === "÷" ||
    actualEl === "x"
  )
    modifyInput(" " + actualEl + " ");
  
}

//Put event listeners on the cells containing arithmetics
function arithmeticsClick() {
  document.querySelector(".arithmetics").addEventListener("click", checkTheInputs);
}

//Delete event listeners from the aritmetics buttons
function deleteArithmeticsClick() {
  document.querySelector(".arithmetics").removeEventListener("click", checkTheInputs);
}

//Make Clear button work
(function () {
  document
    .getElementsByClassName("numbers__cell--clear")[0]
    .addEventListener("click", deleteValueFromInput);
})();

//Logics for calculating 
const calculate = function(){
  let userInput = getValueFromInput().replaceAll("x", "*").replaceAll("÷", "/");

  //Extract and group the numbers and the arithmetics signs from the big user input array
  let userInputArr = userInput.split(" ");
  let arithmeticArr = userInputArr.filter(
    (item) => item === "+" || item === "-" || item === "*" || item === "/");
  let numberArr = userInputArr.filter(
    (item) => item !== '' && item !== "+" && item !== "-" && item !== "*" && item !== "/");

  numberArr.map((item, index) => {
    
    if (arithmeticArr[index] === "+") partSum = Number(item) + Number(numberArr[index + 1]) ;
    if (arithmeticArr[index] === "-") partSum = item - numberArr[index + 1];
    if (arithmeticArr[index] === "*") partSum = item * numberArr[index + 1];
    if (arithmeticArr[index] === "/") partSum = item / numberArr[index + 1];
    
  });

}
//Equal function
const equal = ()=>{
  calculate();
  deleteValueFromInput();
  modifyInput(partSum);
}
// Make Equal button work
equalButton.addEventListener("click", equal);


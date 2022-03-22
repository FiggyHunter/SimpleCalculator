const numbers = document.querySelectorAll(".num");
const clear_all = document.getElementsByClassName("clear-all")[0];
const operators = document.querySelectorAll(".op");
let resultNumber = document.getElementById("result");
let factorNumber = document.getElementById("factors");
let delete_button = document.getElementsByClassName("delete")[0];
let procedure = document.getElementById("procedure");
let last_operator = "";
let last_operator_procedure = "";
let operator_clicked = false;
let equal_sign = document.getElementsByClassName("equal-sign")[0];
let equaled = false;

export function resetResultNumber()
{
  resultNumber.innerHTML = 0; 
}

export function resetFactorNumber()
{
  factorNumber.innerHTML = 0; 
}

export function clearEverything()
{
  resetFactorNumber();
  resetResultNumber();
  procedure.innerHTML = ""; // one instance, no function required
}

// this function is called by delete event listener
export function clearLastDigit()
{
  if (resultNumber.innerText == "0")
    return
  else if (resultNumber.innerText.length !== 1)
  {
    resultNumber.innerText = (resultNumber.innerText).slice(0,-1);
  }
  else resultNumber.innerText = 0;
}
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
let operator_exists = false;
let equal_sign = document.getElementsByClassName("equal-sign")[0];
let equaled = false;

console.log(numbers);
console.log(clear_all);

equal_sign.addEventListener('click', () =>
{
  last_operator_procedure = procedure.innerText.charAt(procedure.innerText.length-1);
  let result = eval(factorNumber.innerText + last_operator_procedure + resultNumber.innerText);
  console.warn(last_operator_procedure);
  clearEverything();
  resultNumber.innerText = result;
  equaled = true;
  result = 0;
})

numbers.forEach((number) => 
{

  if(equaled === true)
  {
    resultNumber.innerText = "";
    equaled = false;
  }
    number.addEventListener('click', ()=> 
    {
      if(operator_clicked === true)
      {
        operator_clicked = false;
        resetResultNumber();
      }
      updateNumber(number.innerHTML);
    });
});

operators.forEach((operator)=>
{
  operator.addEventListener("click", ()=>
  {

    last_operator = operator.innerHTML.toString();

    if(resultNumber.innerText == "0") // checks if operand is null
    {
      procedure.innerText = procedure.innerText.slice(0,-1);
      procedure.innerText += last_operator;
      return;
    }

    let operand = resultNumber.innerHTML;
    if(last_operator == "*" || last_operator =="÷")
    {
      last_operator_procedure = procedure.innerText.charAt(procedure.innerText.length-1);
      factorNumber.innerHTML = eval(factorNumber.innerText + last_operator_procedure + resultNumber.innerText);
      if(resultNumber.innerText !== "0")
      {
        procedure.innerText += operand + last_operator; 
      }
       resetResultNumber();
       return;
    } 

    factorNumber.innerHTML = eval(factorNumber.innerText + last_operator + resultNumber.innerText);
    operator_clicked = true;
    if(resultNumber.innerText !== "0")
    {
      procedure.innerText += operand + last_operator;  
    }
    resetResultNumber();
  });
});

clear_all.addEventListener('click', clearEverything);
delete_button.addEventListener('click',clearLastDigit);

function updateNumber(lastClickedNumber)
{

  if (checkValidity(lastClickedNumber) === false)
    return;

    if(resultNumber.innerText == "0" && lastClickedNumber !==".")
    resultNumber.innerHTML = "";

    resultNumber.innerHTML += lastClickedNumber;

}

function checkValidity(lastClickedNumber)
{

  if(resultNumber.innerText.includes("0") && resultNumber.innerText.includes("."))
  {
    if(lastClickedNumber==".")
    return false;

    return true;
  }

  if(lastClickedNumber == 0)
  {
    if(resultNumber.innerHTML == 0)
    {
      return false;
    }
  }

  if(lastClickedNumber == '.')
  {
    if(resultNumber.innerHTML.includes('.'))
      return false;
  }

  return true;
}

function resetResultNumber()
{
  resultNumber.innerHTML = 0; 
}

function resetFactorNumber()
{
  factorNumber.innerHTML = 0; 
}

function clearEverything()
{
  resetFactorNumber();
  resetResultNumber();
   procedure.innerHTML = "";
}

function clearLastDigit()
{
  if (resultNumber.innerText == "0")
    return
  else if (resultNumber.innerText.length !== 1)
  {
    resultNumber.innerText = (resultNumber.innerText).slice(0,-1);
  }
  else resultNumber.innerText = 0;
}

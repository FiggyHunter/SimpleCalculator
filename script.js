// Variable and constants declarations

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


/* Simple event listeners for the delete and clear button*/
clear_all.addEventListener('click', clearEverything);
delete_button.addEventListener('click',clearLastDigit);

/* When equal button is clicked - render the final result, and reset other fields */ 
equal_sign.addEventListener('click', () =>
{
  let result = 0;
  if(factorNumber.innerText == "0")
  {
    last_operator_procedure = procedure.innerText.charAt(procedure.innerText.length-1);

    if(procedure.innerText.includes("*") || procedure.innerText.includes("/"))
    {
      result = eval(procedure.innerText.slice(0,-1) + last_operator_procedure + resultNumber.innerText).toFixed(3);
    }
    else
    {
      result = eval(procedure.innerText.slice(0,-1) + last_operator_procedure + resultNumber.innerText)
    }
    clearEverything();
    resultNumber.innerText = result;
    equaled = true;
    return;
  }

  last_operator_procedure = procedure.innerText.charAt(procedure.innerText.length-1);
   result = eval(factorNumber.innerText + last_operator_procedure + resultNumber.innerText).toFixed(3);
  clearEverything();
  resultNumber.innerText = result;
  equaled = true;
})

/* numbers have similar behaviours, so a forEach was used, different scenarios are specified further */
numbers.forEach((number) => 
{
    number.addEventListener('click', ()=> 
    {
      if(equaled === true)
      {
        resultNumber.innerText = "";
        equaled = false;
      }

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
    console.log(last_operator);
    if(last_operator == "*" || last_operator == "/")
    {

      if(factorNumber.innerText != "0")
      {
        console.warn("hit_1");
        procedure.innerText += resultNumber.innerText + last_operator;  
        factorNumber.innerText = eval(procedure.innerText.slice(0,-1)).toFixed(3);
        resetResultNumber();
        return;
      }

      if(procedure.innerText !== "" && resultNumber.innerText!=="0" && factorNumber.innerText=="0")
      {
        console.warn("4")
        procedure.innerText += resultNumber.innerText;
        factorNumber.innerText = eval(procedure.innerText);
        procedure.innerText += last_operator;
        resetResultNumber();
        return;
      }

      if(procedure.innerText == "")
      {
        console.warn("hit_2");
        procedure.innerText +=  resultNumber.innerText + last_operator; 
      
        resetResultNumber();
        return;
      }

      else
      {
        console.warn("hit_3");
        if(procedure.innerText.includes("-") || procedure.innerText.includes("+") )
        {
          factorNumber.innerText = eval(factorNumber.innerText + last_operator + resultNumber.innerText);
        }
        else
        {
          factorNumber.innerText = eval(procedure.innerText + resultNumber.innerText).toFixed(3);
        }
        procedure.innerText += resultNumber.innerText + last_operator;
        resetResultNumber();
        return;
      }
    } 


    let expression = eval(resultNumber.innerText + last_operator + "0");
    if(procedure.innerText == "")
    {
      procedure.innerText += expression + last_operator;
      resetResultNumber();
      return;
    }

    if(factorNumber.innerText == "0")
    {
      factorNumber.innerText = eval(procedure.innerText + resultNumber.innerText).toFixed(4);
      procedure.innerText += resultNumber.innerText + last_operator;
      resetResultNumber();
      return;
    }

    factorNumber.innerText = eval(procedure.innerText + resultNumber.innerText).toFixed(3);
    procedure.innerText += resultNumber.innerText + last_operator;
    resetResultNumber();
    return;
  });
});

// Renders a number
function updateNumber(lastClickedNumber)
{
  if (checkValidity(lastClickedNumber) === false)
    return;

  if(resultNumber.innerText == "0" && lastClickedNumber !==".")
    resultNumber.innerHTML = "";

  resultNumber.innerHTML += lastClickedNumber;
}

// Prevents multiple "0" and "." values 
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
  procedure.innerHTML = ""; // one instance, no function required
   result = 0;
}

// this function is called by delete event listener
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
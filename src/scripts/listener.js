export default function listener (key) 
{
    const numbers = document.querySelectorAll(".num");
    const clear_all = document.getElementsByClassName("clear-all")[0];
    const operators = document.querySelectorAll(".op");
    let delete_button = document.getElementsByClassName("delete")[0];
    let equal_sign = document.getElementsByClassName("equal-sign")[0];

  switch (key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      numbers[parseInt(key) - 1].click();
      break;

    case "/":
      operators[0].click();
      break;

    case "*":
      operators[1].click();
      break;

    case "+":
      operators[2].click();
      break;

    case "-":
      operators[3].click();
      break;

    case "=":
      equal_sign.click();
      break;

    case "Enter":
      equal_sign.click();
      break;

    case "c":
      clear_all.click();
      break;

    case "Delete":
      delete_button.click();
      break;
  };
}
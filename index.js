const pass_display = document.querySelector(".password-display");
const copy_btn = document.querySelector(".copy-btn");
const copy_message = document.querySelector(".copy-message");

const pass_length = document.querySelector(".pass-length");
const range = document.querySelector(".Range-bar");

const upperCase = document.querySelector("#upper");
const lowerCase = document.querySelector("#lower");
const number = document.querySelector("#number");
const symbol = document.querySelector("#symbol");
const allcheckbox = document.querySelectorAll("input[type=checkbox]");

const strength_color = document.querySelector(".strength-indicator");
const btn_generate = document.querySelector(".btn-generator");

let password = "";
let passwordlength = 10;
// let check_tick = 1;
// color

sliderHandel();
function sliderHandel() {
  range.value = passwordlength;
  pass_length.innerText = passwordlength;
  const min= range.min;
  const max= range.max;
  range.style.backgroundSize =((passwordlength-min)*100/(max-min)) + "% 100%";
}

// const set_number = () => {
// pass_length.innerText = range.value;
// };             

range.addEventListener("input", (e) => {
  passwordlength = range.value;
  sliderHandel();
});

// setIndicator("#008000");
function setIndicator(c) {
  strength_color.style.cssText = `box-shadow:0px 0px 10px ${c}; background-color:${c};`;
}

function getRandom(max, min) {
  return (ran = Math.floor(Math.random() * (max - min) + min));
}

function getRandomNumber() {
  return getRandom(9, 0);
}
function getRandomUpperCase() {
  return String.fromCharCode(getRandom(65, 90));
}
function getRandomLowerCase() {
  return String.fromCharCode(getRandom(97, 122));
}
function getRandomSymbol() {
  return String.fromCharCode(getRandom(33, 47));
}

function calStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNumber = false;
  let hasSymbol = false;
  if (upperCase.checked) hasUpper = true;
  if (lowerCase.checked) hasLower = true;
  if (number.checked) hasNumber = true;
  if (symbol.checked) hasSymbol = true;

  if (
    (hasUpper && hasLower && hasNumber && hasSymbol) ||
    ((hasUpper || hasLower) && (hasNumber || hasSymbol) && passwordlength  >= 8)
  ) {
    setIndicator("#008000");
    console.log("green");
  } else if (
    (hasUpper || hasLower) &&
    (hasNumber || hasSymbol) &&
    passwordlength  < 8 &&
    passwordlength  >= 6
  ) {
    setIndicator("#FFFF00");
    console.log("yellow");
  }
  else if(passwordlength  > 8){
    setIndicator("#008000");
  }
   else {
    setIndicator("#FF0000");
    // console.log("red");
  }
}

async function copyContent() {
  try {
    await navigator.clipboard.writeText(pass_display.value);
    copy_message.innerText = "Copied";
  } catch (e) {
    copy_message.innerText = "Failed";
  }
  copy_message.classList.add("active");
  setTimeout(function () {
    copy_message.classList.remove("active");
    copy_message.innerText = "";
  }, 1500);
}
copy_btn.addEventListener("click", () => {
  if (pass_display.value) {
    copyContent();
  }
});
function handleCheckBoxChange() {
  check_Count = 0;
  allcheckbox.forEach((check) => {
    if (check.checked) {
      check_Count++;
    }
  });
  if (pass_length < check_Count) {
    pass_length = check_Count;
    sliderHandel();
  }
}

allcheckbox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBoxChange);
});



btn_generate.addEventListener("click", () => {
  calStrength();
  let step = 0;
  // if(check_Count=0) return;
  if (pass_length < check_Count) {
    pass_length = check_Count;
    sliderHandel();
  }
  password = "";
  // console.log("first pass");
  if (upperCase.checked) {
    password += getRandomUpperCase();
    step++;
    // console.log("Upper Done");
  }
  if (lowerCase.checked) {
    password += getRandomLowerCase();
    step++;
    // console.log("Lower Done");
  }
  if (number.checked) {
    password += getRandomNumber();
    step++;
    // console.log("number Done");
  }
  if (symbol.checked) {
    password += getRandomSymbol();
    step++;
    // console.log("Symbol Done");
  }
  if (step == 0) {
    password = "";
    pass_display.value = password;
    console.log("yahaa");
    setIndicator("#808080");

    return;
  }

  for (let i = 0; i < parseInt(pass_length.innerText) - step; i++) {
    // console.log("number"+i);
    let c = 0;
    let ans = getRandom(5, 1);
    // console.log("Switch done "+ans);
    switch (ans) {
      case 1: {
        if (!upperCase.checked) {
          c++;
          break;
        }
        if (upperCase.checked) {
          password += getRandomUpperCase();
          break;
        }
      }
      case 2: {
        if (!lowerCase.checked) {
          c++;
          break;
        }
        if (lowerCase.checked) {
          password += getRandomLowerCase();
          break;
        }
      }

      case 3: {
        if (!number.checked) {
          c++;
          break;
        }
        if (number.checked) {
          password += getRandomNumber();
          break;
        }
      }
      case 4: {
        if (!symbol.checked) {
          c++;
          break;
        }
        if (symbol.checked) {
          password += getRandomSymbol();
          break;
        }
      }
    }
    if (c == 1) {
      i--;
    }
  }

  // console.log("Third pass");

  pass_display.value = password;
  // console.log(password.length);
});

//1A initial Dom Manipulation
const checkbox = document.getElementById('checkbox');
const controlForm = document.querySelectorAll('.form-control') // returns a collection

// 2 toggle h4 focus class
const inputs = document.querySelectorAll('.control-input');

/*3 third */
const cta = document.querySelector(".cta")
let booleanControl = true; // true means convert to RGB otherwise convert to HEx
//3.2 get our hexVal
let hexVal = document.getElementById('hexVal');
//3.3 setAlert
let message = document.querySelector('.message');
// 3.5 dom maniputaltion convertToRGB display results
let current_hexVal = document.getElementById('current_hexVal')
let board = document.querySelector('.board')
let result = document.getElementById('result')
let curr_R = document.getElementById('current_rValue')
let curr_G = document.getElementById('current_gValue')
let curr_B = document.getElementById('current_bValue')

const focusFx = (i) => { i.parentNode.classList.add('focus') }
const blurFx = (i) => { (!i.value) && i.parentNode.classList.remove('focus') }

inputs.forEach(i => {
  i.addEventListener('focus', ()=> focusFx(i))
  i.addEventListener('blur', ()=> blurFx(i))
})

// 1b: Toggle
checkbox.addEventListener('click', ()=>{
  controlForm.forEach(i => i.classList.toggle('d-none'))
})

/* 3.2 */
const checkHash = (val) => { 
  let hash = /#/; //yes, sorry regex
  if(hash.test(val)) val = val.slice(1) //or = val.replace(hash,"")
  return val
}

/* 3.3.1. setAlert */
const setAlert = (msm) => {
  message.innerHTML = `<span>${msm}</span><span>X</span>`;
  message.classList.add('alert');

  message.addEventListener('click',()=>{
      message.innerHTML = null;
      message.classList.remove('alert');
  })
}

/* 3.4 */
const convertToRGB = (y,len) => { 
  let R; let G; let B;
  let eachChar = []
  for (let i of y) {
    eachChar.push(i)
  }
  console.log(eachChar)
  /* convert each letter to decimal value */
  eachChar.forEach((char,index)=>{
    switch (char) {
        case 'a': eachChar[index] = 10; break;
        case 'b': eachChar[index] = 11; break;
        case 'c': eachChar[index] = 12; break;
        case 'd': eachChar[index] = 13; break;
        case 'e': eachChar[index] = 14; break;
        case 'f': eachChar[index] = 15; break;
        default: eachChar[index] = +(eachChar[index]);  break;
    }
  })
  console.log(eachChar)
  //Hexadecimal to decimal
  if(len > 3){ //if we have our 6 digits/characters
    //[0,1,2,3,4,5]
    R = 16*eachChar[0] + eachChar[1];
    G = 16*eachChar[2] + eachChar[3];
    B = 16*eachChar[4] + eachChar[5];
    console.log(R, G, B);
  }
  else{
    //[0,1,2]
    R = 16*eachChar[0] + eachChar[0];
    G = 16*eachChar[1] + eachChar[1];
    B = 16*eachChar[2] + eachChar[2];
    console.log(R, G, B);
  }
  //Finally DOM
  hexVal.value = '';
  board.style.backgroundColor = `#${y}`;
  current_hexVal.textContent = `#${y}`;
  result.textContent = `rgb(${R},${G},${B})`;
  blurFx(hexVal);
  //if we click the checkbox
  curr_R.textContent = `R-${R}`;
  curr_G.textContent = `G-${G}`;
  curr_B.textContent = `B-${B}`;
}

const handleToRGB = () => { 
  let y = checkHash(hexVal.value.toLowerCase().trim())
  console.log(y)
  // 3.4
  let len = y.length;
  let rgx6 = /[a-f\d]{6}/ig; // Check correct hex value, let hex = /[a-f0-9]{6}/ig;
  let rgx3 = /[a-f\d]{3}/ig;

  /* 3.3 form validation */
  if(!y){
    setAlert("the entry can't be empty");
  }
  /* 3.4 what if they success */
  else if((len === 3 && rgx3.test(y)) || (len === 6 && rgx6.test(y))){
    // console.log('success')
    convertToRGB(y,len)
  }
  // or if the user types anything else
  else{
    hexVal.value = ''
    setAlert("Oops! something went wrong with the given value");
    blurFx(hexVal)
  }
}

const handleToHex = () => { 
  console.log('handle to Hex')
 }

// 3.1 CTA button
cta.addEventListener('click', (e)=>{
  e.preventDefault();
  if(booleanControl) handleToRGB()
  else handleToHex()
})

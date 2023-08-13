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
  /* Step 4 */
  booleanControl = !booleanControl;
    if(booleanControl){
      // from convertToRGB removing "R-" = slice(2)
        let sliceR = curr_R.textContent.slice(2);
        let sliceG = curr_G.textContent.slice(2);
        let sliceB = curr_B.textContent.slice(2);
        result.textContent =  `rgb(${sliceR},${sliceG},${sliceB})`;
    }else{
        result.textContent = `${current_hexVal.textContent}`;
    }
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
  let rgb = ['R','G', 'B']
  let eachChar = []
  let rgbObj ={}
  for (let i of y) {
    eachChar.push(i)
  }
  console.log(eachChar)
  /* convert each letter to decimal value */
  const charToNumeric = {
    'a': 10,
    'b': 11,
    'c': 12,
    'd': 13,
    'e': 14,
    'f': 15
  };
  eachChar = eachChar.map(char => charToNumeric[char] !== undefined ? charToNumeric[char] : +char);
  console.log(eachChar)
  //Hexadecimal to decimal
  if(len > 3){ //if we have our 6 digits/characters
    //[0,1,2,3,4,5]
    for (let i = 0; i < rgb.length; i++) {
      rgbObj[rgb[i]] = 16*eachChar[i * 2] + eachChar[i * 2 + 1]
    }
  }
  else{
    //[0,1,2]
    for (let i = 0; i < rgb.length; i++) {
      rgbObj[rgb[i]] = 16 * eachChar[i] + eachChar[i];
    }
  }
  console.log(rgbObj)
  const {R, G, B} = rgbObj
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

/* step 5 B */
const convertToHEX = (arrRGB) => {
  let myArr = []
  arrRGB.forEach(i =>{
      let q = Math.floor(i/16); //quotient
      let r = i%16; //remainder
      myArr.push(q,r)
  })
  const numericToChar = {
     10:'A' ,
     11:'B',
     12:'C',
     13:'D',
     14:'E',
     15:'F'
  };
  myArr = myArr.map(num => numericToChar[num] !== undefined ? numericToChar[num] : num);
  //Finally the DOM
  board.style.backgroundColor = `#${myArr.join('')}`;
  result.textContent = `#${myArr.join('')}`;
  current_hexVal.textContent = `#${myArr.join('')}`;
}

/* step 5 */
const handleToHex = () => { 
  let arrRGB = []
  // to break forEach we need try and catch
  try {
    inputs.forEach(i => {
      let rgx = /[a-z]/gi;
      // validation - make sure we are working with RGB inputs
      if(i.id !== 'hexVal'){
        console.log(i)
        if(rgx.test(i.value)){
          //console.log(i.value, argx.test(i.value))
          throw "Only numbers allowed" // break
        }
        else if(!i.value || i.value>255 || i.value<0){
          throw "Please Check the values"
        }
        else{
            arrRGB.push(i.value)
        }
      }
    })
  } catch (e) {
    setAlert(e)
  }
  finally{
    inputs.forEach(i=> {
        i.value = '';
        blurFx(i)
    })
  }
  if(arrRGB.length === 3){
    console.log('succeed')
    // step 5B
    convertToHEX(arrRGB)
    curr_R.textContent = `R-${arrRGB[0]}`;
    curr_G.textContent = `G-${arrRGB[1]}`;
    curr_B.textContent = `B-${arrRGB[2]}`;
  }
}

// 3.1 CTA button
cta.addEventListener('click', (e)=>{
  e.preventDefault();
  if(booleanControl) handleToRGB()
  else handleToHex()
})

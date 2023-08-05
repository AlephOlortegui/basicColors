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
    console.log('success')
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

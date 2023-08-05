//1A initial Dom Manipulation
const checkbox = document.getElementById('checkbox');
const controlForm = document.querySelectorAll('.form-control') // returns a collection

// 2 toggle h4 focus class
const inputs = document.querySelectorAll('.control-input');

/*3 third */
const cta = document.querySelector(".cta")
let booleanControl = true; // true means convert to RGB otherwise convert to HEx

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

const handleToRGB = () => { 
  console.log('handle to RGB')
 }

const handleToHex = () => { 
  console.log('handle to Hex')
 }

// 3.1 CTA button
cta.addEventListener('submit', (e)=>{
  e.preventDefault()
  if(booleanControl) handleToRGB()
  else handleToHex()
})

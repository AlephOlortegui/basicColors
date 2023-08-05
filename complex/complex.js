//1A initial Dom Manipulation
const checkbox = document.getElementById('checkbox');
const controlForm = document.querySelectorAll('.form-control') // returns a collection

// 2 toggle h4 focus class
const inputs = document.querySelectorAll('.control-input');

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

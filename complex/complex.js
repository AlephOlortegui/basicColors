//1A initial Dom Manipulation
const checkbox = document.getElementById('checkbox');
const controlForm = document.querySelectorAll('.form-control') // returns a collection

// 1b: Toggle
checkbox.addEventListener('click', ()=>{
  controlForm.forEach(i => i.classList.toggle('d-none'))
})

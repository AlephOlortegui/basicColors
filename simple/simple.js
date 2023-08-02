const container = document.querySelector('.container')
const btnSimple = document.querySelector('.btn-simple')
const result = document.querySelector('.color')
const btnHex = document.querySelector('.btn-hex')

const simpleColors = ["hsl(174, 36%, 64%)","hsl(37, 89%, 67%)","rgb(239, 35, 60)","rgb(83, 144, 217)","hsl(205, 78%, 60%)"];

const hex =  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

const randElement = (arr) => { 
  let randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex]
 }

 btnHex.addEventListener('click', () => {
  let hash = "#";
  for (let i = 0; i < 6; i++) {
    //concatenate
    hash = hash + randElement(hex)
  }
  container.style.backgroundColor = hash;
  result.innerText = hash;
 })

 btnSimple.addEventListener('click',() =>{
  let newBg = randElement(simpleColors)
  container.style.backgroundColor = newBg;
  result.innerText = newBg;
})
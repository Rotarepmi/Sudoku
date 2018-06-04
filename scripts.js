const inputs = document.querySelectorAll('input[type=number]');
const startBtn = document.querySelector('#start');
let lastInput;

// const R1 = document.querySelectorAll('input[data-row=R1]');
// const R2 = document.querySelectorAll('input[data-row=R2]');
// const R3 = document.querySelectorAll('input[data-row=R3]');
// const R4 = document.querySelectorAll('input[data-row=R4]');
// const R5 = document.querySelectorAll('input[data-row=R5]');
// const R6 = document.querySelectorAll('input[data-row=R6]');
// const R7 = document.querySelectorAll('input[data-row=R7]');
// const R8 = document.querySelectorAll('input[data-row=R8]');
// const R9 = document.querySelectorAll('input[data-row=R9]');  
// const C1 = document.querySelectorAll('input[data-col=C1]');
// const C2 = document.querySelectorAll('input[data-col=C2]');
// const C3 = document.querySelectorAll('input[data-col=C3]');
// const C4 = document.querySelectorAll('input[data-col=C4]');
// const C5 = document.querySelectorAll('input[data-col=C5]');
// const C6 = document.querySelectorAll('input[data-col=C6]');
// const C7 = document.querySelectorAll('input[data-col=C7]');
// const C8 = document.querySelectorAll('input[data-col=C8]');
// const C9 = document.querySelectorAll('input[data-col=C9]');
// const S1 = document.querySelectorAll('input[data-square=S1]');
// const S2 = document.querySelectorAll('input[data-square=S2]');
// const S3 = document.querySelectorAll('input[data-square=S3]');
// const S4 = document.querySelectorAll('input[data-square=S4]');
// const S5 = document.querySelectorAll('input[data-square=S5]');
// const S6 = document.querySelectorAll('input[data-square=S6]');

// const nodeLists = [R1, R2, R3, R4, R5, R6, R7, R8, R9, C1, C2, C3, C4, C5, C6, C7, C8, C9, S1, S2, S3, S4, S5, S6];

function startSudoku() {
  for(let i=0; i<16; i++) {
    const input = randomInput();
    const value = randomValue(input);
    input.value = value;
    input.readOnly = true;
  }
}

function randomInput() {
  const randInput = Math.floor(Math.random() * 80);
  if(randInput === lastInput) {
    return randomInput();
  }

  lastInput = randInput;
  return inputs[randInput];
}

function randomValue(randomInput) {
  const row = randomInput.dataset.row;
  const col = randomInput.dataset.col;
  const square = randomInput.dataset.square;
  const value = Math.floor((Math.random() * 9) + 1);

  inputs.forEach(input => {
    if(input.value === value && input !== randomInput && (input.dataset.row === row || input.dataset.col === col || input.dataset.square === square)) {
      console.log('repeated value', row, col, square);
      randomValue(randomInput);
    }
    console.log('repeated value', row, col, square);
  });

  return value;
}

function selectArea(e) {
  const row = e.target.dataset.row;
  const col = e.target.dataset.col;
  const square = e.target.dataset.square;
  colorArea(row, col, square);
}

function leaveArea(e) {
  const row = e.target.dataset.row;
  const col = e.target.dataset.col;
  const square = e.target.dataset.square;
  clearArea(row, col, square);
}

function selectValues(e) {
  const value = e.target.value;
  if(value) {
    inputs.forEach(input => {
      if(input.value === value) {
        const row = input.dataset.row;
        const col = input.dataset.col;
        const square = input.dataset.square;
        colorArea(row, col, square);
      }
    });
  }
}

// function inputChangeHandle(e) {
//   const value = e.target.value;
//   const row = e.target.dataset.row;
//   const col = e.target.dataset.col;
//   const square = e.target.dataset.square;

//   if(value) {
//     inputs.forEach(input => {
//       if(input.value === value && input !== e.target && (input.dataset.row === row || input.dataset.col === col || input.dataset.square === square)) {
//         colorError(e.target, input);
//       }
//       else if(){
//         clearError(e.target, input);
//       }
//     });
//   }
// }

function colorArea(row, col, square) {
  inputs.forEach(input => {
    if(input.dataset.row === row) input.classList.add('select');
    if(input.dataset.col === col) input.classList.add('select');
    if(input.dataset.square === square) input.classList.add('select');
  });
}

function clearArea(row, col, square) {
  inputs.forEach(input => input.classList.remove('select'));
}

inputs.forEach(input => input.addEventListener('mouseenter', selectArea));
inputs.forEach(input => input.addEventListener('mouseleave', leaveArea));
inputs.forEach(input => input.addEventListener('click', selectValues));
// inputs.forEach(input => input.addEventListener('input', inputChangeHandle));
startBtn.addEventListener('click', startSudoku);
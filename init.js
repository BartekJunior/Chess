"use strict";

const squareNode = document.querySelectorAll(`.square`);
const hexAll = Array.from(squareNode);

console.log(hexAll);

console.log(hexAll[0]);

// Show Clicked square //
hexAll.forEach((el, index) => {
  el.addEventListener(`click`, function() {
    console.log(this, index);
    console.log(this.figure);
    
  })
})

// Draw all Board //
const drawWhiteSquare = function () {
  hexAll.forEach((el, index) => {
    if (
      (index < 8 ||
        (index >= 16 && index < 24) ||
        (index >= 32 && index < 40) ||
        (index >= 48 && index < 56)) &&
      index % 2 === 1
    )
    el.style.backgroundColor = `rgb(70, 70, 70)`;

    if (
      ((index >= 8 && index < 16) ||
        (index >= 24 && index < 32) ||
        (index >= 40 && index < 48) ||
        (index >= 56 && index < 64))
        &&
      index % 2 === 0
    )
      el.style.backgroundColor = `rgb(70, 70, 70)`;
  });
};

drawWhiteSquare();



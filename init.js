"use strict";

const squareNode = document.querySelectorAll(`.square`);
const squares = Array.from(squareNode);

console.log(squares);

const drawWhiteSquare = function () {
  squares.forEach((el, index) => {
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

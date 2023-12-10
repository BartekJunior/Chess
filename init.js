"use strict";

const squareNode = document.querySelectorAll(`.square`);
const hexAll = Array.from(squareNode);

// console.log(hexAll);

// Show Clicked square //
hexAll.forEach((el, index) => {
  el.addEventListener(`click`, function () {
    console.log(index, `this is hexAll`);
  });
});

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
        (index >= 56 && index < 64)) &&
      index % 2 === 0
    )
      el.style.backgroundColor = `rgb(70, 70, 70)`;
  });
};

drawWhiteSquare();

// DRAW ALL START FIGURES //
new Figure(`rook`, 0, `black`);
new Figure(`knight`, 1, `black`);
new Figure(`bishop`, 2, `black`);
new Figure(`queen`, 3, `black`);
new Figure(`king`, 4, `black`);
new Figure(`bishop`, 5, `black`);
new Figure(`knight`, 6, `black`);
new Figure(`rook`, 7, `black`);

new Figure(`pawn`, 8, `black`);
new Figure(`pawn`, 9, `black`);
new Figure(`pawn`, 10, `black`);
new Figure(`pawn`, 11, `black`);
new Figure(`pawn`, 12, `black`);
new Figure(`pawn`, 13, `black`);
new Figure(`pawn`, 14, `black`);
new Figure(`pawn`, 15, `black`);

new Figure(`pawn`, 48, `white`);
new Figure(`pawn`, 49, `white`);
new Figure(`pawn`, 50, `white`);
new Figure(`pawn`, 51, `white`);
new Figure(`pawn`, 52, `white`);
new Figure(`pawn`, 53, `white`);
new Figure(`pawn`, 54, `white`);
new Figure(`pawn`, 55, `white`);

new Figure(`rook`, 56, `white`);
new Figure(`knight`, 57, `white`);
new Figure(`bishop`, 58, `white`);
new Figure(`queen`, 59, `white`);
new Figure(`king`, 60, `white`);
new Figure(`bishop`, 61, `white`);
new Figure(`knight`, 62, `white`);
new Figure(`rook`, 63, `white`);


new Figure(`rook`, 27, `white`);




const figures = document.querySelectorAll(`.figure`);

let tempFigureData = [];
let possibleMove = [];

// DROP DROP DROP DROP DROP DROP //
hexAll.forEach((el, index) => {
  // Prevent default behavior to enable drop
  el.addEventListener("dragover", function (event) {
    event.preventDefault();
  });

  // DROP ITSELF
  el.addEventListener("drop", function (event) {
    event.preventDefault();

    if (el.move) {
      new Figure(tempFigureData[0], index, tempFigureData[2], false);
      tempFigureData[3].figure.removeFigure();
      console.log(`DOBRY RUCH`);
    } else {
      console.log(`ZLY RUCH`);
    }
    // Figure.prototype.hideMove(possibleMove);
    // tempFigureData = [];
    // possibleMove = [];
  });
});







// DROP OUTSIDE BOARD DROP OUTSIDE BOARDDROP OUTSIDE BOARD //
window.addEventListener("dragover", function (event) {
  event.preventDefault();
});

window.addEventListener("drop", function (event) {
  event.preventDefault();
  console.log(`ZLY RUCH`);
  Figure.prototype.hideMove(possibleMove);
  tempFigureData = [];
  possibleMove = [];
});


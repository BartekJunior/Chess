"use strict";

const squareNode = document.querySelectorAll(`.square`);
const hexAll = Array.from(squareNode);

console.log(hexAll);

console.log(hexAll[0]);

// Show Clicked square //
hexAll.forEach((el, index) => {
  el.addEventListener(`click`, function () {
    console.log(this, index);
    console.log(this.figure);
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
hexAll[0].figure = new Figure(`rook`, 0, `black`);
hexAll[1].figure = new Figure(`knight`, 1, `black`);
hexAll[2].figure = new Figure(`bishop`, 2, `black`);
hexAll[3].figure = new Figure(`queen`, 3, `black`);
hexAll[4].figure = new Figure(`king`, 4, `black`);
hexAll[5].figure = new Figure(`bishop`, 5, `black`);
hexAll[6].figure = new Figure(`knight`, 6, `black`);
hexAll[7].figure = new Figure(`rook`, 7, `black`);

hexAll[8].figure = new Figure(`pawn`, 8, `black`);
hexAll[9].figure = new Figure(`pawn`, 9, `black`);
hexAll[10].figure = new Figure(`pawn`, 10, `black`);
hexAll[11].figure = new Figure(`pawn`, 11, `black`);
hexAll[12].figure = new Figure(`pawn`, 12, `black`);
hexAll[13].figure = new Figure(`pawn`, 13, `black`);
hexAll[14].figure = new Figure(`pawn`, 14, `black`);
hexAll[15].figure = new Figure(`pawn`, 15, `black`);

hexAll[48].figure = new Figure(`pawn`, 48, `white`);
hexAll[49].figure = new Figure(`pawn`, 49, `white`);
hexAll[50].figure = new Figure(`pawn`, 50, `white`);
hexAll[51].figure = new Figure(`pawn`, 51, `white`);
hexAll[52].figure = new Figure(`pawn`, 52, `white`);
hexAll[53].figure = new Figure(`pawn`, 53, `white`);
hexAll[54].figure = new Figure(`pawn`, 54, `white`);
hexAll[55].figure = new Figure(`pawn`, 55, `white`);

hexAll[56].figure = new Figure(`rook`, 56, `white`);
hexAll[57].figure = new Figure(`knight`, 57, `white`);
hexAll[58].figure = new Figure(`bishop`, 58, `white`);
hexAll[59].figure = new Figure(`queen`, 59, `white`);
hexAll[60].figure = new Figure(`king`, 60, `white`);
hexAll[61].figure = new Figure(`bishop`, 61, `white`);
hexAll[62].figure = new Figure(`knight`, 62, `white`);
hexAll[63].figure = new Figure(`rook`, 63, `white`);

"use strict";

const squareNode = document.querySelectorAll(`.square`);
const hexAll = Array.from(squareNode);

// console.log(hexAll);

// Show Clicked square //
hexAll.forEach((el, index) => {
  el.addEventListener(`click`, function () {
    console.log(index, `this is index`);
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

let figures = Array.from(document.querySelectorAll(`.figure`));
// figures.forEach((element) => {
//   element.setAttribute("draggable", true);
// });

let tempFigureData = [];

// Event listener for when dragging starts
figures.forEach((el, index) => {
  el.addEventListener("dragstart", function (event) {
    event.dataTransfer.setData("text/plain", "Drag me!");
    const figure = el.figure;
    tempFigureData = [figure.type, figure.place, figure.color];
    console.log(tempFigureData);
  });
});

// Event listener for when dragging is over the droppable area
hexAll.forEach((el, index) => {
  // Prevent default behavior to enable drop
  el.addEventListener("dragover", function (event) {
    event.preventDefault();
  });

  // Event listener for when the element is dropped
  el.addEventListener("drop", function (event) {
    event.preventDefault();

    // Append the new element to the droppable area
    const newFigure = new Figure(tempFigureData[0], index, tempFigureData[2]);

    // to jest do dupy!!!!!! zmien to!!! //
    newFigure.addEventListener(`click`, function (event) {
      const figure = el.figure;
      tempFigureData = [figure.type, figure.place, figure.color];
      console.log(tempFigureData);
    });

    tempFigureData = [];
  });
});

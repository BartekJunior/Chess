"use strict";

// const UUID = `bartek`;
const UUID = prompt(`Write Player's Name`);
let player;

const squareNode = document.querySelectorAll(`.square`);
const hexAll = Array.from(squareNode);

const lootPlayer1 = document.querySelector(`.loot-player1-itself`);
const lootPlayer2 = document.querySelector(`.loot-player2-itself`);

const lootPlayer1title = document.querySelector(`.loot-player1-title`);
const lootPlayer2title = document.querySelector(`.loot-player2-title`);

const gameContainer = document.querySelector(`.game-container`);
const info = document.querySelector(`.h3-info`);

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
new Figure(`rook`, 0, `black`, true);
new Figure(`knight`, 1, `black`, true);
new Figure(`bishop`, 2, `black`, true);
new Figure(`queen`, 3, `black`, true);
new Figure(`king`, 4, `black`, true);
new Figure(`bishop`, 5, `black`, true);
new Figure(`knight`, 6, `black`, true);
new Figure(`rook`, 7, `black`, true);

new Figure(`pawn`, 8, `black`, true);
new Figure(`pawn`, 9, `black`, true);
new Figure(`pawn`, 10, `black`, true);
new Figure(`pawn`, 11, `black`, true);
new Figure(`pawn`, 12, `black`, true);
new Figure(`pawn`, 13, `black`, true);
new Figure(`pawn`, 14, `black`, true);
new Figure(`pawn`, 15, `black`, true);

new Figure(`pawn`, 48, `white`, true);
new Figure(`pawn`, 49, `white`, true);
new Figure(`pawn`, 50, `white`, true);
new Figure(`pawn`, 51, `white`, true);
new Figure(`pawn`, 52, `white`, true);
new Figure(`pawn`, 53, `white`, true);
new Figure(`pawn`, 54, `white`, true);
new Figure(`pawn`, 55, `white`, true);

new Figure(`rook`, 56, `white`, true);
new Figure(`knight`, 57, `white`, true);
new Figure(`bishop`, 58, `white`, true);
new Figure(`queen`, 59, `white`, true);
new Figure(`king`, 60, `white`, true);
new Figure(`bishop`, 61, `white`, true);
new Figure(`knight`, 62, `white`, true);
new Figure(`rook`, 63, `white`, true);

// new Figure(`rook`, 28, `white`);

const figures = document.querySelectorAll(`.figure`);





let tempFigureData = [];
let possibleMove = [];

let rochadePositionKingside;
let rochadePositionQueenside;
let kingsideRook;
let queensideRook;


// DROP DROP DROP DROP DROP DROP //
hexAll.forEach((el, index) => {
  // Prevent default behavior to enable drop
  el.addEventListener("dragover", function (event) {
    event.preventDefault();
  });

  // DROP ITSELF
  el.addEventListener("drop", function (event) {
    event.preventDefault();
    tempFigureData.push(index);

    if (el.move && !el.rochade && !el.promotion) {
      
      if (el.childElementCount > 0) {
        Figure.prototype.beat(index);
      }

      new Figure(tempFigureData[0], index, tempFigureData[2], false);
      hexAll[tempFigureData[1]].firstChild.figure.removeFigure();

      publishMessage(tempFigureData);
      player.changeTurn();
      player.activateTurn();

    }

    // if (el.promotion) {
    //   new Figure(`queen`, index, tempFigureData[2], false);
    // }


    if (el.rochade) {

      if (rochadePositionKingside) {
        new Figure(tempFigureData[0], index, tempFigureData[2], false);
        hexAll[tempFigureData[1]].firstChild.figure.removeFigure();
        hexAll[kingsideRook].firstChild.figure.removeFigure();
        new Figure(`rook`, rochadePositionKingside - 1, tempFigureData[2], false);
      } else if (rochadePositionQueenside) {

        new Figure(tempFigureData[0], index, tempFigureData[2], false);
        hexAll[tempFigureData[1]].firstChild.figure.removeFigure();
        hexAll[queensideRook].firstChild.figure.removeFigure();
        new Figure(`rook`, rochadePositionQueenside + 1, tempFigureData[2], false);
      }

      Figure.prototype.removeRochadeData();

      publishMessage(tempFigureData);
      player.changeTurn();
      player.activateTurn();
    }

    
    else {
      console.log(`ZLY RUCH`);
    }

// console.log(`just before deleting tempFigureData`);
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
  // console.log(`just before deleting tempFigureData`);
  Figure.prototype.hideMove(possibleMove);
  tempFigureData = [];
  possibleMove = [];
  Figure.prototype.removeRochadeData();

});

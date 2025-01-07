"use strict";

// let kurwa = [];

class Player {
  constructor(name, nr, color, turn) {
    this.name = name;
    this.nr = nr;
    this.color = color;
    this.turn = turn;

    Player.prototype.changeTurn = function () {
      this.turn = !this.turn;
    };

    Player.prototype.activateTurn = function () {
      if (!this.turn) {
        info.innerHTML = `WAIT FOR YOUR TURN`;
        info.className = ``;
        info.classList.add(`h3-info`, `wait-turn`);
        gameContainer.classList.add(`disable`);
      }
      if (this.turn) {
        info.innerHTML = `YOUR TURN. MAKE A MOVE`;
        info.className = ``;
        info.classList.add(`h3-info`, `your-turn`);
        gameContainer.classList.remove(`disable`);
      }
    };
  }
}

class lootFigure {
  constructor(type, place, color, fresh) {
    this.type = type;
    this.place = place;
    this.color = color;
    this.fresh = fresh;

    this.createFigure();
  }

  createFigure = function () {
    this.figureElement = document.createElement("i");
    this.figureElement.classList.add(
      "figure",
      `fa-solid`,
      `fa-chess-${this.type}`
    );
    if (this.color === "black") {
      this.figureElement.classList.add("black");
      lootPlayer1.appendChild(this.figureElement);
    }
    if (this.color === "white") {
      this.figureElement.classList.add("white");
      lootPlayer2.appendChild(this.figureElement);
    }

    // Przypisanie instancji lootFigure jako atrybut elementu <i>
    this.figureElement.figure = this;

    this.figureElement.addEventListener("click", function () {
      console.log(this.figure, "this is <I>.figure");
    });
  };

  removeFigure = function () {
    this.figureElement.remove();
    // console.log(`removeFigure() method`, this.figureElement.figure);
  };
}

class Figure {
  constructor(type, place, color, fresh) {
    this.type = type;
    this.place = place;
    this.color = color;
    this.fresh = fresh;

    Figure.prototype.createFigure = function () {
      this.figureElement = document.createElement("i");
      this.figureElement.draggable = true;
      this.figureElement.classList.add(
        "figure",
        `fa-solid`,
        `fa-chess-${type}`
      );
      if (color === "black") this.figureElement.classList.add("black");
      if (color === "white") this.figureElement.classList.add("white");

      // Przypisanie instancji Figure jako atrybut elementu <i>
      this.figureElement.figure = this;
      hexAll[place].appendChild(this.figureElement);
    };
    this.createFigure();

    this.figureElement.addEventListener("click", function () {
      console.log(this.figure, "this is <I>.figure");
    });

    // DRAG START
    this.figureElement.addEventListener("dragstart", function (event) {
      if (player.color === this.figure.color) {
        // event.dataTransfer.setData("text/plain", "Drag me!");
        const figure = this.figure;
        tempFigureData = [figure.type, figure.place, figure.color];

        if (tempFigureData[0] === `pawn`) this.figure.pawnMove();
        if (tempFigureData[0] === `rook`) this.figure.rookMove();
        if (tempFigureData[0] === `knight`) this.figure.knightMove();
        if (tempFigureData[0] === `bishop`) this.figure.bishopMove();
        if (tempFigureData[0] === `queen`) this.figure.queenMove();
        if (tempFigureData[0] === `king`) this.figure.kingMove();
      }
    });

    Figure.prototype.removeFigure = function () {
      this.figureElement.remove();
    };

    // BARTAS! CALA FUKNCJA RYSOWANIA RUCHU PRZECIWNIKA POWINNA BYC ZAKODOWANA RAZ I TYLKO JEDEN RAZ!!!!!!!!!!!!!!
    // A NIE ZE TY BEDZIESZ JA ROBIL OSOBNO DLA ZWYKLEGO RUCHU, ROSZADY I PROMOCJI!!!

    Figure.prototype.beat = function (index) {
      const died = hexAll[index].firstChild.figure;

      died.removeFigure();

      if (died.color === `black`) lootPlayer1.appendChild(died.figureElement);
      if (died.color === `white`) lootPlayer2.appendChild(died.figureElement);
      console.log(`This Was a good beat!`);

      if (died.type === `king` && died.color === player.color)
        alert(`CHECK MATE!!! YOU LOOSE!!!`);
      if (died.type === `king` && died.color !== player.color)
        alert(`CHECK MATE!!! YOU WIN!!!!!!!!!!!!!!!`);
    };

    Figure.prototype.promotion = function () {
      if (
        tempFigureData[0] === `pawn` &&
        // tempFigureData[2] === `white` &&
        hexAll[tempFigureData[3]].promotion
      ) {
        // console.log(`Promotion figure from Figure Class`);
        hexAll[tempFigureData[3]].firstChild.figure.removeFigure();
        new Figure(`queen`, tempFigureData[3], tempFigureData[2], true);
      }
    };

    Figure.prototype.copyBoard = function () {
      boardContent = { figures: [], lootPlayer1: [], lootPlayer2: [] };

      // Get all figures on the board
      const figures = hexAll
        .map((el) => (el.firstChild ? el.firstChild.figure : null))
        .filter((el) => el !== null);

      // Extract figure data and add to boardContent
      figures.forEach((el) => {
        const figureData = {
          type: el.type,
          place: el.place,
          color: el.color,
          fresh: el.fresh,
        };
        boardContent.figures.push(figureData);
      });

      lootPlayer1.childNodes.forEach((el) => {
        const figureData = {
          type: el.figure.type,
          place: el.figure.place,
          color: el.figure.color,
          fresh: el.figure.fresh,
        };
        boardContent.lootPlayer1.push(figureData);
      });

      lootPlayer2.childNodes.forEach((el) => {
        const figureData = {
          type: el.figure.type,
          place: el.figure.place,
          color: el.figure.color,
          fresh: el.figure.fresh,
        };
        boardContent.lootPlayer2.push(figureData);
      });

      console.log(`boardContent COPIED from method:`, boardContent);
    };

    Figure.prototype.pasteBoard = function () {
      // Remove any existing figures from the board
      hexAll.forEach((hex) => {
        if (hex.firstChild) {
          hex.firstChild.figure.removeFigure();
        }
      });

      // console.log(`pasteBoard: all hexFigures removed`);

      while (lootPlayer1.firstChild) {
        const el = lootPlayer1.firstChild;
        el.figure.removeFigure();
        console.log(`lootPlayer1 element REMOVED`, el.figure);
      }
      // console.log(`pasteBoard: all lootPlayer1 removed`);

      while (lootPlayer2.firstChild) {
        const el = lootPlayer2.firstChild;
        el.figure.removeFigure();
        console.log(`lootPlayer2 element REMOVED`, el.figure);
      }
      // console.log(`pasteBoard: all lootPlayer2 removed`);

      // Iterate over each figure in boardContent and create a new Figure object
      boardContent.figures.forEach((figureData) => {
        const { type, place, color, fresh } = figureData;
        new Figure(type, place, color, fresh);
      });

      console.log(`All Figures created`);

      // Iterate over each figure in boardContent and create a new lootFigure object
      boardContent.lootPlayer1.forEach((figureData) => {
        const { type, place, color, fresh } = figureData;
        new lootFigure(type, place, color, fresh);
        console.log(`lootPlayer1 tried create figure`, figureData);
      });
      boardContent.lootPlayer2.forEach((figureData) => {
        const { type, place, color, fresh } = figureData;
        new lootFigure(type, place, color, fresh);
        console.log(`lootPlayer2 tried create figure`, figureData);
      });

      console.log(`boardContent PASTED from method`, boardContent);

      // Check after pasting board if some King was DOWN. If true then message Check Mate and end the game.
      const WhiteKingDown = !boardContent.figures.some(
        (figure) => figure.type === "king" && figure.color === `white`
      );
      const BlackKingDown = !boardContent.figures.some(
        (figure) => figure.type === "king" && figure.color === `black`
      );

      if (player.nr == 1 && WhiteKingDown) alert(`CHECK MATE! YOU LOOSE!!!`);
      if (player.nr == 2 && BlackKingDown) alert(`CHECK MATE! YOU LOOSE!!!`);

    };

    // ------------------------------------
    Figure.prototype.showMove = function (possibleMove) {
      hexAll[possibleMove].move = true;
      hexAll[possibleMove].classList.add(`yellow`);
    };

    Figure.prototype.hideMove = function (possibleMove) {
      possibleMove.map((el) => {
        hexAll[el].move = false;
        hexAll[el].classList.remove(`yellow`);
      });
    };
    // ------------------------------------

    Figure.prototype.pawnMove = function () {
      if (this.type === "pawn") {
        // Dla piona białego (white) ruch jest do gory (-1), dla piona czarnego (black) ruch jest w dół (+1)
        const direction = this.color === "white" ? -1 : 1;

        // Simple move and double move for pawn
        if (hexAll[this.place + 8 * direction].childElementCount === 0) {
          possibleMove.push(this.place + 8 * direction);

          if (this.fresh) {
            if (hexAll[this.place + 16 * direction].childElementCount === 0)
              possibleMove.push(this.place + 16 * direction);
          }
        }

        const rightSideHexes = [7, 15, 23, 31, 39, 47, 55, 63];
        const leftSideHexes = [0, 8, 16, 24, 32, 40, 48, 56];

        // Beat for pawn
        if (
          rightSideHexes.includes(this.place) &&
          direction === -1 &&
          hexAll[this.place + 9 * direction].childElementCount > 0 &&
          hexAll[this.place + 9 * direction].firstChild.figure.color !==
            tempFigureData[2]
        ) {
          possibleMove.push(this.place + 9 * direction);
          // console.log(`white left 9`);
        } else if (
          leftSideHexes.includes(this.place) &&
          direction === -1 &&
          hexAll[this.place + 7 * direction].childElementCount > 0 &&
          hexAll[this.place + 7 * direction].firstChild.figure.color !==
            tempFigureData[2]
        ) {
          possibleMove.push(this.place + 7 * direction);
          // console.log(`white right 7`);
        } else if (
          rightSideHexes.includes(this.place) &&
          direction === 1 &&
          hexAll[this.place + 7 * direction].childElementCount > 0 &&
          hexAll[this.place + 7 * direction].firstChild.figure.color !==
            tempFigureData[2]
        ) {
          possibleMove.push(this.place + 7 * direction);
          // console.log(`black left 7`);
        } else if (
          leftSideHexes.includes(this.place) &&
          direction === 1 &&
          hexAll[this.place + 9 * direction].childElementCount > 0 &&
          hexAll[this.place + 9 * direction].firstChild.figure.color !==
            tempFigureData[2]
        ) {
          possibleMove.push(this.place + 9 * direction);
          // console.log(`black right 9`);
        } else if (
          !rightSideHexes.includes(this.place) &&
          !leftSideHexes.includes(this.place)
        ) {
          if (
            hexAll[this.place + 9 * direction].childElementCount > 0 &&
            hexAll[this.place + 9 * direction].firstChild.figure.color !==
              tempFigureData[2]
          ) {
            possibleMove.push(this.place + 9 * direction);
            // console.log(`BOTH BEATS`);
          }

          if (
            hexAll[this.place + 7 * direction].childElementCount > 0 &&
            hexAll[this.place + 7 * direction].firstChild.figure.color !==
              tempFigureData[2]
          ) {
            possibleMove.push(this.place + 7 * direction);
            // console.log(`BOTH BEATS`);
          }
        }

        for (let i = 0; i < possibleMove.length; i++) {
          if (possibleMove[i] >= 0 && possibleMove[i] < 64)
            this.showMove(possibleMove[i]);
        }
      }
    };

    Figure.prototype.rookMove = function () {
      if (this.type === "rook") {
        const directions = [
          { indexModifier: 8 }, // Up
          { indexModifier: -8 }, // Down
          { indexModifier: 1 }, // Right
          { indexModifier: -1 }, // Left
        ];

        for (const dir of directions) {
          let targetIndex = this.place + dir.indexModifier;

          while (
            targetIndex >= 0 &&
            targetIndex < 64 &&
            (dir.indexModifier === 8 ||
              dir.indexModifier === -8 ||
              Math.floor(targetIndex / 8) === Math.floor(this.place / 8))
          ) {
            // Check if the square is empty
            if (hexAll[targetIndex].childElementCount === 0) {
              possibleMove.push(targetIndex);
            } else if (
              hexAll[targetIndex].firstChild.figure.color !== tempFigureData[2]
            ) {
              possibleMove.push(targetIndex);
              break;
            } else {
              // If the square is not empty, stop checking in this direction
              break;
            }

            targetIndex += dir.indexModifier;
          }
        }

        // Display possible moves
        for (let i = 0; i < possibleMove.length; i++) {
          this.showMove(possibleMove[i]);
        }
      }
    };

    Figure.prototype.bishopMove = function () {
      if (this.type === "bishop") {
        const directions = [
          { indexModifier: 9 }, // Diagonal Up-Right
          { indexModifier: -9 }, // Diagonal Down-Left
          { indexModifier: 7 }, // Diagonal Up-Left
          { indexModifier: -7 }, // Diagonal Down-Right
        ];

        for (const dir of directions) {
          let targetIndex = this.place + dir.indexModifier;

          while (
            targetIndex >= 0 &&
            targetIndex < 64 &&
            Math.abs((targetIndex % 8) - (this.place % 8)) ===
              Math.abs(Math.floor(targetIndex / 8) - Math.floor(this.place / 8))
          ) {
            // Check if the square is empty
            if (hexAll[targetIndex].childElementCount === 0) {
              possibleMove.push(targetIndex);
            } else if (
              hexAll[targetIndex].firstChild.figure.color !== tempFigureData[2]
            ) {
              possibleMove.push(targetIndex);
              break;
            } else {
              // If the square is not empty, stop checking in this direction
              break;
            }

            targetIndex += dir.indexModifier;
          }
        }

        // Display possible moves
        for (let i = 0; i < possibleMove.length; i++) {
          this.showMove(possibleMove[i]);
        }
      }
    };

    Figure.prototype.kingMove = function () {
      if (this.type === "king") {
        const directions = [
          { indexModifier: 8 }, // Up
          { indexModifier: -8 }, // Down
          { indexModifier: 1 }, // Right
          { indexModifier: -1 }, // Left
          { indexModifier: 9 }, // Diagonal Up-Right
          { indexModifier: -9 }, // Diagonal Down-Left
          { indexModifier: 7 }, // Diagonal Up-Left
          { indexModifier: -7 }, // Diagonal Down-Right
        ];

        for (const dir of directions) {
          const targetIndex = this.place + dir.indexModifier;

          if (
            targetIndex >= 0 &&
            targetIndex < 64 &&
            Math.abs((targetIndex % 8) - (this.place % 8)) <= 1 && // Horizontal
            Math.abs(
              Math.floor(targetIndex / 8) - Math.floor(this.place / 8)
            ) <= 1 // Vertical
          ) {
            const targetSquare = hexAll[targetIndex];

            // Check if the square is empty or occupied by any piece
            if (
              targetSquare.childElementCount === 0 ||
              targetSquare.firstChild.figure.color !== tempFigureData[2]
            ) {
              possibleMove.push(targetIndex);
            }
          }
        }

        // Check for castling moves
        if (this.fresh) {
          // Check kingside castling
          kingsideRook = this.color === "white" ? 63 : 7;
          console.log(`rochade possible, rook index:`, kingsideRook);

          if (
            kingsideRook &&
            hexAll[kingsideRook].firstChild.figure.type === "rook" &&
            hexAll[kingsideRook].firstChild.figure.fresh &&
            hexAll[this.place + 1].childElementCount === 0 &&
            hexAll[this.place + 2].childElementCount === 0
          ) {
            rochadePositionKingside = this.place + 2;
            hexAll[rochadePositionKingside].rochade = true;
            possibleMove.push(this.place + 2);
          }

          // Check queenside castling
          queensideRook = this.color === "white" ? 56 : 0;
          console.log(`rochade possible, rook index:`, queensideRook);

          if (
            queensideRook &&
            hexAll[queensideRook].firstChild.figure.type === "rook" &&
            hexAll[queensideRook].firstChild.figure.fresh &&
            hexAll[this.place - 1].childElementCount === 0 &&
            hexAll[this.place - 2].childElementCount === 0 &&
            hexAll[this.place - 3].childElementCount === 0
          ) {
            rochadePositionQueenside = this.place - 2;
            hexAll[rochadePositionQueenside].rochade = true;
            possibleMove.push(this.place - 2);
          }
        }

        // Display possible moves
        for (let i = 0; i < possibleMove.length; i++) {
          this.showMove(possibleMove[i]);
        }
      }
    };

    Figure.prototype.queenMove = function () {
      if (this.type === "queen") {
        const directions = [
          { rowModifier: 0, colModifier: 1 }, // Right
          { rowModifier: 0, colModifier: -1 }, // Left
          { rowModifier: 1, colModifier: 0 }, // Down
          { rowModifier: -1, colModifier: 0 }, // Up
          { rowModifier: 1, colModifier: 1 }, // Diagonal Down-Right
          { rowModifier: -1, colModifier: -1 }, // Diagonal Up-Left
          { rowModifier: 1, colModifier: -1 }, // Diagonal Down-Left
          { rowModifier: -1, colModifier: 1 }, // Diagonal Up-Right
        ];

        for (const dir of directions) {
          let targetRow = Math.floor(this.place / 8) + dir.rowModifier;
          let targetCol = (this.place % 8) + dir.colModifier;

          while (
            targetRow >= 0 &&
            targetRow < 8 &&
            targetCol >= 0 &&
            targetCol < 8
          ) {
            const targetIndex = targetRow * 8 + targetCol;
            const targetSquare = hexAll[targetIndex];

            // Check if the square is empty or occupied by any piece
            if (targetSquare.childElementCount === 0) {
              possibleMove.push(targetIndex);
            } else if (
              hexAll[targetIndex].firstChild.figure.color !== tempFigureData[2]
            ) {
              possibleMove.push(targetIndex);
              break;
            } else {
              // If the square is not empty, stop checking in this direction
              break;
            }

            // Move to the next square in the current direction
            targetRow += dir.rowModifier;
            targetCol += dir.colModifier;
          }
        }

        // Display possible moves
        for (let i = 0; i < possibleMove.length; i++) {
          this.showMove(possibleMove[i]);
        }
      }
    };

    Figure.prototype.knightMove = function () {
      if (this.type === "knight") {
        const knightMoves = [
          { rowModifier: -2, colModifier: -1 },
          { rowModifier: -2, colModifier: 1 },
          { rowModifier: -1, colModifier: -2 },
          { rowModifier: -1, colModifier: 2 },
          { rowModifier: 1, colModifier: -2 },
          { rowModifier: 1, colModifier: 2 },
          { rowModifier: 2, colModifier: -1 },
          { rowModifier: 2, colModifier: 1 },
        ];

        for (const move of knightMoves) {
          const targetRow = Math.floor(this.place / 8) + move.rowModifier;
          const targetCol = (this.place % 8) + move.colModifier;
          const targetIndex = targetRow * 8 + targetCol;

          if (
            targetRow >= 0 &&
            targetRow < 8 &&
            targetCol >= 0 &&
            targetCol < 8
          ) {
            if (hexAll[targetIndex].childElementCount === 0) {
              possibleMove.push(targetIndex);
            } else if (
              hexAll[targetIndex].childElementCount === 1 &&
              hexAll[targetIndex].firstChild.figure.color !== tempFigureData[2]
            ) {
              possibleMove.push(targetIndex);
            }
          }
        }

        // Display possible moves
        for (let i = 0; i < possibleMove.length; i++) {
          this.showMove(possibleMove[i]);
        }
      }
    };

    Figure.prototype.removeRochadeData = function () {
      hexAll.forEach((el) => {
        if (el.rochade) delete el.rochade;
      });

      rochadePositionKingside = undefined;
      rochadePositionQueenside = undefined;
      kingsideRook = undefined;
      queensideRook = undefined;
    };
  }
}

// TODO: ehheehhehehehe

// TODO: hmmmmm

// FIXME: this must be fixed

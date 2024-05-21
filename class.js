"use strict";

class Player {
  constructor(name, nr, color, turn) {
    this.name = name;
    this.nr = nr;
    this.color = color;
    this.turn = turn;

    Player.prototype.changeTurn = function () {
      this.turn = !this.turn;
      // console.log(`player.changeTurn Done`);
    };

    Player.prototype.activateTurn = function () {
      if (!this.turn) {
        info.innerHTML = `Czekaj na swój ruch`;
        info.style.backgroundColor = `red`;
        gameContainer.classList.add(`disable`);
      }
      if (this.turn) {
        info.innerHTML = `Teraz Twój Ruch! Nie Spierdol tego!`;
        info.style.backgroundColor = `green`;
        gameContainer.classList.remove(`disable`);
      }
    };
  }
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
      // console.log(`figure.color`, this.figure.color);

      if (player.color === this.figure.color) {
        // event.dataTransfer.setData("text/plain", "Drag me!");
        const figure = this.figure;
        tempFigureData = [
          figure.type,
          figure.place,
          figure.color,
          // figure.figureElement,
        ];

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

    Figure.prototype.beat = function (index) {
      const died = hexAll[index].firstChild.figure.figureElement;
      if (died.figure.color === `black`) lootPlayer1.appendChild(died);
      if (died.figure.color === `white`) lootPlayer2.appendChild(died);
      console.log(`This Was a good beat!`);

      if (died.figure.type === `king` && died.figure.color === player.color)
        alert(`CHECK MATE!!! YOU LOOSE!!!`);
      if (died.figure.type === `king` && died.figure.color !== player.color)
        alert(`CHECK MATE!!! YOU WIN!!!!!!!!!!!!!!!`);

      // hexAll[index].firstChild.figure.removeFigure();
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

        if (hexAll[this.place + 8 * direction].childElementCount === 0) {
          possibleMove.push(this.place + 8 * direction);

          if (
            hexAll[this.place + 16 * direction].childElementCount === 0 &&
            this.fresh === undefined
          )
            possibleMove.push(this.place + 16 * direction);
        }

        if (
          hexAll[this.place + 9 * direction].childElementCount > 0 &&
          hexAll[this.place + 9 * direction].firstChild.figure.color !==
            tempFigureData[2]
        )
          possibleMove.push(this.place + 9 * direction);
        if (
          hexAll[this.place + 7 * direction].childElementCount > 0 &&
          hexAll[this.place + 7 * direction].firstChild.figure.color !==
            tempFigureData[2]
        )
          possibleMove.push(this.place + 7 * direction);

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
            }
            // else if (
            //   // rook can move into players king for rochade //
            //   hexAll[targetIndex].firstChild.figure.type === `king` &&
            //   this.color === hexAll[targetIndex].firstChild.figure.color
            // ) {
            //   possibleMove.push(targetIndex);
            //   break;
            // }
            else {
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

          // const queensideRook = queensideRookPosition;

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

      hexAll.forEach(el => {
        if (el.rochade) delete el.rochade;
      })

      rochadePositionKingside = undefined;
      rochadePositionQueenside = undefined;
      kingsideRook = undefined;
      queensideRook = undefined;
    };

  }



}

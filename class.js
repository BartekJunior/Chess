"use strict";

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
      event.dataTransfer.setData("text/plain", "Drag me!");
      const figure = this.figure;
      tempFigureData = [
        figure.type,
        figure.place,
        figure.color,
        figure.figureElement,
      ];
      console.log(tempFigureData);
      this.figure.pawnMove();
    });

    Figure.prototype.removeFigure = function () {
      this.figureElement.remove();
    };

    Figure.prototype.showMove = function (targetPlace) {
      hexAll[targetPlace].move = true;
      hexAll[targetPlace].classList.add(`yellow`);
    };

    Figure.prototype.hideMove = function (targetPlace) {
      hexAll[targetPlace].move = false;
      hexAll[targetPlace].classList.remove(`yellow`);
    };

    Figure.prototype.pawnMove = function () {
      if (this.type === "pawn") {
        // Dla piona białego (white) ruch jest do gory (-1), dla piona czarnego (black) ruch jest w dół (+1)
        const direction = this.color === "white" ? -1 : 1;

        // Sprawdź, czy pole powyżej istnieje na planszy
        possibleMove = this.place + 8 * direction;
        if (possibleMove >= 0 && possibleMove < 64) {
          this.showMove(possibleMove);
        }
      }
    };
  }
}

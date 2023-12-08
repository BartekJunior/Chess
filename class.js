"use strict";

class Figure {
  constructor(type, place, color) {
    this.type = type;
    this.place = place;
    this.color = color;

    Figure.prototype.drawStartFigure = function (type) {
      const figure = document.createElement(`i`);

      figure.classList.add(`figure`);
      figure.classList.add(`fa-solid`, `fa-chess-${type}`);
      if (this.color === `black`) figure.classList.add(`black`);
      if (this.color === `white`) figure.classList.add(`white`);

      hexAll[place].appendChild(figure);
    };

    this.drawStartFigure(this.type);
  }
}






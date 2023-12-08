"use strict";

class Figure {
  constructor(type, place, color) {
    this.type = type;
    this.place = place;
    this.color = color;

    this.figureElement = document.createElement('i');
    this.figureElement.draggable = true;
    this.figureElement.classList.add('figure', `fa-solid`, `fa-chess-${type}`);
    if (color === 'black') this.figureElement.classList.add('black');
    if (color === 'white') this.figureElement.classList.add('white');

    // Przypisanie instancji Figure jako atrybut elementu <i>
    this.figureElement.figure = this;

    hexAll[place].appendChild(this.figureElement);

    this.figureElement.addEventListener('click', function () {
      console.log(this.figure, 'this is <I>.figure');
    });

  }
}










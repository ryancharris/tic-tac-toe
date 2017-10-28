class Board {
  constructor() {
    // Set selectors
    this.tiles = document.querySelectorAll('[data-js="tile"]');
    this.startButton = document.querySelector('[data-js="startButton"]');
    this.resetButton = document.querySelector('[data-js="resetButton"]');

    // Add event listeners
    this.observeReset();
    this.observeStart();
    this.observeTiles();
  }

  //
  // OBSERVERS
  //

  observeStart() {
    this.startButton.addEventListener('click', () => {
      this.clearBoard();
      // TO DO: Reset turn counter
    });
  }

  observeReset() {
    this.resetButton.addEventListener('click', () => {
      this.clearBoard();
    });
  }

  observeTiles() {
    this.tiles.forEach((tile) => {
      tile.addEventListener('click', function() {
        console.log('clicked!');
      });
    });
  }

  //
  // METHODS
  //
  clearBoard() {
    this.tiles.forEach((tile) => {
      tile.innerHTML = '';
    });
  }
}

const board = new Board();
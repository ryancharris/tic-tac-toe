class Board {
  constructor() {
    // Board states
    this.turn = 1;

    // Set selectors
    this.tiles = document.querySelectorAll('[data-js="tile"]');
    this.turnDisplay = document.querySelector('[data-js="turnDisplay"]');
    this.startButton = document.querySelector('[data-js="startButton"]');
    this.resetButton = document.querySelector('[data-js="resetButton"]');

    // Add event listeners
    this.observeReset();
    this.observeStart();
    this.observeTiles();

    // Set initial state
    this.populateTurnDisplay(this.turn);

  }

  //
  // OBSERVERS
  //

  observeStart() {
    this.startButton.addEventListener('click', () => {
      this.resetTurns();
      this.clearBoard();
    });
  }

  observeReset() {
    this.resetButton.addEventListener('click', () => {
      this.clearBoard();
    });
  }

  observeTiles() {
    this.tiles.forEach((tile) => {
      tile.addEventListener('click', () => {
        this.nextTurn();
        this.populateTurnDisplay(this.getTurn());
      });
    });
  }

  //
  // METHODS
  //
  setTurn(turn) {
    this.turn = turn;
  }

  getTurn() {
    return this.turn;
  }


  clearBoard() {
    this.tiles.forEach((tile) => {
      tile.innerHTML = '';
    });

    this.setTurn(1);

    this.populateTurnDisplay(this.getTurn());
  }

  resetTurns() {
    this.setTurn(1);
    this.populateTurnDisplay(this.turn);
  }

  populateTurnDisplay(turn) {
    this.turnDisplay.innerHTML = turn;
  }

  nextTurn() {
    this.getTurn() === 1 ? this.setTurn(2) : this.setTurn(1);
    console.log(this.turn);
  }
}

const board = new Board();
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
  // Add event listeners to DOM elements
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
      tile.addEventListener('click', (event) => {
        this.selectTile(event.target);
        this.nextTurn();
        this.populateTurnDisplay(this.getTurn());
      });
    });
  }

  //
  // Methods to get, set and manage turn
  //

  setTurn(turn) {
    this.turn = turn;
  }

  getTurn() {
    return this.turn;
  }

  resetTurns() {
    this.setTurn(1);
    this.populateTurnDisplay(this.turn);
  }

  nextTurn() {
    this.getTurn() === 1 ? this.setTurn(2) : this.setTurn(1);
  }

  //
  // Methods to manipulate the UI
  //

  clearBoard() {
    this.tiles.forEach((tile) => {
      tile.classList.remove('board__tile--x', 'board__tile--o');
    });

    this.setTurn(1);
    this.populateTurnDisplay(this.getTurn());
    this.observeTiles();
  }

  populateTurnDisplay(turn) {
    this.turnDisplay.innerHTML = turn;
  }

  selectTile(tile) {
    if (this.getTurn() === 1) {
      tile.classList.add('board__tile--x');
    } else if (this.getTurn() === 2) {
      tile.classList.add('board__tile--o');
    }

    // TO DO: disable tile when it has been selected
  }
}

const board = new Board();
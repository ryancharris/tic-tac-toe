class Board {
  constructor() {
    // Board states
    this.turn = 1;
    this.tileState = {
      0: {
        'selected': false,
        'owner': 0
      },
      1: {
        'selected': false,
        'owner': 0
      },
      2: {
        'selected': false,
        'owner': 0
      },
      3: {
        'selected': false,
        'owner': 0
      },
      4: {
        'selected': false,
        'owner': 0
      },
      5: {
        'selected': false,
        'owner': 0
      },
      6: {
        'selected': false,
        'owner': 0
      },
      7: {
        'selected': false,
        'owner': 0
      },
      8: {
        'selected': false,
        'owner': 0
      }
    };

    // Set selectors
    this.tiles = document.querySelectorAll('[data-js="tile"]');
    this.turnDisplay = document.querySelector('[data-js="turnDisplay"]');
    this.startButton = document.querySelector('[data-js="startButton"]');
    this.resetButton = document.querySelector('[data-js="resetButton"]');

    // Add event listeners
    this.observeReset();
    this.observeStart();
    this.observeTiles();

    // Set initial interface
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
  // Methods to get, set and manage this.tileState{}
  //

  getTileState(index) {
    return this.tileState[tile];
  }

  setTileState(index, attr, value) {
    this.tileState[index][attr] = value;
  }

  //
  // Methods to manipulate the UI
  //

  clearBoard() {
    this.tiles.forEach((tile) => {
      let tileIndex = tile.getAttribute('data-index');

      // Reset classes and clear board
      tile.classList.remove('board__tile--x', 'board__tile--o', 'board__tile--selected');

      // Reset state associated with all tiles
      this.setTileState(tileIndex, 'selected', false);
      this.setTileState(tileIndex, 'owner', 0);
    });

    // Reset turn counter and update interface display
    this.setTurn(1);
    this.populateTurnDisplay(this.getTurn());
  }

  populateTurnDisplay(turn) {
    this.turnDisplay.innerHTML = turn;
  }

  selectTile(tile) {
    let tileIndex = tile.getAttribute('data-index');

    if (this.getTurn() === 1) {
      tile.classList.add('board__tile--x', 'board__tile--selected');
      this.setTileState(tileIndex, 'owner', 1);
    } else if (this.getTurn() === 2) {
      tile.classList.add('board__tile--o', 'board__tile--selected');
      this.setTileState(tileIndex, 'owner', 2);
    }

    this.setTileState(tileIndex, 'selected', true);
    // TO DO: add check to see if someone won
  }
}

const board = new Board();
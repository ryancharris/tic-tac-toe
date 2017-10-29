class Board {
  constructor() {
    // Board states
    this.turn = 1;
    this.tileState = [
      {'index': 0, 'selected': false, 'owner': 0},
      {'index': 1, 'selected': false, 'owner': 0},
      {'index': 2, 'selected': false, 'owner': 0},
      {'index': 3, 'selected': false, 'owner': 0},
      {'index': 4, 'selected': false, 'owner': 0},
      {'index': 5, 'selected': false, 'owner': 0},
      {'index': 6, 'selected': false, 'owner': 0},
      {'index': 7, 'selected': false, 'owner': 0},
      {'index': 8, 'selected': false, 'owner': 0}
    ];

    // Users
    this.userOne = '';
    this.userTwo = '';

    // Set selectors
    this.tiles = document.querySelectorAll('[data-js="tile"]');
    this.turnDisplay = document.querySelector('[data-js="turnDisplay"]');
    this.startButton = document.querySelector('[data-js="startButton"]');
    this.resetButton = document.querySelector('[data-js="resetButton"]');
    this.userOneInput = document.querySelector('[data-js="userOneInput"]');
    this.userTwoInput = document.querySelector('[data-js="userTwoInput"]');

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
      this.setUserNames();
      this.populateTurnDisplay(this.getTurn());
    });
  }

  observeReset() {
    this.resetButton.addEventListener('click', () => {
      this.clearBoard();
      // TO DO: Needs to pop the "Start" modal here
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
  // USERS
  //

  setUserNames() {
    this.userOne = this.userOneInput.value;
    this.userTwo = this.userTwoInput.value;
  }

  resetInputs() {
    this.userOneInput.value = '';
    this.userTwoInput.value = '';
  }

  //
  // Methods to get, set and manage turns
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
  // BOARD STATE
  //

  getTileState(index) {
    return this.tileState[tile];
  }

  setTileState(index, attr, value) {
    this.tileState[index][attr] = value;
  }

  //
  // DOM / UI MANIPULATION
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
    this.resetTurns();
    this.resetInputs();
    this.clearNameInterface();
  }

  populateTurnDisplay(turn) {
    if (turn === 1) {
      this.turnDisplay.innerHTML = `It's your turn, ${this.userOne}!`;
    } else if (turn === 2) {
      this.turnDisplay.innerHTML = `It's your turn, ${this.userTwo}`;
    }
  }

  clearNameInterface() {
    this.turnDisplay.innerHTML = '';
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
    this.analyzeBoard();
  }

  disableAllTiles() {
    this.tiles.forEach((tile) => {
      tile.classList.add('board__tile--selected');
    });
  }

  //
  // Methods for checking to see if a user has won
  //

  analyzeBoard() {
    // Create an array of tiles owned by the current user
    let currentUsersTiles = this.createUserTileArray(this.getTurn());

    if (currentUsersTiles.length >= 3) {
      // Compare user's array to winning combinations
      if (this.checkForWinner(currentUsersTiles)) {
        this.disableAllTiles();
        // TO DO: pop message that says you won
        // TO DO: Handle all tiles are full
        console.log('winner!');
      }
    }
  }

  createUserTileArray(user) {
    return this.tileState.map(function (tile) {
      if (tile.selected && tile.owner === user) {
        return tile.index;
      }
    }).filter(function(tile) {
      return tile != undefined;
    });
  }

  checkForWinner(userArrayTile) {
    // compare array of user's tiles to winning combos
    let orderedArrayString = userArrayTile.sort();
    let isWinner = true;

    switch (true) {
      // Horizontal row winners
      case this.compareArrays(orderedArrayString, [0, 1, 2]):
        break;
      case this.compareArrays(orderedArrayString, [3, 4, 5]):
        break;
      case this.compareArrays(orderedArrayString, [6, 7, 8]):
        break;
      // Vertical row winners
      case this.compareArrays(orderedArrayString, [0, 3, 6]):
        break;
      case this.compareArrays(orderedArrayString, [1, 4, 7]):
        break;
      case this.compareArrays(orderedArrayString, [2, 5, 8]):
        break;
      // Diagonal winners
      case this.compareArrays(orderedArrayString, [0, 4, 8]):
        break;
      case this.compareArrays(orderedArrayString, [2, 4, 6]):
        break;
      // Everything else
      default:
        isWinner = false;
        break;
    }

    return isWinner;
  }

  compareArrays(userArray, testArray) {
    for (let i = 0; i < testArray.length; i++) {
      if (userArray.indexOf(testArray[i]) === -1) {
        return false;
      }
    }
    return true;
  }
}

const board = new Board();
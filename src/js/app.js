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
    this.winnerDisplay = document.querySelector('[data-js="winnerDisplay"');

    this.startButton = document.querySelector('[data-js="startButton"]');
    this.resetButton = document.querySelector('[data-js="resetButton"]');
    this.playAgain = document.querySelector('[data-js="playAgain"]');
    this.startOver = document.querySelector('[data-js="startOver"]');

    this.userOneInput = document.querySelector('[data-js="userOneInput"]');
    this.userTwoInput = document.querySelector('[data-js="userTwoInput"]');

    this.startModal = document.querySelector('[data-js="startModal"]');
    this.winnerModal = document.querySelector('[data-js="winnerModal"]');
    this.modalOverlay = document.querySelector('[data-js="modalOverlay"]');

    // Add event listeners
    this.observeReset();
    this.observeStart();
    this.observeTiles();
  }

  //
  // OBSERVERS
  //

  observeStart() {
    this.startButton.addEventListener('click touchstart', () => {
      this.setUserNames();
      this.hideStartModal();
      this.populateTurnDisplay(this.getTurn());
    });
  }

  observeReset() {
    this.resetButton.addEventListener('click touchstart', () => {
      this.clearBoard();
      this.populateTurnDisplay(this.getTurn());
    });
  }

  observePlayAgain() {
    this.playAgain.addEventListener('click touchstart', () => {
      this.hideWinnerModal();
      this.clearBoard();
      this.populateTurnDisplay(this.getTurn());
    });
  }

  observeStartOver() {
    this.startOver.addEventListener('click touchstart', () => {
      this.hideWinnerModal();
      this.clearBoard();
      this.resetInterfaceHeader();
      this.showStartModal();
    });
  }

  observeTiles() {
    this.tiles.forEach((tile) => {
      tile.addEventListener('click touchstart', (event) => {
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
    let userOneName = this.userOneInput.value;
    let userTwoName = this.userTwoInput.value;

    // Set default user names if nothing is entered at Start
    userOneName.length > 0 ? this.userOne = userOneName : this.userOne = 'User 1';
    userTwoName.length > 0 ? this.userTwo = userTwoName : this.userTwo = 'User 2';
  }

  resetInputs() {
    this.userOneInput.value = '';
    this.userTwoInput.value = '';
  }

  //
  // TURN MANAGEMENT
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
      this.turnDisplay.innerHTML = `It's your turn, ${this.userTwo}!`;
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
    this.analyzeBoard();
  }

  disableAllTiles() {
    this.tiles.forEach((tile) => {
      tile.classList.add('board__tile--selected');
    });
  }

  hideStartModal() {
    this.modalOverlay.classList.add('hidden');
    this.modalOverlay.classList.remove('overlay--visible');
    this.startModal.classList.add('hidden');
    this.startModal.classList.remove('modal--visible');
  }

  showStartModal() {
    this.modalOverlay.classList.add('overlay--visible');
    this.modalOverlay.classList.remove('hidden');
    this.startModal.classList.add('modal--visible');
    this.startModal.classList.remove('hidden');
  }

  showWinnerModal() {
    this.modalOverlay.classList.add('overlay--visible');
    this.modalOverlay.classList.remove('hidden');
    this.winnerModal.classList.add('modal--visible');
    this.winnerModal.classList.remove('hidden');

    this.observePlayAgain();
    this.observeStartOver();
  }

  hideWinnerModal() {
    this.modalOverlay.classList.add('hidden');
    this.modalOverlay.classList.remove('overlay--visible');
    this.winnerModal.classList.add('hidden');
    this.winnerModal.classList.remove('modal--visible');
  }

  setWinnerDisplay(turn) {
    if (turn === 1) {
      this.winnerDisplay.innerHTML = `Congratulations, ${this.userOne}!`;
    } else if (turn === 2) {
      this.winnerDisplay.innerHTML = `Congratulations, ${this.userTwo}!`;
    } else if (turn === 0) {
      this.winnerDisplay.innerHTML = `Whoa! It's a tie!`;
    }
  }

  resetInterfaceHeader() {
    this.turnDisplay.innerHTML = `Let's Play!`;
  }

  //
  // CHECKING FOR WINNER
  //

  analyzeBoard() {
    // Create an array of tiles owned by the current user
    let currentUsersTiles = this.createUserTileArray(this.getTurn());

    if (currentUsersTiles.length >= 3) {
      // Compare user's array to winning combinations
      if (this.checkForWinner(currentUsersTiles)) {
        this.disableAllTiles();
        this.setWinnerDisplay(this.getTurn());
        this.showWinnerModal();
      } else {
        if (this.checkForFullBoard()) {
          this.showWinnerModal();
          this.setWinnerDisplay(0);
        }
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

  checkForFullBoard() {
    let selectedTiles = this.tileState.map((tile) => {
      if (tile.selected === true) {
        return tile;
      }
    }).filter(function(tile) {
      return tile != undefined;
    });

    if (selectedTiles.length === 9) {
      return true;
    } else {
      return false;
    }
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
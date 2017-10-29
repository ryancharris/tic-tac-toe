/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
  function Board() {
    _classCallCheck(this, Board);

    // Board states
    this.turn = 1;
    this.tileState = [{ 'index': 0, 'selected': false, 'owner': 0 }, { 'index': 1, 'selected': false, 'owner': 0 }, { 'index': 2, 'selected': false, 'owner': 0 }, { 'index': 3, 'selected': false, 'owner': 0 }, { 'index': 4, 'selected': false, 'owner': 0 }, { 'index': 5, 'selected': false, 'owner': 0 }, { 'index': 6, 'selected': false, 'owner': 0 }, { 'index': 7, 'selected': false, 'owner': 0 }, { 'index': 8, 'selected': false, 'owner': 0 }];

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
    this.startModal = document.querySelector('[data-js="startModal"]');
    this.modalOverlay = document.querySelector('[data-js="modalOverlay"]');

    // Add event listeners
    this.observeReset();
    this.observeStart();
    this.observeTiles();
  }

  //
  // OBSERVERS
  //

  _createClass(Board, [{
    key: 'observeStart',
    value: function observeStart() {
      var _this = this;

      this.startButton.addEventListener('click', function () {
        _this.setUserNames();
        _this.hideStartModal();
        _this.populateTurnDisplay(_this.getTurn());
      });
    }
  }, {
    key: 'observeReset',
    value: function observeReset() {
      var _this2 = this;

      this.resetButton.addEventListener('click', function () {
        _this2.clearBoard();
        _this2.showStartModal();
      });
    }
  }, {
    key: 'observeTiles',
    value: function observeTiles() {
      var _this3 = this;

      this.tiles.forEach(function (tile) {
        tile.addEventListener('click', function (event) {
          _this3.selectTile(event.target);
          _this3.nextTurn();
          _this3.populateTurnDisplay(_this3.getTurn());
        });
      });
    }

    //
    // USERS
    //

  }, {
    key: 'setUserNames',
    value: function setUserNames() {
      this.userOne = this.userOneInput.value;
      this.userTwo = this.userTwoInput.value;
    }
  }, {
    key: 'resetInputs',
    value: function resetInputs() {
      this.userOneInput.value = '';
      this.userTwoInput.value = '';
    }

    //
    // TURN MANAGEMENT
    //

  }, {
    key: 'setTurn',
    value: function setTurn(turn) {
      this.turn = turn;
    }
  }, {
    key: 'getTurn',
    value: function getTurn() {
      return this.turn;
    }
  }, {
    key: 'resetTurns',
    value: function resetTurns() {
      this.setTurn(1);
      this.populateTurnDisplay(this.turn);
    }
  }, {
    key: 'nextTurn',
    value: function nextTurn() {
      this.getTurn() === 1 ? this.setTurn(2) : this.setTurn(1);
    }

    //
    // BOARD STATE
    //

  }, {
    key: 'getTileState',
    value: function getTileState(index) {
      return this.tileState[tile];
    }
  }, {
    key: 'setTileState',
    value: function setTileState(index, attr, value) {
      this.tileState[index][attr] = value;
    }

    //
    // DOM / UI MANIPULATION
    //

  }, {
    key: 'clearBoard',
    value: function clearBoard() {
      var _this4 = this;

      this.tiles.forEach(function (tile) {
        var tileIndex = tile.getAttribute('data-index');

        // Reset classes and clear board
        tile.classList.remove('board__tile--x', 'board__tile--o', 'board__tile--selected');

        // Reset state associated with all tiles
        _this4.setTileState(tileIndex, 'selected', false);
        _this4.setTileState(tileIndex, 'owner', 0);
      });

      // Reset turn counter and update interface display
      this.resetTurns();
      this.resetInputs();
      this.clearNameInterface();
    }
  }, {
    key: 'populateTurnDisplay',
    value: function populateTurnDisplay(turn) {
      if (turn === 1) {
        this.turnDisplay.innerHTML = 'It\'s your turn, ' + this.userOne + '!';
      } else if (turn === 2) {
        this.turnDisplay.innerHTML = 'It\'s your turn, ' + this.userTwo;
      }
    }
  }, {
    key: 'clearNameInterface',
    value: function clearNameInterface() {
      this.turnDisplay.innerHTML = '';
    }
  }, {
    key: 'selectTile',
    value: function selectTile(tile) {
      var tileIndex = tile.getAttribute('data-index');

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
  }, {
    key: 'disableAllTiles',
    value: function disableAllTiles() {
      this.tiles.forEach(function (tile) {
        tile.classList.add('board__tile--selected');
      });
    }
  }, {
    key: 'hideStartModal',
    value: function hideStartModal() {
      this.modalOverlay.classList.add('hidden');
      this.modalOverlay.classList.remove('overlay--visible');
      this.startModal.classList.add('hidden');
      this.startModal.classList.remove('start-modal--visible');
    }
  }, {
    key: 'showStartModal',
    value: function showStartModal() {
      this.modalOverlay.classList.add('overlay--visible');
      this.modalOverlay.classList.remove('hidden');
      this.startModal.classList.add('start-modal--visible');
      this.startModal.classList.remove('hidden');
    }

    //
    // CHECKING FOR WINNER
    //

  }, {
    key: 'analyzeBoard',
    value: function analyzeBoard() {
      // Create an array of tiles owned by the current user
      var currentUsersTiles = this.createUserTileArray(this.getTurn());

      if (currentUsersTiles.length >= 3) {
        // Compare user's array to winning combinations
        if (this.checkForWinner(currentUsersTiles)) {
          this.disableAllTiles();
          // TO DO: pop message that says you won
          console.log('winner!');
        } else {
          // TO DO: Handle all tiles are full
          console.log('Are all tiles full? If so, end game.');
        }
      }
    }
  }, {
    key: 'createUserTileArray',
    value: function createUserTileArray(user) {
      return this.tileState.map(function (tile) {
        if (tile.selected && tile.owner === user) {
          return tile.index;
        }
      }).filter(function (tile) {
        return tile != undefined;
      });
    }
  }, {
    key: 'checkForWinner',
    value: function checkForWinner(userArrayTile) {
      // compare array of user's tiles to winning combos
      var orderedArrayString = userArrayTile.sort();
      var isWinner = true;

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
  }, {
    key: 'compareArrays',
    value: function compareArrays(userArray, testArray) {
      for (var i = 0; i < testArray.length; i++) {
        if (userArray.indexOf(testArray[i]) === -1) {
          return false;
        }
      }
      return true;
    }
  }]);

  return Board;
}();

var board = new Board();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: \n@import \"src/scss/interface\";\n^\n      File to import not found or unreadable: src/scss/interface.\nParent style sheet: stdin\n      in /Users/ryan/projects/punk-ave-challenge/src/scss/app.scss (line 2, column 1)\n    at runLoaders (/Users/ryan/projects/punk-ave-challenge/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /Users/ryan/projects/punk-ave-challenge/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /Users/ryan/projects/punk-ave-challenge/node_modules/loader-runner/lib/LoaderRunner.js:230:18\n    at context.callback (/Users/ryan/projects/punk-ave-challenge/node_modules/loader-runner/lib/LoaderRunner.js:111:13)\n    at Object.asyncSassJobQueue.push [as callback] (/Users/ryan/projects/punk-ave-challenge/node_modules/sass-loader/lib/loader.js:55:13)\n    at Object.<anonymous> (/Users/ryan/projects/punk-ave-challenge/node_modules/async/dist/async.js:2244:31)\n    at Object.callback (/Users/ryan/projects/punk-ave-challenge/node_modules/async/dist/async.js:906:16)\n    at options.error (/Users/ryan/projects/punk-ave-challenge/node_modules/node-sass/lib/index.js:294:32)");

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map
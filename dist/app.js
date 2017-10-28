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

  _createClass(Board, [{
    key: 'observeStart',
    value: function observeStart() {
      var _this = this;

      this.startButton.addEventListener('click', function () {
        _this.resetTurns();
        _this.clearBoard();
      });
    }
  }, {
    key: 'observeReset',
    value: function observeReset() {
      var _this2 = this;

      this.resetButton.addEventListener('click', function () {
        _this2.clearBoard();
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
    // Methods to get, set and manage turn
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
    // Methods to manipulate the UI
    //

  }, {
    key: 'clearBoard',
    value: function clearBoard() {
      this.tiles.forEach(function (tile) {
        tile.classList.remove('board__tile--x', 'board__tile--o', 'board__tile--selected');
      });

      this.setTurn(1);
      this.populateTurnDisplay(this.getTurn());
    }
  }, {
    key: 'populateTurnDisplay',
    value: function populateTurnDisplay(turn) {
      this.turnDisplay.innerHTML = turn;
    }
  }, {
    key: 'selectTile',
    value: function selectTile(tile) {
      if (this.getTurn() === 1) {
        tile.classList.add('board__tile--x', 'board__tile--selected');
      } else if (this.getTurn() === 2) {
        tile.classList.add('board__tile--o', 'board__tile--selected');
      }
    }
  }]);

  return Board;
}();

var board = new Board();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map
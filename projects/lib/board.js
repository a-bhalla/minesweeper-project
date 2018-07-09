'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',
    value: function flipTile(rowIndex, columnIndex) {
      //checks if tile is empty
      if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('This tile has already been flipped!');
        return;
        // checks if tere is a bomb at that tile
      } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        this._playerBoard[rowIndex][columnIndex] = 'B';
      } else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighbourBombs(rowIndex, columnIndex);
      }
      //decreases the numberOfTiles instance property by 1.
      this._numberOfTiles--;
    }
  }, {
    key: 'getNumberOfNeighbourBombs',
    value: function getNumberOfNeighbourBombs(rowIndex, columnIndex) {
      var _this = this;

      var neighbourOffsets = [[-1, -1], //top left [row, column]
      [-1, 0], //top centre
      [-1, 1], //top right
      [0, -1], //middle left
      [0, 1], //middle right
      [1, -1], //bottom left
      [1, 0], //bottom centre
      [1, 1]];

      var numberOfRows = this._bombBoard.length;
      //equal to the length of the first element of bombBoard
      var numberOfColumns = this._bombBoard[0].length;

      var numberOfBombs = 0;

      //offset = nested array in neighbourOffsets
      neighbourOffsets.forEach(function (offset) {
        var neighbourRowIndex = rowIndex + offset[0];
        var neighbourColumnIndex = columnIndex + offset[1];

        //check if row and column indices for neighbouring tiles are valid:
        if (neighbourRowIndex >= 0 && neighbourRowIndex < numberOfRows && neighbourColumnIndex >= 0 && neighbourColumnIndex < numberOfColumns) {
          if (_this._bombBoard[neighbourRowIndex][neighbourColumnIndex] == 'B') {
            _this._numberOfBombs++;
          }
        }
      });
      return this._numberOfBombs;
    }

    //method to check numberOfTiles v numberOfBombs.

  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      return this._numberOfTiles !== this._numberOfBombs;
    }
  }, {
    key: 'print',
    value: function print(board) {
      // \n joins an array on a new line.
      console.log(this._playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }

    //will hold a function to generate a blank board of a given size to hold the player's guesses

  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      var board = [];
      //for loop iterating through numberOfRows
      for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
        //Create an empty row array
        var rows = [];
        // for loop iterating through numberOfColumns
        for (var columns = 0; columns < numberOfColumns; columns++) {
          //push the empty spaces onto the row array
          rows.push(' ');
        }
        //return the board array
        board.push(rows);
      }
      return board;
    }
  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      var board = [];
      for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
        var rows = [];
        for (var columns = 0; columns < numberOfColumns; columns++) {
          //null creates empty space in the boards.
          rows.push(null);
        }
        board.push(rows);
      }
      var numberOfBombsPlaced = 0;
      while (numberOfBombsPlaced < numberOfBombs) {
        //generate random row index
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        //generate random column index
        var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        //if statement to check if there's a bomb already placed
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
          //place the bomb at that row and column
          board[randomRowIndex][randomColumnIndex] = 'B';
          //Increment numberOfBombsPlaced
          numberOfBombsPlaced++;
        };
      }
      return board;
    }
  }]);

  return Board;
}();

;
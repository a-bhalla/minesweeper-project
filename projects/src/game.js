// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In command line, navigate to the src directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

import {Board} from './board';

class Game{
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

playMove(rowIndex, columnIndex){
  this._board.flipTile(rowIndex, columnIndex);
  //if statement logic - if flipped tile has a bomb, game over. Else if the board has no safe tiles left, player wins. Otherwise continue playing.
  if(this._board.playerBoard[rowIndex][columnIndex] === 'B'){
    console.log('GAME OVER!');
    this._board.print()
  } else if (this._board.hasSafeTiles){
    console.log('YOU HAVE WON!');
  } else {
    console.log('Current Board: ');
    this._board.print();
    }
  }
};

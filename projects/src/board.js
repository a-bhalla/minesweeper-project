export class Board{
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

get playerBoard(){
  return this._playerBoard;
}

flipTile(rowIndex, columnIndex){
  //checks if tile is empty
  if (this._playerBoard[rowIndex][columnIndex] !== ' '){
    console.log('This tile has already been flipped!');
    return;
    // checks if tere is a bomb at that tile
  } else if (this._bombBoard[rowIndex][columnIndex] === 'B'){
    this._playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighbourBombs(rowIndex, columnIndex);
  }
  //decreases the numberOfTiles instance property by 1.
  this._numberOfTiles--;
}

getNumberOfNeighbourBombs(rowIndex, columnIndex){
  const neighbourOffsets = [
    [-1, -1], //top left [row, column]
    [-1, 0], //top centre
    [-1, 1], //top right
    [0, -1], //middle left
    [0, 1], //middle right
    [1, -1], //bottom left
    [1, 0], //bottom centre
    [1, 1], //bottom right
  ];

  const numberOfRows = this._bombBoard.length;
  //equal to the length of the first element of bombBoard
  const numberOfColumns = this._bombBoard[0].length;

  let numberOfBombs = 0;

//offset = nested array in neighbourOffsets
  neighbourOffsets.forEach(offset => {
    const neighbourRowIndex = rowIndex + offset[0];
    const neighbourColumnIndex = columnIndex + offset[1];

    //check if row and column indices for neighbouring tiles are valid:
    if (neighbourRowIndex >= 0 && neighbourRowIndex < numberOfRows && neighbourColumnIndex >= 0 && neighbourColumnIndex < numberOfColumns){
      if (this._bombBoard[neighbourRowIndex][neighbourColumnIndex] == 'B'){
        this._numberOfBombs++;
      }
    }
  });
return this._numberOfBombs;
}

//method to check numberOfTiles v numberOfBombs.
hasSafeTiles(){
  return this._numberOfTiles !== this._numberOfBombs;
}

print(board){
  // \n joins an array on a new line.
  console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
}

//will hold a function to generate a blank board of a given size to hold the player's guesses
static generatePlayerBoard(numberOfRows, numberOfColumns){
  let board = [];
  //for loop iterating through numberOfRows
  for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
    //Create an empty row array
    const rows = [];
    // for loop iterating through numberOfColumns
  for (let columns = 0; columns < numberOfColumns; columns++){
    //push the empty spaces onto the row array
    rows.push(' ');
    }
  //return the board array
  board.push(rows);
  }
return board;
}

static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs){
  const board = [];
  for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
    const rows = [];
  for (let columns = 0; columns < numberOfColumns; columns++){
    //null creates empty space in the boards.
    rows.push(null);
  }
  board.push(rows);
}
let numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced < numberOfBombs){
    //generate random row index
    const randomRowIndex = Math.floor(Math.random() * numberOfRows);
    //generate random column index
    const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    //if statement to check if there's a bomb already placed
    if (board[randomRowIndex][randomColumnIndex] !== 'B'){
      //place the bomb at that row and column
      board[randomRowIndex][randomColumnIndex] = 'B';
      //Increment numberOfBombsPlaced
      numberOfBombsPlaced++;
    };
  }
  return board;
}
};

const BOARDSIZE = 9;

const Gameboard = (() => {
  let board = [0,1,2,3,4,5,6,7,8];
  
  // Places all pieces from board[] to the DOM
  const renderPieces = () =>  {
    for(let i=0; i < BOARDSIZE; i++){
      const box = document.querySelector('#box'+i);
      if(isNaN(board[i])){
        box.textContent = board[i];
      }
    };
  };

  // Adds listener to all squares
  const addListener = () => {
    for(let i=0; i < BOARDSIZE; i++){
      document.getElementById('box'+i).addEventListener('click', function(){ 
      placePiece(i);  
    });
  };
  }
  // Places player's piece in correct square when clicked
  const placePiece = (index) => {
    if(!isNaN(board[index]) && !Game.threeInARow()) {// If board[index] doesn't have player piece and game isn't over
      if(Game.round % 2 != 0){
        board[index] = 'x';
      }else {
        board[index] = 'o';
      }
    }else{
      return// else do nothing
    };
    
    renderPieces();// Maybe in Game.playRound
    Game.gameOver();// Check if game is over
    Game.round++;// Have 2 of these happening - Game.gameOver()
  }
  addListener();// Maybe move to Game.start when I make it 

  return {board, renderPieces, addListener};// Not sure if I need to return every function etc.

})();

const Game = (() => {
  let round = 1;

  const gameOver = () => {
    if(threeInARow()) {
      if(round % 2 == 0) {
        alert("Player 2 wins");
      }else {
        alert("player 1 wins");
        console.log(round);
      };
    };
    if(round === BOARDSIZE && !threeInARow()) {
      alert("cats Game");
    };
    round ++;// Have 2 of these happening - Gameboard.placePiece()
  }

  const threeInARow = () => {
    //horizontal   vertical     diagonal
    // 0 1 2        0 3 6        0 4 8
    // 3 4 5        1 4 7        2 4 6
    // 6 7 8        2 5 8
    if(Gameboard.board[0] === Gameboard.board[1] && Gameboard.board[1] === Gameboard.board[2] ||
       Gameboard.board[3] === Gameboard.board[4] && Gameboard.board[4] === Gameboard.board[5] ||
       Gameboard.board[6] === Gameboard.board[7] && Gameboard.board[7] === Gameboard.board[8] ||
       Gameboard.board[0] === Gameboard.board[3] && Gameboard.board[3] === Gameboard.board[6] ||
       Gameboard.board[1] === Gameboard.board[4] && Gameboard.board[4] === Gameboard.board[7] ||
       Gameboard.board[2] === Gameboard.board[5] && Gameboard.board[5] === Gameboard.board[8] ||
       Gameboard.board[0] === Gameboard.board[4] && Gameboard.board[4] === Gameboard.board[8] ||
       Gameboard.board[2] === Gameboard.board[4] && Gameboard.board[4] === Gameboard.board[6]) {
        return true;
      };
  }

  return {round, threeInARow, gameOver}
})();

const Player = () => {
  
};
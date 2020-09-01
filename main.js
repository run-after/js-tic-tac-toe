const BOARDSIZE = 9;

const Gameboard = (() => {
  let board = [0,1,2,3,4,5,6,7,8];
  
  // Places all pieces from board[] to the DOM
  const renderPieces = () =>  {
    for(let i=0; i < BOARDSIZE; i++){
      const box = document.querySelector('#box'+i);
      if(isNaN(Gameboard.board[i])){
        box.textContent = Gameboard.board[i];
      }else{
        box.textContent = '';
      }
    };
  };

  // Adds listener to all squares
  const addListener = () => {
    for(let i=0; i < BOARDSIZE; i++){
      document.getElementById('box'+i).addEventListener('click', function(){ 
      Game.placePiece(i);  
      });
    };
  }

  addListener();// Maybe move to Game.start when I make it 

  return {board, renderPieces, addListener};// Not sure if I need to return every function etc.

})();

const Game = (() => {
  let round = 1;
  let playerName = prompt("Player1 - What's your name?");
  let player1 = playerFactory(playerName, 'x');
  playerName = prompt("Player2 - What's your name?");
  let player2 = playerFactory(playerName, 'o');
  console.log(player1);
  console.log(player2);
  // Check if game over
  const gameOver = () => {
    if(threeInARow()) {
      if(round % 2 == 0) {
        alert(`${player2.name} wins!`);
      }else {
        alert(`${player1.name} wins!`);
      };
    };
    if(round === BOARDSIZE && !threeInARow()) {
      alert("cats Game");
    };
  };

  // Check if 3 in a row
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
  };

  const newGame = () => {
    window.location.reload(false); // Refresh page
  }

  document.getElementById('new-game').addEventListener('click', newGame);
  
  // reset game (Don't work)
  const gameRestart = () => {
    round = 0;
    Gameboard.board = [0,1,2,3,4,5,6,7,8];
    nextRound();
  };

  // Add listener to reset button(seems to work)
  document.getElementById('reset').addEventListener('click', gameRestart);

  // ends round and onto next
  const nextRound = () => {
    Gameboard.renderPieces();
    gameOver();// Check if game is over
    round++;
  }
  
  // place pieces on board
  const placePiece = (index) => {
    if(!isNaN(Gameboard.board[index]) && !threeInARow()) {// If board[index] doesn't have player piece and game isn't over
      if(round % 2 != 0){
        Gameboard.board[index] = player1.symbol;
      }else {
        Gameboard.board[index] = player2.symbol;
      }
    }else{
      return// else do nothing
    };
    nextRound();
  };

  // Allow following items to be accessed
  return {gameRestart, placePiece}
})();

function playerFactory(name, symbol) {
  return {
    name: name,
    symbol: symbol,
  }
};

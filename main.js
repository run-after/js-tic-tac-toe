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

  addListener();

  return {board, renderPieces};

})();

const Game = (() => {
  let round = 1;
  let player1; //initialize blank player
  let player2; //initialize blank player

  let getPlayersInfo = document.getElementById('create-players-btn');

// Takes info from user and creates new players
  getPlayersInfo.onclick = function() {
    let playerName = document.getElementById("name1").value;
    let playerComp = document.forms.addPlayers.comp1.value;
    player1 = playerFactory(playerName, 'x', playerComp);
    playerName = document.getElementById("name2").value;
    playerComp = document.forms.addPlayers.comp2.value;
    player2 = playerFactory(playerName, 'o', playerComp);
    document.getElementById("player1").textContent = `${player1.name}`;
    document.getElementById("player2").textContent = `${player2.name}`;
    modal.style.display="none";

    // if player 1 is comp then make the first move right away
    if(player1.isComp == 'true' && round % 2 != 0 && !gameOver()){
      ComputerPlayer.makeMove();
    }
  };// Put into create player function for each one

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
      alert("Cats Game");
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
  
  // reset game
  const gameRestart = () => {
    round = 0;
    Gameboard.board = [0,1,2,3,4,5,6,7,8];
    nextRound();
  };

  // Add listener to reset button(seems to work)
  document.getElementById('reset').addEventListener('click', gameRestart);

  // Ends round and onto next
  const nextRound = () => { 
    Gameboard.renderPieces();
    gameOver();
    if(!threeInARow()){
      round++;
      if(player2.isComp == 'true' && round % 2 == 0 && round < BOARDSIZE){
        ComputerPlayer.makeMove();
      }else if(player1.isComp == 'true' && round % 2 != 0 && round < BOARDSIZE){
        ComputerPlayer.makeMove();
      }
    }
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

  return {placePiece}
})();

// Computer makes move on easy mode
const ComputerPlayer = (() => {
  const makeMove = () => {
    let move = Math.floor((Math.random() * 9) + 1);
    if(isNaN(Gameboard.board[move])){
      makeMove();
    }else {
      document.getElementById(`box${move}`).click();
    };
  }

  return{makeMove};
})();

function playerFactory(name, symbol, isComp) {
  return {
    name: name,
    symbol: symbol,
    isComp: isComp,
  }
};
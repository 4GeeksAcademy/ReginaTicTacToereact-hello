import { useState } from "react";

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function Board({ player1, player2, playerSymbol }) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(playerSymbol === "X");

  function handleClick(index) {
    if (squares[index] || calculateWinner(squares)) return;
    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  function renderSquare(i) {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
  }

  const winner = calculateWinner(squares);
  let status = winner
    ? `Ganador: ${winner === "X" ? player1 : player2}`
    : `Turno de: ${xIsNext ? player1 : player2}`;

  return (
    <div>
      <h2 className="status">{status}</h2>
      <div className="board-row">
        {renderSquare(0)} {renderSquare(1)} {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)} {renderSquare(4)} {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)} {renderSquare(7)} {renderSquare(8)}
      </div>
      <button className="reset" onClick={resetGame}>
        Reiniciar Juego
      </button>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Home() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [playerSymbol, setPlayerSymbol] = useState(null);

  return (
    <div className="game">
      <h1>Tic-Tac-Toe In React</h1>
      {playerSymbol ? (
        <Board player1={player1} player2={player2} playerSymbol={playerSymbol} />
      ) : (
        <div className="choose-screen">
          <h2>Pick a Weapon </h2>
          <input
            type="text"
            placeholder="Player 1 username"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
          />
          <input
            type="text"
            placeholder="Player 2 username"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
          />
          <div className="choose-buttons">
            <button className="weapon-btn" onClick={() => setPlayerSymbol("X")}>X</button>
            <button className="weapon-btn" onClick={() => setPlayerSymbol("O")}>O</button>
          </div>
        </div>
      )}
    </div>
  );
}


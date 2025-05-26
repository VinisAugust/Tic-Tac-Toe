import { useState } from "react";
import Board from "./Board";
import "./index.css";

function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [step, setStep] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const current = history[step];
  const winner = calculateWinner(current);

  function handleClick(index) {
    if (winner || current[index]) return;

    const nextSquares = [...current];
    nextSquares[index] = xIsNext ? "X" : "O";

    const newHistory = [...history.slice(0, step + 1), nextSquares];
    setHistory(newHistory);
    setStep(newHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(move) {
    setStep(move);
    setXIsNext(move % 2 === 0);
  }

  const moves = history.map((_, move) => (
    <li key={move}>
      <button onClick={() => jumpTo(move)}>
        {move === 0 ? "Início do jogo" : `Voltar para jogada #${move}`}
      </button>
    </li>
  ));

  return (
    <div className="game">
      <h1>Jogo da Velha</h1>
      <Board squares={current} onClick={handleClick} />
      <div className="info">
        <p>{winner ? `Vencedor: ${winner}` : `Próximo jogador: ${xIsNext ? "X" : "O"}`}</p>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]            
  ];

  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; 
    }
  }

  if (squares.every(square => square !== null)) {
    return "Empate";
  }

  return null;
}

export default App;
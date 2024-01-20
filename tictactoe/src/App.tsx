import { useState } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/WinningCombinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2"
}

const INITIAL_GAME_BOARD: string[][] = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function DerivedWinner(
  players: { X: string; O: string },
  gameBoard: string[][]
) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const fisrtSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    if (
      fisrtSquareSymbol &&
      fisrtSquareSymbol === secondSquareSymbol &&
      fisrtSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[fisrtSquareSymbol];
    }
  }
  return winner;
}

function DeriveGameBoard(
  gameTurns: {
    square: { rowIndex: number; colIndex: number };
    player: string;
  }[]
) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((innerArray) => [...innerArray])];
  for (const turn of gameTurns) {
    const { player, square } = turn;
    const { rowIndex, colIndex } = square;
    gameBoard[rowIndex][colIndex] = player;
  }
  return gameBoard;
}

const App: React.FC = () => {
  const [players, setPlayers] = useState<{ X: string; O: string }>(PLAYERS);
  const [gameTurns, setGameTurns] = useState<
    { square: { rowIndex: number; colIndex: number }; player: string }[]
  >([]);

  const activePlayer =
    gameTurns.length > 0 && gameTurns[0].player === "X" ? "O" : "X";

  const derivedGameBoard = DeriveGameBoard(gameTurns);
  const derivedWinner = DerivedWinner(players, derivedGameBoard);

  const hasDraw = gameTurns.length === 9 && !derivedWinner;

  function handleSelectSquare(rowIndex: number, colIndex: number) {
    setGameTurns((prevTurns) => {
      const updatedTurns = [
        {
          square: { rowIndex: rowIndex, colIndex: colIndex },
          player: activePlayer,
        },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handlePlayerNameChange(symbol: string, name: string) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: name,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={players.X}
            symbol="X"
            activePlayerSymbol={activePlayer}
            onNameChange={handlePlayerNameChange}
          />
          <Player
            name={players.O}
            symbol="O"
            activePlayerSymbol={activePlayer}
            onNameChange={handlePlayerNameChange}
          />
        </ol>
        {(derivedWinner || hasDraw) && (
          <GameOver
            winner={derivedWinner}
            onRestartClick={() => setGameTurns([])}
          />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={derivedGameBoard} />
      </div>
      <Log gameTurns={gameTurns} players={players} />
    </main>
  );
};

export default App;

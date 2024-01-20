interface ILog {
  gameTurns: {
    square: { rowIndex: number; colIndex: number };
    player: string;
  }[];
  players: {
    "X": string;
    "O": string;
  };
}

const Log: React.FC<ILog> = ({ gameTurns, players }) => {
  return (
    <ol id="log">
      {gameTurns &&
        gameTurns.map((value) => {
          const { square, player } = value;
          const { rowIndex, colIndex } = square;
          const playerName = player === "X" ? players.X : players.O;
          return (
            <li key={`${rowIndex}${colIndex}`}>
              {playerName} selected row {rowIndex + 1}, column {colIndex + 1}
            </li>
          );
        })}
    </ol>
  );
};
export default Log;

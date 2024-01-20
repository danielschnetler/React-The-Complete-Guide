interface IGameOver {
  winner?: string;
  onRestartClick: () => void;
}
const GameOver: React.FC<IGameOver> = ({ winner, onRestartClick }) => {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>You won {winner}!</p>}
      <p>
        <button onClick={()=>{
            onRestartClick();
            
            }}>Restart</button>
      </p>
    </div>
  );
};
export default GameOver;

import React, { useState } from "react";

interface IPlayer {
  name: string;
  symbol: string;
  activePlayerSymbol: string;
  onNameChange: (symbol: string, name: string) => void;
}

const Player: React.FC<IPlayer> = ({
  name,
  symbol,
  activePlayerSymbol,
  onNameChange,
}) => {
  const [playerName, setPlayerName] = useState<string>(name);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  function handleEditClick() {
    if (isEditing) {
      onNameChange(symbol, playerName);
    }
    setIsEditing((prevState) => !prevState);
  }

  function handleTextUpdate(event: React.ChangeEvent<HTMLInputElement>) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editablePlayerName = (
      <input
        type="text"
        required
        value={playerName}
        onChange={handleTextUpdate}
      />
    );
  }

  return (
    <li className={symbol === activePlayerSymbol ? "active" : ""}>
      <span className={"player"}>
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={() => handleEditClick()}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
};
export default Player;

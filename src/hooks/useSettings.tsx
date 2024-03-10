import React, {useCallback, useState} from "react";
import {GameType} from "../utils/generateGameBoard";

const useSettings = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState<1 | 2>(1);
  const [difficulty, setDifficulty] = useState<GameType>("4x4");

  const onNumberOfPlayersChange = useCallback(
    (_: React.MouseEvent<HTMLButtonElement, MouseEvent>, players: 1 | 2) => {
      setNumberOfPlayers(players);
    },
    []
  );

  const onDifficultyChange = useCallback(
    (_: React.MouseEvent<HTMLButtonElement, MouseEvent>, gameType: GameType) => {
      setDifficulty(gameType);
    },
    []
  );

  return {onNumberOfPlayersChange, onDifficultyChange, difficulty, numberOfPlayers};
};

export default useSettings;

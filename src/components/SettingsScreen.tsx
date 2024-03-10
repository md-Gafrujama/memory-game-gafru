import styled from "@emotion/styled";
import SettingsButton from "./buttons/SettingsButton";
import {GameType} from "../utils/generateGameBoard";

interface SettingsScreenProps {
  onDifficultyChange: (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    gameType: GameType
  ) => void;
  onNumberOfPlayersChange: (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    players: 1 | 2
  ) => void;
  numberOfPlayers: 1 | 2;
  difficulty: GameType;
  handleBackToGame: () => void;
  handleNewGame: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onDifficultyChange,
  onNumberOfPlayersChange,
  difficulty,
  numberOfPlayers,
  handleBackToGame,
  handleNewGame,
}) => {
  return (
    <Wrapper>
      <Row>
        <Title>Number of players</Title>
      </Row>
      <Row>
        <SettingsButton
          isActive={numberOfPlayers === 1}
          onClick={(event) => onNumberOfPlayersChange(event, 1)}
        >
          1
        </SettingsButton>
        <SettingsButton
          isActive={numberOfPlayers === 2}
          onClick={(event) => onNumberOfPlayersChange(event, 2)}
        >
          2
        </SettingsButton>
      </Row>
      <Row>
        <Title>Difficulty</Title>
      </Row>
      <Row>
        <SettingsButton
          isActive={difficulty === "4x4"}
          onClick={(event) => onDifficultyChange(event, "4x4")}
        >
          4x4
        </SettingsButton>
        <SettingsButton
          isActive={difficulty === "6x6"}
          onClick={(event) => onDifficultyChange(event, "6x6")}
        >
          6x6
        </SettingsButton>
      </Row>
      <Row>
        <InfoLabel>
          Changing any of the settings will cause a new game, click on back to game if you wish to
          go back to your game without changes
        </InfoLabel>
      </Row>
      <Row>
        <SettingsButton color="orange" onClick={handleNewGame}>
          Start new game
        </SettingsButton>
      </Row>
      <Row>
        <SettingsButton onClick={handleBackToGame}>Back to game</SettingsButton>
      </Row>
    </Wrapper>
  );
};

export default SettingsScreen;

const Wrapper = styled.section`
  width: 100%;
  max-width: 500px;
  margin: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  padding: 4px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Title = styled.p`
  font-size: 18px;
  margin: 0;
  font-weight: bold;
  color: #31485a;
`;

const InfoLabel = styled.div`
  font-size: 16px;
  margin: 0;
  font-weight: bold;
  color: #31485a;
`;

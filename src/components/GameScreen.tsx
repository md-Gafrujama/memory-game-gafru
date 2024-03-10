import styled from "@emotion/styled";
import {Chip, ChipData} from "../hooks/useGameBoard";
import {GameType} from "../utils/generateGameBoard";

interface GameScreenProps {
  computedBoardState: Chip[][] | undefined;
  onChipClick: (_: React.MouseEvent<HTMLSpanElement, MouseEvent>, data: ChipData) => void;
  difficulty: GameType;
}

interface ChipProps {
  state: Chip["state"];
  difficulty: GameType;
}

const GameScreen = ({computedBoardState, onChipClick, difficulty}: GameScreenProps) => {
  return (
    <GameScreenWrapper>
      <BoardWrapper>
        {computedBoardState?.map((row, i) => (
          <Row key={i}>
            {row.map((chip, j) => (
              <StyledChip
                onClick={(event) => onChipClick(event, {chipPosition: [i, j], ...chip})}
                state={chip.state}
                key={j}
                difficulty={difficulty}
              >
                {chip.state === "hidden" ? null : chip.value}
              </StyledChip>
            ))}
          </Row>
        ))}
      </BoardWrapper>
    </GameScreenWrapper>
  );
};

const GameScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 900px;
  max-width: 100%;
  align-items: center;
  padding: 16px;
  margin: 16px;
`;

const BoardWrapper = styled.div`
  width: 500px;
  max-width: 100%;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 16px;
`;

const StyledChip = styled.span<ChipProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({state}) =>
    state === "hidden" ? "#31485a" : state === "selected" ? "orange" : "#bcceda"};
  border-radius: 50%;
  width: 70px;
  height: 70px;
  cursor: pointer;
  color: #f5f9fa;
  font-size: 28px;
  font-weight: bold;
  border: none;

  &:hover {
    background-color: ${({state}) =>
      state === "hidden" ? "#182c3a" : state === "selected" ? "orange" : "#bcceda"};
  }

  @media (max-width: 600px) {
    width: ${({difficulty}) => (difficulty === "4x4" ? "70px" : "50px")};
    height: ${({difficulty}) => (difficulty === "4x4" ? "70px" : "50px")};
  }
`;

export default GameScreen;

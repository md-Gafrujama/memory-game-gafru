import styled from "@emotion/styled";
import {toHHMMSS} from "../../utils/numberFormatter";

interface StatsFooter {
  numberOfPlayers: 1 | 2;
  time: number;
  moves: number;
  currentPlayer: 1 | 2;
  firstPlayerScore: number;
  secondPlayerScore: number;
}

const StatsFooter: React.FC<StatsFooter> = ({
  numberOfPlayers,
  time,
  moves,
  currentPlayer,
  firstPlayerScore,
  secondPlayerScore,
}) => {
  const isFirstPlayerActive = currentPlayer === 1;
  const isSecondPlayerActive = currentPlayer === 2;

  return numberOfPlayers === 1 ? (
    <Wrapper numberOfPlayers={numberOfPlayers}>
      <StatBox>
        <SpaceAroundWrapper>
          <span style={{color: "#6790a0"}}>Time</span>
          <span style={{fontSize: "16px"}}>{toHHMMSS(time)}</span>
        </SpaceAroundWrapper>
      </StatBox>
      <StatBox>
        <SpaceAroundWrapper>
          <span style={{color: "#6790a0"}}>Moves</span>
          <span style={{fontSize: "16px"}}>{moves}</span>
        </SpaceAroundWrapper>
      </StatBox>
    </Wrapper>
  ) : (
    <Wrapper numberOfPlayers={numberOfPlayers}>
      <PlayerStatWrapper>
        <ArrowUp isActive={isFirstPlayerActive} />
        <StatBox isActive={isFirstPlayerActive}>
          <div>
            <div>Player 1</div>
            <div style={{fontSize: "16px", fontWeight: "normal", textAlign: "center"}}>
              score: {firstPlayerScore}
            </div>
          </div>
        </StatBox>
      </PlayerStatWrapper>
      <PlayerStatWrapper>
        <ArrowUp isActive={isSecondPlayerActive} />
        <StatBox isActive={isSecondPlayerActive}>
          <div>
            <div>Player 2</div>
            <div style={{fontSize: "16px", fontWeight: "normal", textAlign: "center"}}>
              score: {secondPlayerScore}
            </div>
          </div>
        </StatBox>
      </PlayerStatWrapper>
    </Wrapper>
  );
};

export default StatsFooter;

const Wrapper = styled.footer<{numberOfPlayers: 1 | 2}>`
  width: 100%;
  max-width: 700px;
  display: flex;
  justify-content: center;
  margin: 10px;
  padding: 10px;
  gap: 10px;

  @media (max-width: 600px) {
    flex-direction: ${({numberOfPlayers}) => (numberOfPlayers === 1 ? "column" : "row")};
    align-items: center;
  }
`;

const StatBox = styled.div<{isActive?: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 65px;
  border-radius: 12px;
  padding: 5px;
  font-size: 18px;
  font-weight: bold;
  color: ${({isActive}) => (isActive ? "white" : "#31485a")};
  background-color: ${({isActive}) => (isActive ? "orange" : "#dfe6ec")};
`;

const SpaceAroundWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const ArrowUp = styled.div<{isActive?: boolean}>`
  width: 0;
  height: 0;
  border-left: 16px solid transparent;
  border-right: 16px solid transparent;
  border-bottom: 16px solid ${({isActive}) => (isActive ? "orange" : "transparent")};
`;

const PlayerStatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 200px;
`;

import {useCallback, useEffect, useMemo, useState} from "react";
import {GameType, generateGameBoard} from "../utils/generateGameBoard";

export interface Chip {
  value: number;
  state: "hidden" | "selected" | "reveled";
}

export interface ChipData extends Chip {
  chipPosition: [number, number];
}

interface OnClickArgs {
  data: ChipData;
  chipPosition: [number, number];
  value: number;
}

interface UseGameBoard {
  difficulty: GameType;
}

const useGameBoard = ({difficulty = "4x4"}: UseGameBoard) => {
  const [gameBoard, setGameBoard] = useState<number[][]>(generateGameBoard(difficulty));
  const [time, setTime] = useState(0);
  const [moves, setMoves] = useState(0);
  const [selectedChips, setSelectedChips] = useState<ChipData[]>([]);
  const [computedBoardState, setComputedBoardState] = useState<Chip[][]>();
  const [boardFreeze, setBoardFreeze] = useState(false);
  const [startTimer, setStartTimer] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [firstPlayerScore, setFirstPlayerScore] = useState(0);
  const [secondPlayerScore, setSecondPlayerScore] = useState(0);
  const isGameFinished = useMemo(
    () => computedBoardState?.every((row) => row.every((cell) => cell.state === "reveled")),
    [computedBoardState]
  );

  const onFirstChipClick = useCallback(({data, chipPosition, value}: OnClickArgs) => {
    setComputedBoardState((prev) => {
      let stateCopy = prev?.map((row) => row.map((cell) => cell));

      if (stateCopy) {
        stateCopy[chipPosition[0]][chipPosition[1]] = {value, state: "selected"};
        return stateCopy;
      }

      return prev;
    });
    setSelectedChips((prev) => [...prev, data]);
  }, []);

  const onSecondChipClick = useCallback(
    ({chipPosition, value}: Omit<OnClickArgs, "data">) => {
      const firstSelectedChip = selectedChips[0];
      if (selectedChips[0].value === value) {
        setComputedBoardState((prev) => {
          let stateCopy = prev?.map((row) => row.map((cell) => cell));

          if (stateCopy) {
            stateCopy[chipPosition[0]][chipPosition[1]] = {value, state: "reveled"};
            stateCopy[firstSelectedChip.chipPosition[0]][firstSelectedChip.chipPosition[1]] = {
              value,
              state: "reveled",
            };
            return stateCopy;
          }
        });
        setSelectedChips([]);
        if (currentPlayer === 1) {
          setFirstPlayerScore((prev) => prev + 1);
        } else {
          setSecondPlayerScore((prev) => prev + 1);
        }
      } else {
        setBoardFreeze(true);
        setComputedBoardState((prev) => {
          let stateCopy = prev?.map((row) => row.map((cell) => cell));

          if (stateCopy) {
            stateCopy[chipPosition[0]][chipPosition[1]] = {value, state: "selected"};
            stateCopy[firstSelectedChip.chipPosition[0]][firstSelectedChip.chipPosition[1]] = {
              value: firstSelectedChip.value,
              state: "selected",
            };
            return stateCopy;
          }
        });

        setTimeout(() => {
          setComputedBoardState((prev) => {
            let stateCopy = prev?.map((row) => row.map((cell) => cell));

            if (stateCopy) {
              stateCopy[chipPosition[0]][chipPosition[1]] = {value, state: "hidden"};
              stateCopy[firstSelectedChip.chipPosition[0]][firstSelectedChip.chipPosition[1]] = {
                value: firstSelectedChip.value,
                state: "hidden",
              };
              return stateCopy;
            }
          });

          setSelectedChips([]);
          setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
          setBoardFreeze(false);
        }, 1000);
      }
    },
    [selectedChips, boardFreeze, currentPlayer, firstPlayerScore, secondPlayerScore]
  );

  const onChipClick = useCallback(
    (_: React.MouseEvent<HTMLSpanElement, MouseEvent>, data: ChipData) => {
      const {chipPosition, state, value} = data;
      if (!computedBoardState) {
        return;
      }
      if (boardFreeze) {
        return;
      }
      if (startTimer === false) {
        setStartTimer(true);
      }

      if (selectedChips.length === 0) {
        if (state === "hidden") {
          onFirstChipClick({data, chipPosition, value});
        }
      } else if (selectedChips.length === 1) {
        if (state === "hidden") {
          onSecondChipClick({chipPosition, value});
          setMoves((prev) => prev + 1);
        }
      }
    },
    [selectedChips, computedBoardState]
  );

  const onRestart = useCallback(() => {
    setComputedBoardState((prev) =>
      prev?.map((row) => row.map((cell) => ({...cell, state: "hidden"})))
    );
    setSelectedChips([]);
  }, [computedBoardState]);

  const onNewGame = useCallback(
    (difficulty: GameType) => {
      setGameBoard(generateGameBoard(difficulty));
      setComputedBoardState(
        gameBoard?.map((row) => row.map((chip) => ({value: chip, state: "hidden"})))
      );
      setSelectedChips([]);
    },
    [gameBoard, computedBoardState]
  );

  useEffect(() => {
    setComputedBoardState(
      gameBoard?.map((row) => {
        return row.map((chip) => ({value: chip, state: "hidden"}));
      })
    );
  }, [gameBoard]);

  useEffect(() => {
    setGameBoard(generateGameBoard(difficulty));
  }, [difficulty]);

  useEffect(() => {
    let timerInterval: number | undefined;
    if (startTimer) {
      timerInterval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }
    if (isGameFinished) {
      clearInterval(timerInterval);
    }
    return () => {
      clearInterval(timerInterval);
    };
  }, [startTimer, isGameFinished]);

  return {
    gameBoard,
    setGameBoard,
    computedBoardState,
    time,
    setTime,
    moves,
    setMoves,
    onChipClick,
    onRestart,
    setStartTimer,
    onNewGame,
    firstPlayerScore,
    secondPlayerScore,
    currentPlayer,
    setCurrentPlayer,
    setFirstPlayerScore,
    setSecondPlayerScore,
  };
};

export default useGameBoard;

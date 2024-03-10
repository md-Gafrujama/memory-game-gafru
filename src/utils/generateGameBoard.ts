export type GameType = "4x4" | "6x6";
type RandomSpots = {
  [randomSpot: string]: {x: number; y: number};
};

export const generateGameBoard = (type: GameType): Array<Array<number>> => {
  let ROWS: number;
  let COLUMNS: number;

  if (type === "4x4") {
    ROWS = 4;
    COLUMNS = 4;
  } else {
    ROWS = 6;
    COLUMNS = 6;
  }

  const board: Array<Array<number>> = [];
  for (let i = 0; i < ROWS; i++) {
    board.push([]);
    for (let k = 0; k < COLUMNS; k++) {
      board[i].push(0);
    }
  }

  return insertRandomNumbersToBoard(board);
};

export function insertRandomNumbersToBoard(board: Array<Array<number>>) {
  let computedBoard = board;
  let NUMBER_OF_SPOTS: number;
  let MAX_NUMBER: number;

  if (computedBoard.length === 4) {
    NUMBER_OF_SPOTS = 16;
    MAX_NUMBER = 4;
  } else {
    NUMBER_OF_SPOTS = 36;
    MAX_NUMBER = 6;
  }

  const randomSpots: RandomSpots = {};

  while (true) {
    if (Object.keys(randomSpots).length === NUMBER_OF_SPOTS) {
      break;
    }

    const x = Math.floor(Math.random() * MAX_NUMBER);
    const y = Math.floor(Math.random() * MAX_NUMBER);

    const randomSpotKey = Math.random();

    if (!Object.values(randomSpots).find((val) => val.x === x && val.y === y)) {
      randomSpots[randomSpotKey] = {x, y};
    }
  }

  let counter = 2;
  let currentNumber = 1;

  Object.values(randomSpots).forEach((spot) => {
    computedBoard[spot.x][spot.y] = currentNumber;
    counter--;
    if (counter === 0) {
      counter = 2;
      currentNumber++;
    }
  });

  return computedBoard;
}

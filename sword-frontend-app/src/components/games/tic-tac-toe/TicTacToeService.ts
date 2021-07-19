import { Board, PositionFill, WinnerType } from "../GamesService";

export const playTicTacToe = (
  board: Board,
  player: 1 | 2,
  x: number,
  y: number,
  prev: PositionFill
): { newBoard?: Board; valid: boolean } => {
  console.log({ x, y });
  if (x < 0 || x >= board.length || y < 0 || y >= board.length || prev !== 0) {
    return { valid: false };
  }
  const newBoard = [...board];
  board.forEach((row: PositionFill[], index: number) => {
    newBoard[index] = [...row];
  });
  newBoard[x][y] = player;
  return { newBoard: [...newBoard], valid: true };
};

const checkLinesOrColumns = (
  board: Board,
  lines = true
): { player: 0 | 1 | 2; index: number } => {
  for (let i = 0; i < board.length; i++) {
    const first = lines ? board[i][0] : board[0][i];

    let current = first;
    if (current === 0) {
      continue;
    }

    for (let j = 1; j < board.length; j++) {
      const iterator = lines ? board[i][j] : board[j][i];
      if (iterator !== current) {
        current = 0;
        break;
      }
    }

    if (current !== 0) {
      return { player: current, index: i };
    }
  }

  return { player: 0, index: -1 };
};

const checkDiagonals = (board: Board): { player: 0 | 1 | 2; index: number } => {
  let diag1: 0 | 1 | 2 = board[0][0];
  let diag2: 0 | 1 | 2 = board[0][board.length - 1];

  for (let i = 1; i < board.length; i++) {
    if (!diag1 && !diag2) {
      return { player: 0, index: -1 };
    }
    diag1 = board[i][i] === diag1 ? board[i][i] : 0;
    diag2 = board[i][board.length - 1 - i] === diag2 ? board[i][board.length - 1 - i] : 0;
  }

  if (diag1) {
    return { player: diag1, index: 0 };
  }
  return { player: diag2, index: 1 };
};

export const checkWinner = (
  board: Board
): WinnerType => {
  const winnerLines = checkLinesOrColumns(board);
  if (winnerLines.player) {
    return { ...winnerLines, type: "h" };
  }

  const winnerCols = checkLinesOrColumns(board, false);
  if (winnerCols.player) {
    return { ...winnerCols, type: "v" };
  }

  return { ...checkDiagonals(board), type: "d" };
};

export const play4InaRow = (board: Board, player: 1 | 2, x: number, y: number, prev: PositionFill) : { newBoard?: Board; valid: boolean } => {
  if (x < 0 || x >= board.length || y < 0 || y >= board.length || prev !== 0) {
    return { valid: false };
  }

  const newBoard = [...board];
  board.forEach((row: PositionFill[], index: number) => {
    newBoard[index] = [...row];
  });

  for (let i = board.length - 1; i >= 0; i--) {
    if (newBoard[i][y] === 0) {
      console.log(newBoard[i][y]);
      newBoard[i][y] = player;
      break;
    }
  }

  console.log(newBoard);

  return { newBoard: [...newBoard], valid: true };
};

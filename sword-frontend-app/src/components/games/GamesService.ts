export type PositionFill = 0 | 1 | 2;
export type Board = PositionFill[][];
export type GameState = "paused" | "running" | "finished";

export const BEST_OF = 9;
export const MIN_WINS = Math.ceil(BEST_OF / 2);

export type WinnerType = {
  player: 0 | 1 | 2;
  index: number;
  type: "h" | "v" | "d";
};

export type Game = {
  time?: number;
  winner: WinnerType;
};

export type GameBoard = {
  board: Board;
  currentPlayer: 1 | 2;
};

export const createBoard = (size: number): Board => {
  const border: PositionFill[][] = new Array(size);
  for (let i = 0; i < border.length; i++) {
    border[i] = new Array<PositionFill>(size);
    border[i].fill(0);
  }

  return border;
};

export enum GameName {
  ttt='TicTacToe',
  fiar='4 in a row'
}

export type GameType = {
  name: GameName
  default: number
  min: number
  max: number
}

export const TTT : GameType = {
  name: GameName.ttt,
  min: 3,
  default: 3,
  max: 12
};

export const FIAR : GameType = {
  name: GameName.fiar,
  min: 4,
  default: 4,
  max: 12
};

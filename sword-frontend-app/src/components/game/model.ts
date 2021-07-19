import {
  fourInaRowLogic, ticTacToeLogic
} from "./logic/gameLogic";

export type PositionFill = 0 | 1 | 2;
export type Board = PositionFill[][];
export type GameState = "paused" | "running" | "finished";

export const BEST_OF = 9;
export const MIN_WINS = Math.ceil(BEST_OF / 2);

export type GameLogic = {
  play: (
    board: Board,
    player: 1 | 2,
    x: number,
    y: number,
    prev: PositionFill
  ) => { newBoard?: Board; valid: boolean };
  checkWinner: (board: Board, moves: number) => WinnerType;
};

export type WinnerType = {
  player: 0 | 1 | 2;
  index: number;
  type: "h" | "v" | "d";
  draw?: boolean;
};

export type Game = {
  time?: number;
  winner: WinnerType;
};

export type GameBoard = {
  board: Board;
  currentPlayer: 1 | 2;
};

export enum GameName {
  ttt = "TicTacToe",
  fiar = "4 in a row",
}

export type GameType = {
  name: GameName;
  default: number;
  min: number;
  max: number;
  gameLogic: GameLogic;
};

export const TTT: GameType = {
  name: GameName.ttt,
  min: 3,
  default: 3,
  max: 12,
  gameLogic: ticTacToeLogic,
};

export const FIAR: GameType = {
  name: GameName.fiar,
  min: 4,
  default: 4,
  max: 12,
  gameLogic: fourInaRowLogic,
};

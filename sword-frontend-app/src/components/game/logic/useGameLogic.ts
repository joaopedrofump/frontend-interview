import { useCallback, useEffect } from "react";
import {
  Board, GameBoard, GameLogic, PositionFill, WinnerType
} from "../model";

export const useGameLogic = (
  board: GameBoard,
  setWinner: (winner: WinnerType) => void,
  updateGameBoard: (board: Board, newPlayer: 1 | 2) => void,
  gameLogic: GameLogic,
  moves: number
): ((x: number, y: number, prevPos: PositionFill) => void
) => {
  const makeMove = useCallback(
    (x: number, y: number, prevPos: PositionFill) => {
      const { valid, newBoard } = gameLogic.play(
        board.board,
        board.currentPlayer,
        x,
        y,
        prevPos
      );
      if (valid && newBoard) {
        updateGameBoard(newBoard, board.currentPlayer === 1 ? 2 : 1);
      }
    },
    [updateGameBoard, board, gameLogic]
  );

  useEffect(() => {
    const newWinner = gameLogic.checkWinner(board.board, moves);
    if (newWinner.player !== 0 || newWinner.draw) {
      setWinner(newWinner);
    }
  }, [setWinner, board, gameLogic, moves]);

  return makeMove;
};

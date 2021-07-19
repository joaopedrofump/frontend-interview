import React, { useCallback, useEffect, useRef } from 'react';
import { Board as BoardModel, GameBoard, GameName, GameType, PositionFill, WinnerType } from '../GamesService';
import Board from '../board/Board';
import { checkWinner, play4InaRow, playTicTacToe } from './TicTacToeService';

type Props = {
  board: GameBoard
  updateGameBoard: (board: BoardModel, newPlayer: 1 | 2) => void
  setWinner: (winner: WinnerType) => void
  winner?: WinnerType
  gameName: GameName
}

const TicTacToe: React.FC<Props> = ({ board, updateGameBoard, setWinner, winner, gameName }) => {
  const moves = useRef<number>(0);

  const makeMove = useCallback((x: number, y: number, prevPos: PositionFill) => {
    let playFunction;
    switch (gameName) {
      case GameName.ttt:
        playFunction = playTicTacToe;
        break;
      case GameName.fiar:
        playFunction = play4InaRow;
        break;
      default:
        playFunction = playTicTacToe;
        break;
    }
    // const { valid, newBoard } = playTicTacToe(board.board, board.currentPlayer, x, y, prevPos);
    // const { valid, newBoard } = play4InaRow(board.board, board.currentPlayer, x, y, prevPos);
    const { valid, newBoard } = playFunction(board.board, board.currentPlayer, x, y, prevPos);
    if (valid && newBoard) {
      updateGameBoard(newBoard, board.currentPlayer === 1 ? 2 : 1);
      moves.current += 1;
    }
  }, [updateGameBoard, board]);

  useEffect(() => {
    const newWinner = checkWinner(board.board);
    if (newWinner.player !== 0) {
      setWinner(newWinner);
      moves.current = 0;
    } else if (moves.current === board.board.length * board.board.length) {
      setWinner({
        player: 0,
        index: -1,
        type: 'h'
      });
      moves.current = 0;
    }
  }, [setWinner, board]);

  return (
    <Board winner={winner} makeMove={makeMove} board={board.board} />
  );
};

export default TicTacToe;

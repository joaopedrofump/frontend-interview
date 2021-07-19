import clsx from 'clsx';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Button from '../templates/button/Button';
import './Game.css';
import Stats from './stats/Stats';
import Board from './board/Board';
import Timer from './timer/Timer';
import {
  GameBoard,
  GameType, Game as GameModel,
  FIAR,
  GameName,
  GameState,
  MIN_WINS,
  TTT,
  WinnerType, Board as BoardModel
} from './model';
import { createBoard } from './utils';
import { useGameLogic } from './logic/useGameLogic';

const getBraNdNewGameBoard = (size: string, gt: GameType): GameBoard[] => {
  const parsed = Number(size);
  const correctSize = parsed <= gt.min || parsed >= gt.max ? gt.default : parsed;

  return [{
    board: createBoard(correctSize),
    currentPlayer: 1,
  }];
};

const Game: React.FC = () => {
  const [gameType, setGameType] = useState<GameType>(TTT);
  const [boardSize, setBoardSize] = useState<string>(String(gameType.default));
  const [gameBoards, setGameBoards] = useState<GameBoard[]>(
    getBraNdNewGameBoard(String(gameType.default), gameType)
  );
  const [games, setGames] = useState<GameModel[]>([]);
  const currentGame = useMemo(() => gameBoards[gameBoards.length - 1], [gameBoards]);
  const p1Result = useMemo(
    () => games.filter(({ winner: { player } }) => player === 1).length, [games]
  );
  const p2Result = useMemo(
    () => games.filter(({ winner: { player } }) => player === 2).length, [games]
  );
  const [winner, setWinner] = useState<WinnerType>();
  const [gameState, setGameState] = useState<GameState>('paused');
  const setTTT = useCallback(() => {
    setGameState('paused');
    setGameType(TTT);
    setBoardSize(String(TTT.default));
    setGameBoards(getBraNdNewGameBoard(String(TTT.default), TTT));
  }, [setGameType]);
  const setFIAR = useCallback(() => {
    setGameState('paused');
    setGameType(FIAR);
    setBoardSize(String(FIAR.default));
    setGameBoards(getBraNdNewGameBoard(String(FIAR.default), FIAR));
  }, [setGameType]);

  const statsRef = useRef<HTMLDivElement | null>(null);

  const inputSizeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setBoardSize(event.target.value), [setBoardSize]
  );

  const p1W = useMemo(() => p1Result >= MIN_WINS, [p1Result]);
  const p2W = useMemo(() => p2Result >= MIN_WINS, [p2Result]);

  const updateBoard = useCallback((board: BoardModel, newPlayer: 1 | 2): void => {
    if (gameState !== 'running') {
      return;
    }

    setGameBoards((prev: GameBoard[]) => {
      const newState = [...prev];
      newState.push({
        board,
        currentPlayer: newPlayer,
      });

      return newState;
    });
  }, [gameState]);

  const updateWinner = useCallback((newWinner: WinnerType): void => {
    if (winner) { return; }
    setWinner(newWinner);
    setGameState('finished');
    setGames((prev: GameModel[]) => ([...prev, { winner: newWinner }]));
  }, [winner]);

  const handleStart = (): void => {
    setGameState('running');
    setWinner(undefined);
    setGameBoards(getBraNdNewGameBoard(boardSize, gameType));
    if (p1W || p2W) {
      setGames([]);
    }
  };
  const handleCancel = (): void => {
    setGameState('paused');
    setGameBoards(getBraNdNewGameBoard(boardSize, gameType));
  };

  const undoMove = (): void => {
    setGameBoards((prev: GameBoard[]) => {
      const newState = [...prev];
      newState.pop();
      return newState;
    });
  };

  useEffect(() => {
    if (p1W || p2W) {
      if (!statsRef.current) { return; }
      statsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [p1W, p2W]);

  const makeMove = useGameLogic(
    currentGame, updateWinner,
    updateBoard, gameType.gameLogic,
    gameBoards.length - 1
  );

  return (
    <>
      <section className="games">
        <h2>Tic tac toe games</h2>
        <p>Welcome to the best game in the world.</p>
        <div className="game">
          <div className="game-type">
            <Button
              disabled={(gameState === 'running')}
              className={clsx({ selected: gameType.name === GameName.ttt })}
              onClick={setTTT}
            >
              TicTacToe
            </Button>
            <Button
              disabled={gameState === 'running'}
              className={clsx({ selected: gameType.name === GameName.fiar })}
              onClick={setFIAR}
            >
              4 in a row
            </Button>
          </div>
          <div className="settings">
            <div className="game-button select-size">
              <input
                disabled={gameState !== 'paused'}
                aria-label="board size"
                type="number"
                placeholder={`board size (${gameType.min}-${gameType.max})`}
                value={boardSize}
                onChange={inputSizeHandler}
              />
            </div>
            <div className="game-button game-button-start">
              <Button disabled={gameState === 'running'} onClick={handleStart} color="primary">
                Start
              </Button>
            </div>
            <div className="game-button">
              <Button disabled={gameState !== 'running'} onClick={handleCancel}>
                Cancel Game
              </Button>
            </div>
          </div>
          <div className="player-result player1-result">
            <div className="game-button undo">
              <Button
                disabled={currentGame?.currentPlayer === 1 || gameState !== 'running'}
                onClick={undoMove}
                color="primary"
              >
                Undo
              </Button>
            </div>
            <p
              className={clsx(
                { 'current-player': currentGame.currentPlayer === 1 && gameState === 'running' }
              )}
            >
              Player 1
            </p>
            <p>{p1Result}</p>
          </div>
          <div className="game-area">
            <p className={clsx({
              'feedback-visible': !!winner,
              'feedback-hidden': !winner
            })}
            >
              {
                winner?.player === 1 || winner?.player === 2
                  ? (
                    <span>
                      {`Player ${winner.player} won this one, 
                      press start to play next game. First with ${MIN_WINS} wins!`}
                    </span>
                  )
                  : null
              }
              {winner?.player === 0
                ? (
                  <span>This one was a tie, press start to play again.</span>
                ) : ' Do your best!'}
            </p>
            <Board winner={winner} board={currentGame.board} makeMove={makeMove} />
          </div>
          <div className="player-result player2-result">
            <div className="game-button undo">
              <Button
                disabled={
                  currentGame?.currentPlayer === 2
                  || gameBoards.length < 2
                  || gameState !== 'running'
                }
                onClick={undoMove}
                color="primary"
              >
                Undo
              </Button>
            </div>
            <p
              className={clsx(
                { 'current-player': currentGame.currentPlayer === 2 && gameState === 'running' }
              )}
            >
              Player 2
            </p>
            <p>{p2Result}</p>
          </div>
          <div className="timer">
            <Timer setGames={setGames} games={games} gameState={gameState} />
          </div>
        </div>
        <div ref={statsRef}>
          {
            p1W || p2W
              ? (
                <p
                  className="player-victory-congrats"
                >
                  {`Congrats P${p1W ? '1' : '2'}, you are the winner. 
                Check stats. If feel like playing again scroll up and start a new game!`}
                </p>
              )
              : null
          }
        </div>
      </section>
      <Stats games={games} />
    </>
  );
};

export default Game;

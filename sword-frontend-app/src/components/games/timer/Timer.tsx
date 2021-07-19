import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Game, GameState } from '../GamesService';
import { getDate } from './TimerService';

type Props = {
  gameState: GameState
  games: Game[]
  setGames: Dispatch<SetStateAction<Game[]>>
}

const Timer: React.FC<Props> = ({ gameState, games, setGames }) => {
  const [time, setTime] = useState<number>(0);
  const interval = useRef<any>();
  const { hours, minutes, seconds } = getDate(time);

  useEffect(() => {
    if (gameState === 'running') {
      setTime(0);
      interval.current = setInterval(() => setTime((prev: number) => prev + 1), 1000);
    } else {
      clearInterval(interval.current);
      if (gameState === 'paused') {
        setTime(0);
      }
    }
  }, [gameState, setTime]);

  useEffect(() => {
    if (games.length === 0 || gameState !== 'finished') { return; }

    setGames((prev: Game[]) => {
      const newGames = [...prev];
      newGames[newGames.length - 1].time = time;
      return newGames;
    });
  }, [setGames, games.length, time, gameState]);

  return (
    <div className="time">
      <span>
        {hours}
        :
      </span>
      <span>
        {minutes}
        :
      </span>
      <span>
        {seconds}
      </span>
    </div>
  );
};

export default Timer;

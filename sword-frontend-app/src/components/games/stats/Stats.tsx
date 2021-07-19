import clsx from 'clsx';
import React, { useMemo } from 'react';
import { BEST_OF, Game } from '../GamesService';
import { getDate } from '../timer/TimerService';
import './Stats.css';

type Props = {
  games: Game[]
}

const Stats: React.FC<Props> = ({ games }) => {
  const p1Percentage = (games.filter((game: Game) => (game.winner.player === 1)).length / games.length * 100);
  const p2Percentage = (games.filter((game: Game) => (game.winner.player === 2)).length / games.length * 100);
  const dMatches = games.filter((game: Game) => game.winner.player === 0).length;
  const dPercentage = dMatches / games.length * 100;

  const minGames = BEST_OF + dMatches;
  const all = new Array(minGames);

  for (let i = 0; i < all.length; i++) {
    all[i] = i;
  }

  const percentages = [
    [(p1Percentage || 0).toFixed(0), ((100 - p1Percentage - dPercentage) || 0).toFixed(0)],
    [(p2Percentage || 0).toFixed(0), ((100 - p2Percentage - dPercentage) || 0).toFixed(0)]
  ];

  const totalTime = (games.reduce((acc: number, curr: Game) => acc + Number(curr.time) || 0, 0));
  const { hours, minutes, seconds } = getDate(totalTime);

  return (
    <section className="stats">
      <h2>Awesome Statistics</h2>
      <p>All statistics in one place!</p>
      <div className="stats-info">
        <div>
          <h3>Game Victories %</h3>
          <div className="victories">
            {[0, 1].map((player: number) => (
              <div key={player}>
                <div>
                  <div className="player-label">
                    {`Player ${player + 1}`}
                  </div>
                  <div className="percentages">
                    {[0, 1].map((v: number) => (
                      <div key={v}>
                        <div className="percentage">
                          {percentages[player][v]}
                          %
                        </div>
                        <div>
                          <p className="v-label">
                            {v ? 'L' : 'V'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="matches">
          <h3>Played Matches</h3>
          <ul className="played-games">
            {all.map((n: number) => (
              <li key={n}>
                <div className={clsx({
                  completed: true,
                  'not-completed': n >= games.length
                })}
                />
              </li>
            ))}
          </ul>
          <h3>Game History</h3>
          <ul className="played-games">
            {all.map((n: number) => {
              let p = '';
              if (games[n]) {
                if (games[n].winner.player === 1) {
                  p = 'P1';
                } else if (games[n].winner.player === 2) {
                  p = 'P2';
                } else if (games[n].winner.player === 0) { p = 'D'; }
              }
              return (
                <li key={n}>
                  <div className="played-game">
                    {p}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div>
        <h3>Total Time</h3>
        <p>{`${hours}:${minutes}:${seconds}`}</p>
      </div>
    </section>
  );
};

export default Stats;

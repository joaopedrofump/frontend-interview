import clsx from 'clsx';
import React, { useMemo } from 'react';
import player2ImgCorrect from '../../../assets/images/O_bright.svg';
import player2Img from '../../../assets/images/O_dark.svg';
import player1ImgCorrect from '../../../assets/images/X_bright.svg';
import player1Img from '../../../assets/images/X_dark.svg';
import { Board as BoardModel, PositionFill, WinnerType } from '../model';
import './Board.css';

type Props = {
  board: BoardModel
  makeMove?: (x: number, y: number, prevPos: PositionFill) => void
  winner?: WinnerType
}

const Board: React.FC<Props> = ({ board, makeMove, winner }) => {
  const play = useMemo(() => (line: number, column: number, value: PositionFill) => () => {
    if (!makeMove) { return; }
    makeMove(line, column, value);
  }, [makeMove]);

  const onKeyUp = useMemo(
    () => (
      line: number,
      column: number,
      value: PositionFill
    ) => (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' && makeMove) {
        makeMove(line, column, value);
      }
    }, [makeMove]
  );

  return (
    <table className="table">
      <tbody className="boarder-body">
        {board.map((row: PositionFill[], line: number) => (
          <tr key={line} className="row">
            {
              row.map((value: PositionFill, column: number) => {
                let src;

                const lineCondition = winner?.type === 'h'
                  && line === winner?.index;
                const columnCondition = winner?.type === 'v'
                  && column === winner?.index;
                const diag1Condition = winner?.type === 'd'
                  && winner.index === 0
                  && line === column;
                const diag2Condition = winner?.type === 'd'
                  && winner.index === 1
                  && line === board.length - 1 - column;

                if (lineCondition || columnCondition || diag1Condition || diag2Condition) {
                  src = value === 1 ? player1ImgCorrect : player2ImgCorrect;
                } else {
                  src = value === 1 ? player1Img : player2Img;
                }

                return (
                  <td
                    key={column}
                    className="position"
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      onKeyUp={onKeyUp(line, column, value)}
                      onClick={play(line, column, value)}
                    >
                      {
                        value
                          ? (
                            <div style={{ width: '100%' }}>
                              <img
                                className="icon"
                                src={src}
                                alt={`player ${value} marker`}
                              />
                              {
                                winner ? (
                                  <div className={clsx(
                                    {
                                      'winner-h': lineCondition,
                                      'winner-v': columnCondition,
                                      'winner-d1': diag1Condition,
                                      'winner-d2': diag2Condition
                                    }
                                  )}
                                  />
                                )
                                  : null
                              }
                            </div>
                          )
                          : null
                      }
                    </div>
                  </td>
                );
              })
            }
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Board;

import { Board, PositionFill } from "./model";

export const createBoard = (size: number): Board => {
  const border: PositionFill[][] = new Array(size);
  for (let i = 0; i < border.length; i++) {
    border[i] = new Array<PositionFill>(size);
    border[i].fill(0);
  }

  return border;
};

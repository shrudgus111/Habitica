import { CELL_STATUS, Cell } from './types';

const dx = [-1, -1, -1, 0, 0, 1, 1, 1];
const dy = [-1, 0, 1, -1, 1, -1, 0, 1];

const setMines = (
  board: Cell[][],
  mines: number,
  firstClick: { row: number; column: number }
): Cell[][] => {
  const rows = board.length;
  const columns = board[0].length;
  let countMine = 0;

  while (countMine < mines) {
    const row = Math.floor(Math.random() * rows);
    const column = Math.floor(Math.random() * columns);
    if (
      (row === firstClick.row && column === firstClick.column) ||
      board[row][column].mine
    ) {
      continue;
    }

    board[row][column].mine = true;
    countMine++;
  }

  return board;
};

const getSurroundingMineCount = (
  board: Cell[][],
  row: number,
  column: number
): number => {
  const rows = board.length;
  const columns = board[0].length;
  let mineCount = 0;

  for (let i = 0; i < 8; i++) {
    const newRow = row + dx[i];
    const newColumn = column + dy[i];

    if (newRow < 0 || newRow >= rows || newColumn < 0 || newColumn >= columns) {
      continue;
    }

    if (board[newRow][newColumn].mine) {
      mineCount++;
    }
  }

  return mineCount;
};

const calculateCounts = (board: Cell[][]): Cell[][] => {
  const rows = board.length;
  const columns = board[0].length;

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      if (!board[row][column].mine) {
        board[row][column].count = getSurroundingMineCount(board, row, column);
      }
    }
  }

  return board;
};

export const setBoardMinesAndCounts = (
  clicked: { row: number; column: number },
  board: Cell[][],
  mines: number
): Cell[][] => {
  board = setMines(board, mines, clicked);
  board = calculateCounts(board);

  return board;
};

export const openEmptyCells = (
  board: Cell[][],
  pos: { row: number; column: number }
): Cell[][] => {
  const rows = board.length;
  const columns = board[0].length;
  const { row, column } = pos;

  const queue = [{ row, column }];

  while (queue.length) {
    const { row, column } = queue.shift()!;

    for (let i = 0; i < 8; i++) {
      const newRow = row + dx[i];
      const newColumn = column + dy[i];

      if (
        newRow < 0 ||
        newRow >= rows ||
        newColumn < 0 ||
        newColumn >= columns
      ) {
        continue;
      }

      if (board[newRow][newColumn].status === CELL_STATUS.HIDDEN) {
        board[newRow][newColumn].status = CELL_STATUS.VISIBLE;
        if (board[newRow][newColumn].count === 0) {
          queue.push({ row: newRow, column: newColumn });
        }
      }
    }
  }

  return board;
};

export const initializeBoard = (rows: number, columns: number): Cell[][] => {
  return Array.from({ length: rows }, () =>
    Array.from(
      { length: columns },
      () =>
        ({
          status: 'hidden',
          mine: false,
          count: 0,
        })!
    )
  );
};

export const openAllCells = (board: Cell[][]): Cell[][] => {
  board.forEach((row) => {
    row.forEach((cell) => {
      if (
        cell.status === CELL_STATUS.HIDDEN ||
        cell.status === CELL_STATUS.FLAGGED
      ) {
        cell.status = CELL_STATUS.VISIBLE;
      }
    });
  });
  return board;
};

export const checkWin = (board: Cell[][]): boolean => {
  let win = true;

  board.forEach((row) => {
    row.forEach((cell) => {
      if (!cell.mine && cell.status === CELL_STATUS.HIDDEN) {
        win = false;
      }
    });
  });

  return win;
};

export const isAreaOpenPossible = (
  board: Cell[][],
  count: number,
  { row, column }: { row: number; column: number }
): boolean => {
  const rows = board.length;
  const columns = board[0].length;
  let countFlag = 0;

  for (let i = 0; i < 8; i++) {
    const newRow = row + dx[i];
    const newColumn = column + dy[i];

    if (newRow < 0 || newRow >= rows || newColumn < 0 || newColumn >= columns) {
      continue;
    }

    if (board[newRow][newColumn].status === CELL_STATUS.FLAGGED) {
      countFlag++;
    }

    if (countFlag > count) {
      return false;
    }
  }

  return countFlag === count;
};

export const openSurroundingCells = (
  board: Cell[][],
  { row, column }: { row: number; column: number }
): boolean => {
  const rows = board.length;
  const columns = board[0].length;

  for (let i = 0; i < 8; i++) {
    const newRow = row + dx[i];
    const newColumn = column + dy[i];

    if (newRow < 0 || newRow >= rows || newColumn < 0 || newColumn >= columns) {
      continue;
    }

    if (board[newRow][newColumn].status === CELL_STATUS.HIDDEN) {
      if (board[newRow][newColumn].mine) {
        return false;
      }
      board[newRow][newColumn].status = CELL_STATUS.VISIBLE;
    }
  }

  return true;
};

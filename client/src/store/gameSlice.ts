import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CELL_STATUS,
  GAME_STATUS,
  GameState,
  GameStatus,
  LEVELS,
} from '../types';
import {
  setBoardMinesAndCounts,
  initializeBoard,
  checkWin,
  openEmptyCells,
  isAreaOpenPossible,
  openAllCells,
  openSurroundingCells,
} from '../utils';

const lsStorageGameLevel = localStorage.getItem('gameLevel');
const initialGameLevel = lsStorageGameLevel
  ? JSON.parse(lsStorageGameLevel)
  : {
      level: LEVELS.BEGINNER,
      rows: 8,
      columns: 8,
      mines: 10,
    };

const initialState: GameState = {
  board: initializeBoard(initialGameLevel.rows, initialGameLevel.columns),
  gameStatus: GAME_STATUS.IDLE,
  gameLevel: initialGameLevel,
};
const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    resetGame: (
      state: GameState,
      action: PayloadAction<{
        level: string;
        rows?: number;
        columns?: number;
        mines?: number;
      }>
    ) => {
      const { level, rows, columns, mines } = action.payload;
      switch (level) {
        case LEVELS.BEGINNER:
          state.board = initializeBoard(8, 8);
          state.gameLevel = {
            level: LEVELS.BEGINNER,
            rows: 8,
            columns: 8,
            mines: 10,
          };
          break;
        case LEVELS.INTERMEDIATE:
          state.board = initializeBoard(16, 16);
          state.gameLevel = {
            level: LEVELS.INTERMEDIATE,
            rows: 16,
            columns: 16,
            mines: 40,
          };
          break;
        case LEVELS.EXPERT:
          state.board = initializeBoard(16, 32);
          state.gameLevel = {
            level: LEVELS.EXPERT,
            rows: 16,
            columns: 32,
            mines: 100,
          };
          break;
        case LEVELS.CUSTOM:
          state.board = initializeBoard(rows!, columns!);
          state.gameLevel = {
            level: LEVELS.CUSTOM,
            rows: rows!,
            columns: columns!,
            mines: mines!,
          };
          break;
      }
      state.gameStatus = GAME_STATUS.IDLE;
      localStorage.setItem('gameLevel', JSON.stringify(state.gameLevel));
    },
    startGame: (
      state,
      action: PayloadAction<{
        row: number;
        column: number;
      }>
    ) => {
      const { row, column } = action.payload;
      state.board = setBoardMinesAndCounts(
        { row, column },
        state.board,
        state.gameLevel.mines
      );
      state.gameStatus = GAME_STATUS.RUNNING;
      state.board[row][column].status = CELL_STATUS.VISIBLE;

      if (state.board[row][column].count === 0) {
        state.board = openEmptyCells(state.board, { row, column });
      }

      if (checkWin(state.board)) {
        state.gameStatus = GAME_STATUS.WON;
      }
    },
    openCell: (
      state,
      action: PayloadAction<{ row: number; column: number }>
    ) => {
      const { row, column } = action.payload;
      const cell = state.board[row][column];

      if (
        state.gameStatus !== GAME_STATUS.RUNNING ||
        cell.status === CELL_STATUS.VISIBLE ||
        cell.status === CELL_STATUS.FLAGGED
      ) {
        return;
      }

      if (cell.mine) {
        state.gameStatus = GAME_STATUS.LOST;
        openAllCells(state.board);
        return;
      }

      state.board[row][column].status = CELL_STATUS.VISIBLE;
      if (state.board[row][column].count === 0) {
        state.board = openEmptyCells(state.board, { row, column });
      }

      if (checkWin(state.board)) {
        state.gameStatus = GAME_STATUS.WON;
      }
    },
    setGameStatus: (state: GameState, action: PayloadAction<GameStatus>) => {
      state.gameStatus = action.payload;
    },
    toggleFlag: (
      state: GameState,
      action: PayloadAction<{ row: number; column: number }>
    ) => {
      const { row, column } = action.payload;
      const cell = state.board[row][column];

      if (cell.status === CELL_STATUS.VISIBLE) {
        return;
      }

      cell.status =
        cell.status === CELL_STATUS.FLAGGED
          ? CELL_STATUS.HIDDEN
          : CELL_STATUS.FLAGGED;
    },
    areaOpen(
      state: GameState,
      action: PayloadAction<{ row: number; column: number }>
    ) {
      const { row, column } = action.payload;
      const cell = state.board[row][column];

      if (cell.status !== CELL_STATUS.VISIBLE && cell.count === 0) {
        return;
      }

      if (!isAreaOpenPossible(state.board, cell.count, { row, column })) {
        return;
      }

      if (!openSurroundingCells(state.board, { row, column })) {
        // area open 중 지뢰가 오픈된 경우
        state.gameStatus = GAME_STATUS.LOST;
        openAllCells(state.board);
        return;
      }

      if (checkWin(state.board)) {
        state.gameStatus = GAME_STATUS.WON;
      }
    },
  },
});

export const {
  resetGame,
  startGame,
  openCell,
  setGameStatus,
  toggleFlag,
  areaOpen,
} = gameSlice.actions;

export default gameSlice.reducer;

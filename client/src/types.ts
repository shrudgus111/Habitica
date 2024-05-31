export const CELL_STATUS = {
  HIDDEN: 'hidden',
  VISIBLE: 'visible',
  FLAGGED: 'flagged',
  UNKNOWN: 'unknown',
} as const;

export const GAME_STATUS = {
  IDLE: 'idle',
  RUNNING: 'running',
  WON: 'won',
  LOST: 'lost',
} as const;

export const LEVELS = {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'INTERMEDIATE',
  EXPERT: 'EXPERT',
  CUSTOM: 'CUSTOM',
} as const;

export type CellStatus = (typeof CELL_STATUS)[keyof typeof CELL_STATUS];
export type GameStatus = (typeof GAME_STATUS)[keyof typeof GAME_STATUS];
export type Levels = (typeof LEVELS)[keyof typeof LEVELS];

export interface Cell {
  status: CellStatus;
  mine: boolean;
  count: number;
}

export interface GameLevel {
  level: Levels;
  rows: number;
  columns: number;
  mines: number;
}

export interface GameState {
  board: Cell[][];
  gameStatus: GameStatus;
  gameLevel: GameLevel;
}

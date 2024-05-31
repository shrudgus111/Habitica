import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/useAppSelector';
import { areaOpen, openCell, startGame, toggleFlag } from '@/store/gameSlice';
import { CELL_STATUS, CellStatus, GAME_STATUS } from '@/types';
import * as C from './Cell.styles';

interface ICellProps {
  row: number;
  column: number;
  status: CellStatus;
  mine: boolean;
  count: number;
}

const Cell = ({ row, column, status, mine, count }: ICellProps) => {
  const [mouseDown, setMouseDown] = useState(0);
  const dispatch = useDispatch();
  const gameStatus = useAppSelector((state) => state.game.gameStatus);

  const handleClick = () => {
    if (gameStatus === GAME_STATUS.IDLE) {
      dispatch(startGame({ row, column }));
    } else {
      dispatch(openCell({ row, column }));
    }
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(toggleFlag({ row, column }));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setMouseDown(e.buttons);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (mouseDown === 3) {
      dispatch(areaOpen({ row, column }));
    }
    setMouseDown(e.buttons);
  };

  // 아레아오픈 로직
  // 1. 오픈된 셀 중 숫자인 셀만 클릭 가능
  // 2. 주변 깃발의 수와 숫자가 같으면 주변 셀 오픈
  // 8방향을 탐색 하면서 깃발 수가 숫자와 같은지 확인한다.
  // 같으면 닫혀있는 셀들을 모두 오픈 한다.
  // 3. 주변 깃발의 수와 숫자가 다르면 무시
  // 4. 오픈 시 지뢰가 있으면 게임 패배 처리

  return (
    <C.Cell
      $isOpen={status === CELL_STATUS.VISIBLE}
      $isMine={mine}
      onClick={handleClick}
      onContextMenu={handleRightClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {status === CELL_STATUS.FLAGGED && '🚩'}
      {status === CELL_STATUS.VISIBLE && mine && '💣'}
      {status === CELL_STATUS.VISIBLE && count > 0 && count}
    </C.Cell>
  );
};

export default React.memo(Cell);

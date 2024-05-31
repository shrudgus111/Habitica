import { Cell as CellType } from '@/types';
import Cell from '../Cell';
import * as R from './Row.styles';
import React from 'react';

interface IRowProps {
  row: CellType[];
  rowIndex: number;
}

const Row = ({ row, rowIndex }: IRowProps) => {
  return (
    <R.Row key={rowIndex}>
      {row.map((cell, columnIndex) => (
        <Cell
          key={`${rowIndex}-${columnIndex}`}
          row={rowIndex}
          column={columnIndex}
          status={cell.status}
          mine={cell.mine}
          count={cell.count}
        />
      ))}
    </R.Row>
  );
};

export default React.memo(Row);

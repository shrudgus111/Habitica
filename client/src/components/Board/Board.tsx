import { useAppSelector } from '@hooks/useAppSelector';
import * as B from './Board.styles';
import Row from '../Row';

function Board() {
  const board = useAppSelector((state) => state.game.board);

  return (
    <B.Container>
      {board.map((row, i) => (
        <Row key={i} row={row} rowIndex={i} />
      ))}
    </B.Container>
  );
}

export default Board;

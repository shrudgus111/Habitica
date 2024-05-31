import { useState, useEffect } from 'react';
import * as M from './Modal.styles';

interface IModalProps {
  close: () => void;
  handleCustomLevel: ({
    rows,
    columns,
    mines,
  }: {
    rows: number;
    columns: number;
    mines: number;
  }) => void;
}

function Modal({ close, handleCustomLevel }: IModalProps) {
  const [rows, setRows] = useState(8);
  const [columns, setColumns] = useState(8);
  const [mines, setMines] = useState(10);
  const [isError, setIsError] = useState(false);

  const handleChangeRow = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setRows(value);
  };

  const handleChangeColumn = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setColumns(value);
  };

  const handleChangeMine = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMines(value);
  };

  const handleComplete = () => {
    close();
    handleCustomLevel({ rows, columns, mines });
  };

  useEffect(() => {
    if (
      rows < 8 ||
      rows > 100 ||
      columns < 8 ||
      columns > 100 ||
      mines > (rows * columns) / 3
    ) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [rows, columns, mines]);

  return (
    <M.Background onClick={close}>
      <M.Card onClick={(e) => e.stopPropagation()}>
        <M.TitleContainer>
          <h2>직접 설정</h2>
          <h3>최소 8 x 8, 최대 100 x 100 이며,</h3>
          <h3>지뢰수는 격자칸 수의 1/3 이하로 설정 가능합니다.</h3>
        </M.TitleContainer>
        <M.ContentsContainer>
          <div className="input-container">
            <span>행:</span>
            <input type="number" value={rows} onChange={handleChangeRow} />
          </div>
          <div className="input-container">
            <span>열:</span>
            <input
              type="number"
              value={columns}
              onChange={handleChangeColumn}
            />
          </div>
          <div className="input-container">
            <span>지뢰 갯수:</span>
            <input type="number" value={mines} onChange={handleChangeMine} />
          </div>
          <M.Button
            onClick={handleComplete}
            $isDisabled={isError}
            disabled={isError}
          >
            완료
          </M.Button>
        </M.ContentsContainer>
      </M.Card>
    </M.Background>
  );
}

export default Modal;

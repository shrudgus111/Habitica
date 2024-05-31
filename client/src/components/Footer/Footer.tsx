import { useDispatch } from 'react-redux';
import * as F from './Footer.styles';
import { resetGame } from '@store/gameSlice';
import { LEVELS } from '@/types';
import Modal from './Modal';
import { useModal } from '@hooks/useModal';

// - Beginner (8X8) 지뢰 10개, Intermediate (16X16) 지뢰 40개, Expert (32X16) 지뢰 100개
// - Custom (가로, 세로, 지뢰 수 조정 가능)
//     - 설정 가능한 가로, 세로는 최대 100 x 100이며, 지뢰수는 격자칸 수의 1/3 이하로 설정 가능합니다.

function Footer() {
  const { isOpen, open, close } = useModal();
  const dispatch = useDispatch();

  const handleChangeLevel = (level: string) => {
    dispatch(resetGame({ level }));
  };

  const handleCustomLevel = ({
    rows,
    columns,
    mines,
  }: {
    rows: number;
    columns: number;
    mines: number;
  }) => {
    dispatch(resetGame({ level: LEVELS.CUSTOM, rows, columns, mines }));
  };

  return (
    <F.Container>
      <h3 className="title">난이도 설정</h3>
      <F.ButtonContainer>
        <button
          className="beginner-btn"
          onClick={() => handleChangeLevel(LEVELS.BEGINNER)}
        >
          초보자
        </button>
        <button
          className="intermediate-btn"
          onClick={() => handleChangeLevel(LEVELS.INTERMEDIATE)}
        >
          중급자
        </button>
        <button
          className="expert-btn"
          onClick={() => handleChangeLevel(LEVELS.EXPERT)}
        >
          전문가
        </button>
        <button className="custom-btn" onClick={open}>
          직접 설정
        </button>
      </F.ButtonContainer>
      {isOpen && <Modal close={close} handleCustomLevel={handleCustomLevel} />}
    </F.Container>
  );
}

export default Footer;

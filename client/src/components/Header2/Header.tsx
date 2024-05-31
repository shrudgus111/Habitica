import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@hooks/useAppSelector';
import * as H from './Header.styles';
import { resetGame } from '@store/gameSlice';
import { GAME_STATUS, LEVELS } from '@/types';

function Header() {
  const [timer, setTimer] = useState(0);
  const { level, rows, columns, mines } = useAppSelector(
    (state) => state.game.gameLevel
  );
  const gameStatus = useAppSelector((state) => state.game.gameStatus);
  const dispatch = useDispatch();

  const handleResetGame = () => {
    if (gameStatus === GAME_STATUS.IDLE) {
      return;
    }

    if (level === LEVELS.CUSTOM) {
      dispatch(resetGame({ level, rows, columns, mines }));
    } else {
      dispatch(resetGame({ level }));
    }
  };

  const getEmoji = () => {
    switch (gameStatus) {
      case GAME_STATUS.IDLE:
      case GAME_STATUS.RUNNING:
        return '😐';
      case GAME_STATUS.LOST:
        return '😵';
      case GAME_STATUS.WON:
        return '🤩';
    }
  };

  useEffect(() => {
    let interval: number | undefined;
    if (gameStatus === GAME_STATUS.RUNNING) {
      interval = window.setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (gameStatus === GAME_STATUS.IDLE) {
      setTimer(0);
    }

    return () => clearInterval(interval);
  }, [gameStatus, timer]);

  return (
    <H.Container>
      <button className="reset-button" onClick={handleResetGame}>
        {getEmoji()}
      </button>
      <div className="timer">진행 시간: {String(timer).padStart(3, '0')}</div>
    </H.Container>
  );
}

export default Header;

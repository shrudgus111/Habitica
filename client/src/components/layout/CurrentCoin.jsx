import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const CurrentCoinBlock = styled.section`
  ul {
    padding: 16px 0;
    li {
      gap: 8px;
      &.TA_Right {
        .coin {
          width: 20px;
        }
      }
    }
  }
`;

const CurrentCoin = ({ avatarInfo }) => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <CurrentCoinBlock className="currentCoin">
      <ul className="DefaultWidth FL_SB">
        <li className="TA_Left FontMenuTitle FL_Center">
          <span>{t('msn8')}</span>
          <span>{avatarInfo.level}</span>
        </li>
        <li className="TA_Right FontBody FL_Center">
          <span className="coin">
            <img src="../src/assets/image/coin.svg" alt="코인" />
          </span>
          <span>{avatarInfo.coin}</span>
        </li>
      </ul>
    </CurrentCoinBlock>
  );
};

export default CurrentCoin;

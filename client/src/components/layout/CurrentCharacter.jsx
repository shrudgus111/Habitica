import React from 'react';
import styled from 'styled-components';
import AvatarImage from '../Avatar/AvatarImage';

const CurrentCharacterBlock = styled.section`
  padding: 16px 0;
  ul.DefaultWidth {
    gap: 24px;
    li {
      &.TA_Left {
        width: 30%;
        max-width: 200px;
        border: 2px solid var(--main-color);
        background-color: var(--main-hover);
        aspect-ratio: 1/1;
      }
      &.TA_Right {
        width: 70%;
        display: flex;
        gap: 16px;
        flex-direction: column;
      }
    }
  }
`;

const BarSection = styled.ul`
  display: flex;
  gap: 8px;
  li {
    &.iconBox {
      width: 24px;
    }
    &.contentBox {
      flex: 1;
      flex-wrap: wrap;
      gap: 4px;
      .bar {
        width: 100%;
        height: 10px;
        overflow: hidden;
        background-color: var(--gray-color);
        border-radius: 4px;
        position: relative;
        .current {
          position: absolute;
          inset: 0;
          height: 100%;
          background-color: var(--main-color);
          border-radius: 10px;
          transition: all 0.3s;
        }
      }
    }
  }
`;

const CurrentCharacter = ({ avatarInfo, onClickAvatar }) => {
  const health = avatarInfo.health;
  const currentHealth = avatarInfo.currentHealth;

  const exp = avatarInfo.exp;
  const currentExp = avatarInfo.currentExp;

  return (
    <CurrentCharacterBlock>
      <ul className="DefaultWidth FL_SB">
        <li className="TA_Left cursorPointer" onClick={onClickAvatar}>
          <AvatarImage avatarInfo={avatarInfo} />
        </li>
        <li className="TA_Right">
          <BarSection>
            <li className="iconBox">
              <img src="assets/image/health.svg" alt="체력" />
            </li>
            <li className="contentBox FL_Center FL_SB">
              <div className="bar">
                <span
                  className="current"
                  style={{ width: `${(currentHealth / health) * 100}%` }}
                ></span>
              </div>
              <span className="FontSub">
                {currentHealth}/{avatarInfo.health}
              </span>
              <span className="FontSub">체력</span>
            </li>
          </BarSection>
          <BarSection>
            <li className="iconBox">
              <img src="assets/image/exp.svg" alt="경험치" />
            </li>
            <li className="contentBox FL_Center FL_SB">
              <div className="bar">
                <span
                  className="current"
                  style={{ width: `${(currentExp / exp) * 100}%` }}
                ></span>
              </div>
              <span className="FontSub">
                {currentExp}/{exp}
              </span>
              <span className="FontSub">경험치</span>
            </li>
          </BarSection>
        </li>
      </ul>
    </CurrentCharacterBlock>
  );
};

export default CurrentCharacter;

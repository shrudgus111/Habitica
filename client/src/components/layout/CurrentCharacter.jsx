import React from "react";
import styled from "styled-components";

const CurrentCharacterBlock = styled.section`
  padding: 16px 0;
  ul.DefaultWidth {
    gap: 24px;
    li {
      &.TA_Left {
        width: 40%;
        max-width: 200px;
        border: 2px solid var(--main-color);
        background-color: var(--main-hover);
        aspect-ratio: 1/1;
      }
      &.TA_Right {
        width: 60%;
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

const CurrentCharacter = () => {
  const characterHEM = [
    {
      title: "체력",
      icon: "../src/assets/image/health.svg",
      all: 10,
      current: 5,
    },
    {
      title: "경험치",
      icon: "../src/assets/image/exp.svg",
      all: 10,
      current: 8,
    },
    {
      title: "마나",
      icon: "../src/assets/image/coin.svg",
      all: 10,
      current: 5,
    },
  ];
  return (
    <CurrentCharacterBlock>
      <ul className="DefaultWidth FL_SB">
        <li className="TA_Left"></li>
        <li className="TA_Right">
          {characterHEM.map((item, index) => (
            <BarSection key={index}>
              <li className="iconBox">
                <img src={item.icon} alt={item.title} />
              </li>
              <li className="contentBox FL_Center FL_SB">
                <div className="bar">
                  <span
                    className="current"
                    style={{ width: `${(item.current / item.all) * 100}%` }}
                  ></span>
                </div>
                <span className="FontSub">
                  {item.current}/{item.all}
                </span>
                <span className="FontSub">{item.title}</span>
              </li>
            </BarSection>
          ))}
        </li>
      </ul>
    </CurrentCharacterBlock>
  );
};

export default CurrentCharacter;

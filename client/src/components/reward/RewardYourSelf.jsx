import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initCosts } from "@/store/product";
import styled from "styled-components";

const RewardYourSelfBlock = styled.section`
  background-color: whitesmoke;
  margin-bottom: 24px;
  border-radius: 8px;
  overflow: hidden;
  li {
    &.TA_Left {
      padding: 16px;
    }
    &.TA_Right {
      background-color: var(--gray-hover);
      flex-basis: 10%;
      button {
        padding: 16px;
        gap: 8px;
        box-sizing: border-box;
        width: 100%;
        .icon {
          width: 20px;
        }
      }
    }
  }
`;

const RewardYourSelf = ({ onBuy }) => {
  const dispatch = useDispatch();
  const onClickBuy = (e) => {
    const button = e.currentTarget;
    const cost = button.querySelector(".price").textContent;
    // dispatch(initCosts(cost));
    onBuy(cost);
  };

  return (
    <RewardYourSelfBlock>
      <ul className="FL_SB FL_Center">
        <li className="TA_Left">
          <h3 className="title FontMenuTitle">스스로에게 보상을 주세요!</h3>
          <p className="content FontSub">
            TV를 보거나, 게임을 하거나, 간식을 먹거나, 마음대로 하세요!
          </p>
        </li>
        <li className="TA_Right">
          <button
            type="button"
            className="FL_Column FL_Center"
            onClick={(e) => onClickBuy(e)}
          >
            <span className="icon">
              <img src="../src/assets/image/coin.svg" alt="코인" />
            </span>
            <span className="FontMenuTitle price">20</span>
          </button>
        </li>
      </ul>
    </RewardYourSelfBlock>
  );
};

export default RewardYourSelf;

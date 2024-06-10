import React from 'react';
import styled from 'styled-components';

const RewardButtonBlock = styled.section`
  position: sticky;
  bottom: 0;
  border-top: 1px solid var(--gray-hover);
  padding: 8px 0;
  button {
    padding: 8px 16px;
    border-radius: 8px;
    &.close {
      background-color: var(--gray-color);
      transition: all 0.3s;
      &:hover {
        background-color: var(--gray-hover);
      }
    }
    &.buy {
      background-color: var(--main-color);
      color: white;
      transition: all 0.3s;
      gap: 8px;
      &:hover {
        background-color: var(--main-hover);
      }
    }
  }
`;

const RewardButton = ({ onClickModal, selectedReward, onBuy }) => {
  const onClickClose = () => onClickModal();
  const handleBuyClick = () => {
    onClickClose();
    onBuy(selectedReward);
  };
  return (
    <RewardButtonBlock className="FL_SB DefaultWidth">
      <button className="close FontBody" onClick={onClickClose}>
        닫기
      </button>
      <button className="buy FontMenuTitle FL_Center" onClick={handleBuyClick}>
        <img src="assets/image/coin.svg" alt="코인" className="coinIcon" />
        <span>{selectedReward} 구매</span>
      </button>
    </RewardButtonBlock>
  );
};

export default RewardButton;

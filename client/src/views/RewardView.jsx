import React from "react";
import styled from "styled-components";
import RewardYourSelf from "@/components/reward/RewardYourSelf";

const RewardBoxWrap = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 16px;
  li {
    background-color: whitesmoke;
    border-radius: 8px;
    overflow: hidden;
    .imageBox {
      aspect-ratio: 1/1;
      img {
        width: 40%;
      }
    }
    .contentBox {
      padding: 8px 0;
      background-color: var(--gray-hover);
      gap: 8px;
      .icon {
        width: 16px;
      }
    }
  }
`;

const RewardView = () => {
  const rewardList = [
    { title: "포션", price: 25, img: "../src/assets/image/coin.svg" },
    { title: "상자", price: 100, img: "../src/assets/image/coin.svg" },
    { title: "칼", price: 20, img: "../src/assets/image/coin.svg" },
    { title: "갑옷", price: 30, img: "../src/assets/image/coin.svg" },
    { title: "투구", price: 25, img: "../src/assets/image/coin.svg" },
    { title: "나무방패", price: 20, img: "../src/assets/image/coin.svg" },
  ];
  return (
    <section className="DefaultWidth">
      <RewardYourSelf />
      <RewardBoxWrap className="">
        {rewardList.map((reward, index) => (
          <li key={index} className="FL_Column">
            <div className="imageBox FL_CSB">
              <img src={reward.img} alt={reward.title} />
            </div>
            <div className="contentBox FL_CSB FontMenuTitle">
              <span className="icon">
                <img src="../src/assets/image/coin.svg" alt="코인" />
              </span>
              <span>{reward.price}</span>
            </div>
          </li>
        ))}
      </RewardBoxWrap>
    </section>
  );
};

export default RewardView;

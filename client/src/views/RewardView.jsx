import React, { useState } from "react";
import styled from "styled-components";
import RewardYourSelf from "@/components/reward/RewardYourSelf";
import RewardModal from "@/components/reward/RewardModal";

const RewardBoxWrap = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 16px;
  li {
    background-color: whitesmoke;
    cursor: pointer;
    border-radius: 8px;
    overflow: hidden;
    .imageBox {
      aspect-ratio: 1/1;
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
    {
      title: "포션",
      price: 25,
      img: "../src/assets/image/shop_potion.png",
      description: "체력이 15 회복됩니다 (구매 즉시 적용)",
    },
    {
      title: "나무상자",
      price: 100,
      img: "../src/assets/image/shop_armoire.png",
      description: "간단하게 설명 내용을 적을 수 있다",
    },
    {
      title: "검",
      price: 20,
      img: "../src/assets/image/shop_weapon_warrior_1.png",
      description: "평범한 전사의 검. 힘이 3 증가한다.",
      stats: [
        { keyword: "STR", title: "힘", value: 3 },
        { keyword: "PER", title: "??", value: 0 },
        { keyword: "CON", title: "건강", value: 0 },
        { keyword: "INT", title: "지혜", value: 0 },
      ],
    },
    {
      title: "가죽 갑옷",
      price: 30,
      img: "../src/assets/image/shop_armor_warrior_1.png",
      description: "짐승 가죽으로 만튼 튼튼한 가죽 갑옷. 건강이 3 증가한다",
      stats: [
        { keyword: "STR", title: "힘", value: 0 },
        { keyword: "PER", title: "??", value: 0 },
        { keyword: "CON", title: "건강", value: 3 },
        { keyword: "INT", title: "지혜", value: 0 },
      ],
    },
    {
      title: "투구",
      price: 25,
      img: "../src/assets/image/shop_head_warrior_2.png",
      description: "금속 체인으로 만들어진 체인 투구. 근력이 4 증가한다.",
      stats: [
        { keyword: "STR", title: "힘", value: 4 },
        { keyword: "PER", title: "??", value: 0 },
        { keyword: "CON", title: "건강", value: 0 },
        { keyword: "INT", title: "지혜", value: 0 },
      ],
    },
    {
      title: "나무방패",
      price: 20,
      img: "../src/assets/image/shop_shield_warrior_1.png",
      description: "두꺼운 나무로 만든 나무 방패. 건강이 2 증가한다.",
      stats: [
        { keyword: "STR", title: "힘", value: 0 },
        { keyword: "PER", title: "??", value: 0 },
        { keyword: "CON", title: "건강", value: 2 },
        { keyword: "INT", title: "지혜", value: 0 },
      ],
    },
  ];

  const [modal, setModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);

  const onClickReward = (reward) => {
    setSelectedReward(reward);
    setModal(true);
  };
  const onClickModal = () => setModal(false);

  return (
    <section>
      <RewardYourSelf />
      <RewardBoxWrap>
        {rewardList.map((reward, index) => (
          <li
            key={index}
            className="FL_Column"
            onClick={() => onClickReward(reward)}
          >
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
      <RewardModal
        modal={modal}
        onClickModal={onClickModal}
        selectedReward={selectedReward}
      />
    </section>
  );
};

export default RewardView;

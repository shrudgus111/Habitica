import React from "react";
import styled from "styled-components";
import CurrentCoin from "../layout/CurrentCoin";
import RewardButton from "./RewardButton";

const Modal = styled.article`
  position: fixed;
  background-color: white;
  z-index: 4;
  visibility: hidden;
  transition: all 0.3s;
  inset: 36%;
  border-radius: 8px;
  overflow: hidden;
  opacity: 0;
  .currentCoin {
    background-color: whitesmoke;
  }
  .RewardSection {
    gap: 8px;
    padding: 16px 0;
    .icon {
      width: max-content;
    }
    .stats {
      .active {
        color: var(--green-color);
        font-weight: 800;
      }
    }
  }

  &.active {
    visibility: visible;
    inset: 32% 16%;
    opacity: 1;
  }
`;

const ModalBack = styled.div`
  position: fixed;
  inset: 0;
  background-color: var(--main-color);
  z-index: 3;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s;
  &.active {
    visibility: visible;
    opacity: 0.9;
  }
`;

const RewardModal = ({ modal, onClickModal, selectedReward }) => {
  return (
    <>
      <Modal className={`FL_Column ${modal && "active"}`}>
        {modal && (
          <>
            <CurrentCoin />
            <div
              style={{ flex: 1 }}
              className="DefaultWidth G_PCC RewardSection"
            >
              <img
                src={selectedReward.img}
                alt={selectedReward.title}
                className="icon"
              />
              <h3 className="FontTitle">{selectedReward.title}</h3>
              <p className="FontSub TA_Center">{selectedReward.description}</p>
              <ul className="stats FontSub FL_SB G8px">
                {selectedReward.stats &&
                  selectedReward.stats.map((item, index) => (
                    <li key={index} className={item.value > 0 && "active"}>
                      <span>{item.title}: </span>
                      <span>
                        {item.value > 0 && "+"}
                        {item.value}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
            <RewardButton
              onClickModal={onClickModal}
              selectedReward={selectedReward.price}
            />
          </>
        )}
      </Modal>
      <ModalBack
        className={`modalBack ${modal ? "active" : ""}`}
        onClick={onClickModal}
      ></ModalBack>
    </>
  );
};

export default RewardModal;

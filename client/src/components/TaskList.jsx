import React from "react";
import styled from "styled-components";
import { FaPlus, FaMinus, FaCheck } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const ListBox = styled.ul`
  display: grid;
  grid-template-columns: auto 1fr auto;
  background-color: whitesmoke;
  gap: 16px;
  border-radius: 10px;
  overflow: hidden;
  li {
    &.TA_Left,
    &.TA_Right {
      button {
        display: block;
        height: 100%;
        padding: 0 16px;
        p {
          border: 2px solid whitesmoke;
          background-color: whitesmoke;
          border-radius: 50%;
          width: 20px;
          height: 20px;

          svg {
            color: gray;
          }
        }
      }
    }
    &.TA_Left {
      button.active {
        background-color: gray;
        transition: all 0.3s;
        &:hover {
        }
      }
    }
    &.TA_Right {
      button.active {
        background-color: gray;
        transition: all 0.3s;
      }
    }

    &.TA_Center {
      align-items: flex-start;
      padding: 16px 0;
      .title {
        font-size: 16px;
      }
      .content {
        font-size: 14px;
      }
      .count {
        font-size: 12px;
        width: 100%;
      }
    }
  }
`;

const NoListBox = styled.div`
  color: gray;
  background-color: whitesmoke;
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: var(--gray-hover);
  }
  & > * {
    &.icon {
      margin-bottom: 16px;
      svg {
        width: 40px;
        height: 40px;
      }
    }
    padding: 4px;
  }
`;

const TaskList = ({ list, category }) => {
  return (
    <>
      {list.length > 0 ? (
        list.map((item, index) => (
          <ListBox className="listBox" key={index}>
            <li className="TA_Left">
              <button
                type="button"
                className={item.controlsPositive && "active"}
              >
                <p className="FL_CSB">
                  {category == "habit" ? (
                    <FaPlus />
                  ) : category == "daily" ? (
                    <span className="dailyCheck">
                      <FaCheck />
                    </span>
                  ) : (
                    <></>
                  )}
                </p>
              </button>
            </li>
            <li className="TA_Center FL_Column FontBody">
              <h3 className="title">{item.title}</h3>
              <p className="content">{item.content}</p>
              <p className="count FontSub TA_Right">
                {item.CountCP} {item.CountCN}
              </p>
            </li>
            <li className="TA_Right FL_CSB">
              <button
                type="button"
                className={item.controlsNegative && "active"}
              >
                <p className="FL_CSB">
                  {category == "habit" ? <FaMinus /> : <></>}
                </p>
              </button>
            </li>
          </ListBox>
        ))
      ) : (
        <NoListBox className="noListBox FL_Column FL_Center">
          <div className="icon">
            <IoMdCheckmarkCircleOutline />
          </div>
          <h3 className="title FontTitle">리스트가 비어 있습니다!</h3>
          <p className="content FontBody">
            하단의 버튼 또는 이곳을 눌러 할 일을 추가하세요
          </p>
        </NoListBox>
      )}
    </>
  );
};

export default TaskList;

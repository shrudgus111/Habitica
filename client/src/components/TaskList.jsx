import React from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa6";
import { BsPlusCircle } from "react-icons/bs";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { BiMinusCircle } from "react-icons/bi";
import { BiSolidMinusCircle } from "react-icons/bi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

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
        cursor: default;
        .able {
          cursor: pointer;
        }
        p {
          width: 30px;
          height: 30px;
          svg {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    &.TA_Left {
      button.active {
        background-color: var(--yellow-color);
        transition: all 0.3s;
        .able {
          color: var(--yellow-hover);
          background-color: white;
          border-radius: 50%;
          outline: 2px solid var(--yellow-color);
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
        justify-content: flex-end;
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

const TaskList = ({ list, category, onClickCount, onClickCreate }) => {
  return (
    <>
      {list.length > 0 ? (
        list.map((item, index) => (
          <ListBox className="listBox" key={index}>
            <li className="TA_Left">
              <button
                type="button"
                className={(item.positive || item.checked) && "active"}
              >
                <p className="FL_CSB">
                  {category == "habit" ? (
                    item.positive ? (
                      <BsFillPlusCircleFill
                        className="able"
                        onClick={() => onClickCount(item.no, true)}
                      />
                    ) : (
                      <BsPlusCircle className="disable" />
                    )
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
              <p className="count FontSub TA_Right FL_Center">
                {item.CountP || item.CountN ? (
                  <>
                    <MdKeyboardDoubleArrowRight /> {item.CountP} | {item.CountN}
                  </>
                ) : (
                  ""
                )}
              </p>
            </li>
            <li className="TA_Right FL_CSB">
              <button type="button" className={item.negative && "active"}>
                <p className="FL_CSB">
                  {category == "habit" &&
                    (item.negative ? (
                      <BiSolidMinusCircle
                        className="able"
                        onClick={() => onClickCount(item.no, false)}
                      />
                    ) : (
                      <BiMinusCircle className="disable" />
                    ))}
                </p>
              </button>
            </li>
          </ListBox>
        ))
      ) : (
        <NoListBox
          className="noListBox FL_Column FL_Center"
          onClick={onClickCreate}
        >
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

import React from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa6";
import { BsCheckCircleFill, BsCheckCircle, BsCheckLg } from "react-icons/bs";
import { BsFillPlusCircleFill, BsPlusCircle } from "react-icons/bs";

const TaskListLeftBlock = styled.li`
  &.daily {
    background-color: var(--yellow-color);
    button {
      p {
        border-radius: 4px;
        background-color: rgba(255, 255, 255, 0.5);
        span {
          svg {
            color: transparent;
            transition: all 0.3s;
            &:hover {
              color: var(--yellow-hover);
            }
          }
        }
      }
    }
    &.todayDone {
      button.active {
        background-color: var(--gray-hover);
        p {
          span {
            cursor: not-allowed;
            svg {
              color: var(--gray-hover);
            }
          }
        }
      }
    }
  }

  &.todo {
    background-color: var(--yellow-color);
    button {
      p {
        border-radius: 4px;
        background-color: rgba(255, 255, 255, 0.5);
        span {
          svg {
            color: transparent;
            transition: all 0.3s;
            &:hover {
              color: var(--yellow-hover);
            }
          }
        }
      }
    }
  }
`;

const TaskListLeft = ({
  category,
  item,
  onClickCount,
  onClickChecked,
  onClickDone,
}) => {
  const today = new Date().toISOString().slice(0, 10);
  const canCheckToday = item.lastChecked !== today;
  const isDisabled = !canCheckToday || item.checked > 0;

  return (
    <TaskListLeftBlock
      className={`TA_Left ${category} ${item.checked > 0 ? "goodDaily" : ""} ${
        isDisabled && "todayDone"
      }`}
    >
      <button
        type="button"
        className={(item.positive || item.checked) && "active"}
      >
        <p className="FL_CSB">
          {category === "habit" ? (
            item.positive ? (
              <BsFillPlusCircleFill
                className="able"
                onClick={() => onClickCount(item.no, true)}
              />
            ) : (
              <BsPlusCircle className="disable" />
            )
          ) : category === "daily" ? (
            <span
              className="dailyCheck G_PCC cursorPointer"
              onClick={() =>
                item.checked === 0 && canCheckToday && onClickChecked(item.no)
              }
            >
              <BsCheckLg />
            </span>
          ) : category === "todo" ? (
            <span
              className="todoCheck G_PCC cursorPointer"
              onClick={() => onClickDone(item)}
            >
              <FaCheck />
            </span>
          ) : null}
        </p>
      </button>
    </TaskListLeftBlock>
  );
};

export default TaskListLeft;

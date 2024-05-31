import React from "react";
import styled from "styled-components";
import { FaPlus, FaMinus } from "react-icons/fa6";
import RewardView from "./RewardView";
import TaskPopUp from "@/components/layout/TaskPopUp";

const Section = styled.section`
  padding: 16px 0 40px;
`;

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
    }
  }
`;
const TaskView = ({ category }) => {
  const list = [
    {
      type: "habit",
      title: "습관의 제목입니다",
      content: "습관의 내용입니다",
      controlsPositive: true,
      controlsNegative: false,
      resetCounter: { daily: true, weekly: false, monthly: false },
      difficulty: { trivial: false, easy: true, medium: false, hard: false },
      tags: "work",
    },
    {
      type: "habit",
      title: "습관의 제목입니다",
      content: "습관의 내용입니다",
      controlsPositive: true,
      controlsNegative: true,
      resetCounter: { daily: true, weekly: false, monthly: false },
      difficulty: { trivial: false, easy: true, medium: false, hard: false },
      tags: "work",
    },
    {
      type: "habit",
      title: "습관의 제목입니다",
      content: "습관의 내용입니다",
      controlsPositive: false,
      controlsNegative: true,
      resetCounter: { daily: true, weekly: false, monthly: false },
      difficulty: { trivial: false, easy: true, medium: false, hard: false },
      tags: "work",
    },
    {
      type: "habit",
      title: "습관의 제목입니다",
      content: "습관의 내용입니다",
      controlsPositive: true,
      controlsNegative: false,
      resetCounter: { daily: true, weekly: false, monthly: false },
      difficulty: { trivial: false, easy: true, medium: false, hard: false },
      tags: "work",
    },
    {
      type: "habit",
      title: "습관의 제목입니다",
      content: "습관의 내용입니다",
      controlsPositive: true,
      controlsNegative: true,
      resetCounter: { daily: true, weekly: false, monthly: false },
      difficulty: { trivial: false, easy: true, medium: false, hard: false },
      tags: "work",
    },
    {
      type: "habit",
      title: "습관의 제목입니다",
      content: "습관의 내용입니다",
      controlsPositive: false,
      controlsNegative: true,
      resetCounter: { daily: true, weekly: false, monthly: false },
      difficulty: { trivial: false, easy: true, medium: false, hard: false },
      tags: "work",
    },
  ];

  const habitListMap = list.map((item, index) => (
    <ListBox className="listBox" key={index}>
      <li className="TA_Left">
        <button type="button" className={item.controlsPositive && "active"}>
          <p className="FL_CSB">
            <FaPlus />
          </p>
        </button>
      </li>
      <li className="TA_Center FL_Column FontBody">
        <h3 className="title">{item.title}</h3>
        <p className="content">{item.content}</p>
      </li>
      <li className="TA_Right FL_CSB">
        <button type="button" className={item.controlsNegative && "active"}>
          <p className="FL_CSB">
            <FaMinus />
          </p>
        </button>
      </li>
    </ListBox>
  ));

  return (
    <Section className="DefaultWidth FL_Column FL_1 G8px">
      {category === "habit" && habitListMap}
      {category === "daily" && <h1>daily</h1>}
      {category === "todo" && <h1>todo</h1>}
      {category === "reward" && <RewardView />}
      <TaskPopUp />
    </Section>
  );
};

export default TaskView;

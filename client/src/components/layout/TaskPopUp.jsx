import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const TaskPopUpBlock = styled.article`
  background-color: var(--main-color);
  width: fit-content;
  padding: 8px;
  border-radius: 8px;
  outline: 2px solid var(--main-hover);
  outline-style: ridge;
  z-index: 4;
  position: fixed;
  left: 50%;

  bottom: 16%;
  color: white;
  opacity: 0;
  visibility: hidden;
  transform: translateX(-50%) translateY(80%);
  transition: all 0.3s;
  &.active {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0%);
  }
`;

const TaskPopUp = () => {
  //   const cost = useSelector((state) => state.product.cost);
  return (
    <>
      {/* {cost !== null && (
        <TaskPopUpBlock className="FL_Center G8px FontSub active">
          <span>icon </span>
          <span>내용을 적을 예정입니다</span>
        </TaskPopUpBlock>
      )} */}
    </>
  );
};

export default TaskPopUp;

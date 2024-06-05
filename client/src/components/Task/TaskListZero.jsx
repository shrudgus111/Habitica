import React from "react";
import styled from "styled-components";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

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

const TaskListZero = ({ onClickCreate }) => {
  return (
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
  );
};

export default TaskListZero;

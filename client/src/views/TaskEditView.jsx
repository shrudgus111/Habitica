import React from "react";
import styled from "styled-components";
import TaskHeader from "@/components/Task/TaskHeader";

const TaskEdit = styled.article`
  border-radius: 8px;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 96%;
  transition: all 0.3s ease-in-out;
  z-index: 4;
  opacity: 0;
  transform: translateY(100%);
  &.active {
    transform: translateY(0);
    opacity: 1;
    box-shadow: 0px -10px 20px 40px rgba(0, 0, 0, 0.5);
  }
`;
const TaskEditView = ({ isEdit, category, onClickClose, fetchTaskList }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      content,
      positive,
      negative,
      resetCounter,
      difficulty,
      tag,
    };
  };
  return (
    <TaskEdit className={`FL_Column ${isEdit && "active"} `}>
      <TaskHeader
        onClickClose={onClickClose}
        handleSubmit={handleSubmit}
        category={category}
      />
    </TaskEdit>
  );
};

export default TaskEditView;

import React from "react";
import styled from "styled-components";

const Header = styled.header`
  padding: 16px 0;

  & > * {
    color: white;
  }
`;

const TaskHeader = ({ mode, category, onClickClose, handleSubmit }) => {
  return (
    <Header className={`DefaultWidth FL_SB `}>
      <button type="button" onClick={onClickClose} className="FontBody">
        닫기
      </button>
      <h3 className="FontMenuTitle">
        {mode == "create" ? (
          <>
            {category == "habit"
              ? "새로운 습관"
              : category == "daily"
              ? "새로운 일일과제"
              : category == "todo" && "새로운 할일"}
          </>
        ) : (
          <>
            {category == "habit"
              ? "습관 수정"
              : category == "daily"
              ? "일일과제 수정"
              : category == "todo" && "할일 수정"}
          </>
        )}
      </h3>
      <button type="submit" onClick={handleSubmit} className="FontBody">
        {mode == "create" ? "생성" : "저장"}
      </button>
    </Header>
  );
};

export default TaskHeader;

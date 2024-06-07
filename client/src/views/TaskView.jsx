import React, { useState } from "react";
import styled from "styled-components";
import RewardView from "./RewardView";
import TaskPopUp from "@/components/layout/TaskPopUp";
import TaskList from "@/components/Task/TaskList";

const Section = styled.section`
  padding: 16px 0 40px;
`;

const TaskView = ({
  category,
  list,
  onClickCount,
  onClickCreate,
  onClickEdit,
  onClickChecked,
  onClickDone,
}) => {
  const [cost, setCost] = useState();
  const [isActive, setIsActive] = useState(false);

  const showPopup = (cost) => {
    setCost(cost);
    setIsActive(true);
    setTimeout(() => {
      setIsActive(false);
    }, 3000); // 3초 후에 팝업이 사라지도록 설정
  };

  const renderContent = () => {
    switch (category) {
      case "habit":
      case "daily":
      case "todo":
        return (
          <TaskList
            list={list}
            category={category}
            onClickCount={onClickCount}
            onClickCreate={onClickCreate}
            onClickEdit={onClickEdit}
            onClickChecked={onClickChecked}
            onClickDone={onClickDone}
          />
        );
      case "reward":
        return <RewardView onBuy={showPopup} />;
      default:
        return null;
    }
  };

  return (
    <Section className="DefaultWidth FL_Column FL_1 G8px">
      {renderContent()}
      <TaskPopUp isActive={isActive} cost={cost} />
    </Section>
  );
};

export default TaskView;

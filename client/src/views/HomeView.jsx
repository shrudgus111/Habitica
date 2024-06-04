import React, { useState } from "react";
import styled from "styled-components";
import CurrentCoin from "@/components/layout/CurrentCoin";
import CurrentCharacter from "@/components/layout/CurrentCharacter";
import TaskView from "./TaskView";
import UnderBar from "@/components/home/UnderBar";

const HomeViewBlock = styled.div``;

const HomeView = () => {
  const [category, setCategory] = useState("habit");
  const handleClickMenu = (newCategory) => setCategory(newCategory);
  return (
    <>
      <CurrentCoin />
      <CurrentCharacter />
      <TaskView category={category} />
      <UnderBar onClickMenu={handleClickMenu} />
    </>
  );
};

export default HomeView;

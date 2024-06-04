import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CurrentCoin from "@/components/layout/CurrentCoin";
import CurrentCharacter from "@/components/layout/CurrentCharacter";
import TaskView from "./TaskView";
import TodoView from "./TaskCreateView";
import UnderBar from "@/components/home/UnderBar";
import axios from "axios";

const HomeViewBlock = styled.div``;

const HomeView = () => {
  const [list, setList] = useState([]);
  const [category, setCategory] = useState("habit");
  const [isCreate, setIsCreate] = useState(false);
  const handleClickMenu = (newCategory) => setCategory(newCategory);
  const handleClickClose = () => setIsCreate(false);
  const handleClickCreate = () => setIsCreate(true);

  const fetchTaskList = () => {
    if (category !== "reward") {
      axios
        .get(`http://localhost:8002/task/${category}`)
        .then((res) => {
          setList(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const onClickCount = (no, isPositive) => {
    const updateUrl = isPositive
      ? `http://localhost:8002/task/habit/increaseCountP`
      : `http://localhost:8002/task/habit/increaseCountN`;
    axios
      .put(updateUrl, { no })
      .then((res) => {
        fetchTaskList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchTaskList();
  }, [category]);

  return (
    <>
      <CurrentCoin />
      <CurrentCharacter />
      <TaskView
        category={category}
        list={list}
        onClickCount={onClickCount}
        onClickCreate={handleClickCreate}
      />
      <UnderBar onClickMenu={handleClickMenu} setIsCreate={setIsCreate} />
      <TodoView
        isCreate={isCreate}
        category={category}
        onClickClose={handleClickClose}
        fetchTaskList={fetchTaskList}
      />
    </>
  );
};

export default HomeView;

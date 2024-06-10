import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CurrentCoin from '@/components/layout/CurrentCoin';
import CurrentCharacter from '@/components/layout/CurrentCharacter';
import TaskView from './TaskView';
import TaskFormView from './TaskFormView';
import UnderBar from '@/components/home/UnderBar';
import axios from 'axios';

const HomeViewBlock = styled.div``;

const HomeView = () => {
  const [list, setList] = useState([]);
  const [category, setCategory] = useState('habit');
  const [isCreate, setIsCreate] = useState(false);
  const [mode, setMode] = useState('');
  const [task, setTask] = useState('');
  const [avatarInfo, setAvatarInfo] = useState({});
  const handleClickMenu = (newCategory) => setCategory(newCategory);
  const handleClickClose = () => setIsCreate(false);
  const user = useSelector((state) => state.members.user);
  const userNo = user?.userNo;

  useEffect(() => {
    if (userNo) {
      fetchTaskList();
    }
  }, [category, userNo]);

  const increaseExp = (userNo, difficulty) => {
    axios
      .put('http://localhost:8002/avatar/increaseExp', { userNo, difficulty })
      .then((res) => {
        fetchAvatarInfo();
      })
      .catch((err) => console.log(err));
  };

  const decreaseExp = (userNo, difficulty) => {
    axios
      .put('http://localhost:8002/avatar/decreaseExp', { userNo, difficulty })
      .then((res) => {
        fetchAvatarInfo();
      })
      .catch((err) => console.log(err));
  };

  const fetchAvatarInfo = () => {
    axios
      .get('http://localhost:8002/avatar/info', { params: { userNo } })
      .then((res) => {
        setAvatarInfo(res.data[0]);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (userNo) {
      fetchAvatarInfo();
    }
  }, [userNo]);

  const fetchTaskList = () => {
    if (category !== 'reward') {
      axios
        .get(`http://localhost:8002/task/${category}`, { params: { userNo } })
        .then((res) => {
          setList(res.data);
        })
        .catch((err) => console.error(err));
    }
  };

  const onClickCount = (no, isPositive, difficulty) => {
    const updateUrl = isPositive
      ? `http://localhost:8002/task/habit/increaseCountP`
      : `http://localhost:8002/task/habit/increaseCountN`;
    axios
      .put(updateUrl, { no, userNo })
      .then((res) => {
        fetchTaskList();
        if (isPositive) {
          increaseExp(userNo, difficulty);
        } else {
          decreaseExp(userNo, difficulty);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleClickCreate = () => {
    setMode('create');
    setIsCreate(true);
    setTask(null);
  };

  const handleClickEdit = (task) => {
    setMode('edit');
    setIsCreate(true);
    setTask(task);
  };

  const handleClickDelete = (no) => {
    setIsCreate(false);
    axios
      .delete(`http://localhost:8002/task/${category}/delete/${no}`, {
        params: { no, userNo },
      })
      .then((res) => {
        fetchTaskList();
      })
      .catch((err) => console.log(err));
  };

  const handleClickChecked = (no, difficulty) => {
    axios
      .put(`http://localhost:8002/task/daily/checked`, { no, userNo })
      .then(
        (res) => {
          fetchTaskList();
          increaseExp(userNo, difficulty);
        },
        (err) => {
          console.log(err);
        }
      )
      .catch((err) => console.log(err));
  };

  const handleClickDone = (item) => {
    const { no, difficulty } = item;
    axios
      .delete(`http://localhost:8002/task/todo/delete/${no}`, {
        params: { no, userNo },
      })
      .then((res) => {
        fetchTaskList();
        increaseExp(userNo, difficulty);
      })
      .catch((err) => console.log(err));
  };

  const handleClickAvatar = () => {
    setIsCreate(true);
    setMode('avatar');
  };

  return (
    <>
      {user ? (
        <>
          <CurrentCoin avatarInfo={avatarInfo} />
          <CurrentCharacter
            avatarInfo={avatarInfo}
            onClickAvatar={handleClickAvatar}
          />

          <TaskView
            category={category}
            list={list}
            onClickCount={onClickCount}
            onClickCreate={handleClickCreate}
            onClickEdit={handleClickEdit}
            onClickChecked={handleClickChecked}
            onClickDone={handleClickDone}
            avatarInfo={avatarInfo}
          />
          <UnderBar
            onClickMenu={handleClickMenu}
            setIsCreate={setIsCreate}
            setMode={setMode}
          />
          <TaskFormView
            mode={mode}
            task={task}
            isCreate={isCreate}
            category={category}
            avatarInfo={avatarInfo}
            onClickClose={handleClickClose}
            onClickDelete={handleClickDelete}
            fetchTaskList={fetchTaskList}
            setAvatarInfo={setAvatarInfo}
          />
        </>
      ) : (
        '로그인이 필요합니다'
      )}
    </>
  );
};

export default HomeView;

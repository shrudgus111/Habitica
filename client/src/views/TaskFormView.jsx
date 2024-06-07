import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BsPlusCircle } from "react-icons/bs";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { BiMinusCircle } from "react-icons/bi";
import { BiSolidMinusCircle } from "react-icons/bi";
import axios from "axios";
import TaskHeader from "@/components/Task/TaskHeader";
import AvatarEditView from "./avatar/avatarEditView";

const TaskFormViewBlock = styled.article`
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
  &.create {
    background-color: var(--main-color);
  }
  &.edit {
    background-color: var(--yellow-color);
  }
`;

const TodoContent = styled.section`
  padding: 16px 0 32px;

  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  &.create {
    background-color: var(--main-hover);
  }
  &.edit {
    background-color: var(--yellow-hover);
  }
  .FontInputTitle {
    color: white;
  }
  form {
    div {
      input {
        all: unset;
        background-color: rgba(255, 255, 255, 0.3);
        width: 100%;
        padding: 8px;
        border-radius: 8px;
        box-sizing: border-box;
      }
    }
  }
`;

const TodoDetail = styled.section`
  margin-top: -8px;
  background-color: white;
  padding: 16px 0;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  .FL_SB {
    flex-wrap: wrap;
    .FontInputTitle {
      color: gray;
      width: 100%;
    }
    .controlsInput {
      background-color: whitesmoke;
      padding: 16px;
      color: gray;
      label {
        span {
          color: gray;
        }
        &.active {
          color: var(--main-color);
          span {
            color: var(--main-color);
            font-weight: 800;
          }
        }
      }
    }
  }
  input {
    all: unset;
  }
  .resetCounter {
    .resetCounterInput {
      background-color: whitesmoke;

      &.active {
        background-color: var(--main-color);
        border-radius: 8px;
        .FontBody {
          color: white;
        }
      }
      label {
        width: 100%;
        padding: 8px;
      }
    }
  }
  .difficulty {
    .difficultyInput {
      background-color: whitesmoke;
      input {
        display: none;
      }
      &.active {
        border-radius: 8px;
        .FontBody {
          color: var(--main-color);
          font-weight: 800;
        }
      }
      label {
        width: 100%;
        padding: 16px;
      }
    }
  }
  .tags {
    .tagsInput {
      background-color: whitesmoke;
      width: 100%;
      padding: 8px;
    }
  }
  .delete {
    background-color: whitesmoke;
    margin: 16px 0;
    padding: 12px;
    border-radius: 8px;
    color: red;
    font-weight: 600;
    &:hover {
    }
  }
  &.create {
  }
  &.edit {
    .FL_SB {
      flex-wrap: wrap;
      .FontInputTitle {
        color: gray;
        width: 100%;
      }
      .controlsInput {
        background-color: whitesmoke;
        padding: 16px;
        color: gray;
        label {
          &.active {
            color: var(--yellow-hover);
            span {
              color: var(--yellow-hover);
            }
          }
        }
      }
    }
    .resetCounter {
      .resetCounterInput {
        &.active {
          background-color: var(--yellow-hover);
        }
      }
    }
    .difficulty {
      .difficultyInput {
        &.active {
          border-radius: 8px;
          .FontBody {
            color: var(--yellow-hover);
          }
        }
      }
    }
  }
`;

const TaskFormView = ({
  isCreate,
  mode,
  category,
  onClickClose,
  onClickDelete,
  fetchTaskList,
  task,
  avatarInfo,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [positive, setPositive] = useState(true);
  const [negative, setNegative] = useState(false);
  const [resetCounter, setResetCounter] = useState("daily");
  const [difficulty, setDifficulty] = useState("easy");
  const [tag, setTag] = useState("");

  const serverUrl = import.meta.env.VITE_API_URL;

  const habitCycles = ["daily", "weekly", "monthly"];
  const habitDifficulties = ["trivial", "easy", "medium", "hard"];
  const token = localStorage.getItem("loging");
  const userNo = JSON.parse(token).userNo;
  useEffect(() => {
    if (mode === "edit" && task) {
      setTitle(task.title);
      setContent(task.content);
      setPositive(task.positive);
      setNegative(task.negative);
      setResetCounter(task.resetCounter);
      setDifficulty(task.difficulty);
      setTag(task.tag);
    } else if (mode === "create") {
      setTitle("");
      setContent("");
      setPositive(true);
      setNegative(false);
      setResetCounter("daily");
      setDifficulty("easy");
      setTag("");
    }
  }, [mode, task]);

  const handleSubmit = (e) => {
    const url =
      mode === "create"
        ? `http://localhost:8002/task/${category}/create`
        : `http://localhost:8002/task/${category}/update/${task.no}`;

    const method = mode === "create" ? "post" : "put";

    e.preventDefault();
    const data = {
      title,
      content,
      positive,
      negative,
      resetCounter,
      difficulty,
      tag,
      userNo,
    };

    axios[method](url, data)
      .then((res) => {
        setTitle("");
        setContent("");
        setPositive(true);
        setNegative(false);
        setResetCounter("daily");
        setDifficulty("easy");
        setTag("");
        fetchTaskList();
        onClickClose();
      })
      .catch((err) => {
        alert("실패");
      });
  };

  const renderStars = (level) => {
    switch (level) {
      case "trivial":
        return "★";
      case "easy":
        return "★★";
      case "medium":
        return "★★★";
      case "hard":
        return "★★★★";
      default:
        return "";
    }
  };

  return (
    <>
      <TaskFormViewBlock
        className={`FL_Column ${isCreate && "active"} ${mode}`}
      >
        {mode !== "avatar" ? (
          <>
            <TaskHeader
              mode={mode}
              onClickClose={onClickClose}
              handleSubmit={handleSubmit}
              category={category}
            />
            <TodoContent className={`${mode}`}>
              <form
                onSubmit={handleSubmit}
                className="DefaultWidth FL_Column G8px"
              >
                <div className="FontInput">
                  <label htmlFor="title" className="FontInputTitle">
                    제목
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="FontInput">
                  <label htmlFor="content" className="FontInputTitle">
                    내용
                  </label>
                  <input
                    type="text"
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
              </form>
            </TodoContent>
            <TodoDetail className={`FL_1 ${mode}`}>
              <div className="DefaultWidth FL_Column G8px">
                {category == "habit" && (
                  <>
                    <div className="controls FL_SB">
                      <label className="FontInputTitle G_FW">습관의 형태</label>
                      <div className="controlsInput FL_1 G_PCC">
                        <input
                          type="checkbox"
                          id="positive"
                          checked={positive}
                          onChange={(e) => setPositive(e.target.checked)}
                        />
                        <label
                          htmlFor="positive"
                          className={`G_PCC G8px cursorPointer ${
                            positive && "active"
                          }`}
                        >
                          {positive ? (
                            <BsFillPlusCircleFill />
                          ) : (
                            <BsPlusCircle />
                          )}
                          <span className="FontBody">좋은 습관</span>
                        </label>
                      </div>
                      <div className="controlsInput FL_1 G_PCC">
                        <input
                          type="checkbox"
                          id="negative"
                          checked={negative}
                          onChange={(e) => setNegative(e.target.checked)}
                        />
                        <label
                          htmlFor="negative"
                          className={`G_PCC G8px cursorPointer ${
                            negative && "active"
                          }`}
                        >
                          {negative ? (
                            <BiSolidMinusCircle />
                          ) : (
                            <BiMinusCircle />
                          )}
                          <span className="FontBody">나쁜 습관</span>
                        </label>
                      </div>
                    </div>
                    <div className="resetCounter FL_SB">
                      <label className="FontInputTitle G_FW">습관 주기</label>
                      {habitCycles.map((cycle) => (
                        <div
                          key={cycle}
                          className={`resetCounterInput FL_1 FL_Center ${
                            resetCounter === cycle && "active"
                          }`}
                        >
                          <input
                            type="radio"
                            id={cycle}
                            name="habitCycle"
                            checked={resetCounter === cycle}
                            onChange={() => setResetCounter(cycle)}
                          />
                          <label
                            htmlFor={cycle}
                            className="FontBody TA_Center cursorPointer"
                          >
                            {cycle === "daily"
                              ? "매일"
                              : cycle === "weekly"
                                ? "주간"
                                : cycle === "monthly" && "월간"}
                          </label>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <div className="difficulty FL_SB">
                  <label className="FontInputTitle G_FW">난이도</label>
                  {habitDifficulties.map((level) => (
                    <div
                      key={level}
                      className={`difficultyInput FL_1 ${
                        difficulty === level && "active"
                      }`}
                    >
                      <input
                        type="radio"
                        id={level}
                        name="habitDifficulty"
                        checked={difficulty === level}
                        onChange={() => setDifficulty(level)}
                      />
                      <label
                        htmlFor={level}
                        className="FontBody TA_Center FL_Column G8px cursorPointer"
                      >
                        <span>{renderStars(level)}</span>
                        <span>
                          {level === "trivial"
                            ? "매우 쉬움"
                            : level === "easy"
                              ? "쉬움"
                              : level === "medium"
                                ? "중간"
                                : "어려움"}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="tags FL_SB">
                  <label className="FontInputTitle G_FW">태그</label>
                  <div className="tagsInput FontBody">
                    <input
                      type="checkbox"
                      id="tag1"
                      onChange={() => setTag("업무")}
                    />
                    <label htmlFor="tag1">업무</label>
                  </div>
                </div>

                {mode === "edit" && (
                  <button
                    className="delete FontBody TA_Center"
                    onClick={() => onClickDelete(task.no)}
                  >
                    삭제하기
                  </button>
                )}
              </div>
            </TodoDetail>
          </>
        ) : (
          <>
            <AvatarEditView avatarInfo={avatarInfo} />
          </>
        )}
      </TaskFormViewBlock>
    </>
  );
};

export default TaskFormView;

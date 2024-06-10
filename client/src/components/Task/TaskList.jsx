import React from 'react';
import styled from 'styled-components';

import TaskListLeft from './TaskListLeft';
import TaskListZero from './TaskListZero';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { BsDashCircleFill, BsDashCircle } from 'react-icons/bs';

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
        cursor: default;
        &.active {
          background-color: var(--yellow-color);
        }
        .able {
          cursor: pointer;
          color: var(--yellow-hover);
          background-color: white;
          border-radius: 50%;
          outline: 2px solid var(--yellow-color);
        }
        p {
          width: 30px;
          height: 30px;
          svg {
            width: 100%;
            height: 100%;
          }
        }
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
      .count {
        font-size: 12px;
        width: 100%;
        justify-content: flex-end;
      }
    }
    &.goodDaily {
      button.active {
        background-color: var(--green-color);
        span {
          svg {
            color: var(--green-hover);
          }
        }
      }
    }
  }
  &.goodHabit {
    li button.active {
      background-color: var(--green-color);
      .able {
        color: var(--green-hover);
        outline: 2px solid var(--green-hover);
      }
    }
  }
  &.VGHabit {
    li button.active {
      background-color: var(--blue-color);
      .able {
        color: var(--blue-hover);
        outline: 2px solid var(--blue-hover);
      }
    }
  }
  &.badHabit {
    li button.active {
      background-color: var(--orange-color);
      .able {
        color: var(--orange-hover);
        outline: 2px solid var(--orange-hover);
      }
    }
  }
`;

const TaskList = ({
  list,
  category,
  onClickCount,
  onClickCreate,
  onClickEdit,
  onClickChecked,
  onClickDone,
}) => {
  return (
    <>
      {list.length > 0 ? (
        list.map((item, index) => (
          <ListBox
            className={`listBox ${
              category == 'habit' &&
              (item.CountP === 0 && item.CountN === 0
                ? ''
                : item.CountP > item.CountN * 2
                  ? 'VGHabit'
                  : item.CountP > item.CountN
                    ? 'goodHabit'
                    : 'badHabit')
            }`}
            key={index}
          >
            <TaskListLeft
              category={category}
              item={item}
              onClickCount={onClickCount}
              onClickChecked={onClickChecked}
              onClickDone={onClickDone}
            />
            <li
              className="TA_Center FL_Column FontBody cursorPointer"
              onClick={() => onClickEdit(item)}
            >
              <h3 className="title">{item.title}</h3>
              <p className="content">{item.content}</p>
              <p className="count FontSub TA_Right FL_Center">
                {category == 'habit' ? (
                  item.CountP || item.CountN ? (
                    <>
                      <MdKeyboardDoubleArrowRight /> {item.CountP} |{' '}
                      {item.CountN}
                    </>
                  ) : (
                    ''
                  )
                ) : (
                  <>
                    {item.checked > 0 && (
                      <>
                        <MdKeyboardDoubleArrowRight /> {item.checked}
                      </>
                    )}
                  </>
                )}
              </p>
            </li>
            {category == 'habit' && (
              <>
                <li className="TA_Right FL_CSB">
                  <button type="button" className={item.negative && 'active'}>
                    <p className="FL_CSB">
                      {category == 'habit' &&
                        (item.negative ? (
                          <BsDashCircleFill
                            className="able"
                            onClick={() =>
                              onClickCount(item.no, false, item.difficulty)
                            }
                          />
                        ) : (
                          <BsDashCircle className="disable" />
                        ))}
                    </p>
                  </button>
                </li>
              </>
            )}
          </ListBox>
        ))
      ) : (
        <TaskListZero onClickCreate={onClickCreate} />
      )}
    </>
  );
};

export default TaskList;

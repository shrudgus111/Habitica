import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeType, fetchNotice, fetchReview, setPage } from "@/store/board";
import dayjs from "dayjs";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.02);
  }
`;

const BoardListBlock = styled.div`
  margin: 0px 0 50px;
  table {
    width: 100%;
    border-spacing: 0;
    border-radius: 10px;
    overflow: hidden;
    animation: ${fadeIn} 0.5s ease-in-out;
    th,
    td {
      padding: 15px;
      text-align: center;
    }
    th {
      background-color: #6a0dad;
      color: white;
      font-weight: bold;
      font-size: 1.1em;
      border-bottom: 2px solid #4a0072;
    }
    td {
      background-color: #f3e5f5;
      color: #333;
      transition: background-color 0.3s ease;
    }
    tr:nth-child(even) td {
      background-color: #e1bee7;
    }
    tr:hover td {
      background-color: #d1c4e9;
      animation: ${scaleIn} 0.3s ease;
    }
  }
  .btn {
    text-align: center;
    margin: 20px 0;
    a {
      padding: 10px 20px;
      background: linear-gradient(45deg, #6a0dad, #4a0072);
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: background 0.3s ease;
      &:hover {
        background: linear-gradient(45deg, #4a0072, #6a0dad);
      }
    }
  }
  .pagebutton {
    text-align: center;
    button {
      padding: 10px 15px;
      background: #ddd;
      margin: 20px 5px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1em;
      transition: background 0.3s ease;
      &:hover {
        background: #ba68c8;
      }
      &.on {
        background: #6a0dad;
        color: white;
      }
    }
  }
`;

const BoardList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.members.user);
  const { list, type, totalCount, currentPage } = useSelector(
    (state) => state.boards
  );

  const totalPages = Math.ceil(totalCount / 10);

  useEffect(() => {
    if (type === "notice") {
      dispatch(changeType("notice"));
      dispatch(fetchNotice(1));
    } else {
      dispatch(changeType("review"));
      dispatch(fetchReview(1));
    }
  }, [dispatch, type]);

  useEffect(() => {
    if (type === "notice") {
      dispatch(fetchNotice(currentPage));
    } else {
      dispatch(fetchReview(currentPage));
    }
  }, [dispatch, currentPage]);

  return (
    <BoardListBlock>
      <table>
        <colgroup>
          <col style={{ width: "10%" }} />
          <col style={{ width: "50%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "20%" }} />
        </colgroup>
        <thead>
          <tr>
            <th>Turn</th>
            <th>Title</th>
            <th>Date</th>
            <th>Into</th>
          </tr>
        </thead>
        <tbody>
          {list.length > 0 &&
            list.map((post, index) => (
              <tr key={index}>
                <td>{totalCount - ((currentPage - 1) * 10 + index)}</td>
                <td>
                  <Link
                    to={`/boardList/${post.subject}`}
                    state={{ post: post }}
                  >
                    {post.subject}
                  </Link>
                </td>
                <td>{dayjs(post.date).format("YYYY-MM-DD")}</td>
                <td>{post.hit}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="pagebutton">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? "on" : ""}
            onClick={() => {
              dispatch(setPage(i + 1));
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {type === "notice" && user && user.userId === "tsalt@hanmail.net" && (
        <div className="btn">
          <Link to="/boardWrite">글쓰기</Link>
        </div>
      )}
      {type === "review" && user && (
        <div className="btn">
          <Link to="/boardWrite">글쓰기</Link>
        </div>
      )}
    </BoardListBlock>
  );
};

export default BoardList;

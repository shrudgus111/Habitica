import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

// 애니메이션 효과 정의
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const BoardWriteBlock = styled.div`
  max-width: 600px;
  margin: 0 auto 50px;
  animation: ${fadeIn} 0.5s ease-out;

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
    animation: ${fadeIn} 0.5s ease-out;

    col:nth-child(1) {
      width: 100px;
    }
    col:nth-child(2) {
      width: auto;
    }

    td,
    th {
      padding: 10px 15px;
      border-bottom: 1px solid #ddd;
      &:last-child {
        border-bottom: 0;
      }
    }

    th {
      background-color: #f7f7f7;
      font-weight: 600;
    }

    td {
      input,
      textarea {
        width: 100%;
        border: 1px solid #ddd;
        padding: 10px;
        border-radius: 4px;
        transition: border-color 0.3s;
        &:focus {
          border-color: #007bff;
          outline: none;
        }
      }
      textarea {
        height: 200px;
      }
    }
  }

  .btn {
    text-align: center;
    margin-top: 20px;
    button,
    a {
      margin: 0 10px;
      padding: 10px 20px;
      background: #925cf2;
      color: white;
      font-size: 14px;
      border: none;
      border-radius: 4px;
      transition:
        background-color 0.3s,
        transform 0.3s;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;

      &:hover {
        background-color: #6132b4;
        transform: translateY(-2px);
      }
    }
  }
`;

const BoardWrite = ({ type }) => {
  const user = useSelector((state) => state.members.user);
  const userNo = user?.userNo;
  const navigate = useNavigate();

  const [board, setBoard] = useState({
    writer: user.userId,
    subject: "",
    content: "",
  });

  const [rating, setRating] = useState(5);

  const handleStarClick = (starIndex) => {
    // 클릭된 별 이후의 모든 별의 색을 토글하고 평점을 설정합니다.
    setRating(starIndex); // 평점 설정
  };

  const handleChange = (e) => {
    console.log(e);
    const { value, name } = e.target;
    setBoard((post) => ({ ...post, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (type == "notice") {
      axios
        .post("http://localhost:8002/board/notice/write", {
          board: board,
          userNo,
        })
        .then((res) => {
          if (res.data.affectedRows == 1) {
            navigate("/boardList", { state: { page: 1 } });
          } else {
            alert("글이 등록되지 않았습니다.");
          }
        })
        .catch((err) => console.log(err.toJSON()));
    } else if (type == "review") {
      axios
        .post("http://localhost:8002/board/review/write", {
          board: board,
          userNo,
        })
        .then((res) => {
          if (res.data.affectedRows == 1) {
            navigate("/boardList", { state: { page: 1 } });
          } else {
            alert("글이 등록되지 않았습니다.");
          }
        })
        .catch((err) => console.log(err.toJSON()));
    }
  };

  return (
    <BoardWriteBlock>
      <form onSubmit={onSubmit}>
        <table border="1">
          <colgroup>
            <col />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <td>Writer</td>
              <td>
                <input
                  type="text"
                  name={user.userId}
                  value={user.userId}
                  disabled
                />
              </td>
            </tr>
            {type == "review" && (
              <tr>
                <td>Name</td>
                <td>
                  <input
                    type="text"
                    name="subject"
                    value={board.subject}
                    onChange={handleChange}
                  />
                </td>
              </tr>
            )}
            {type == "notice" ? (
              <tr>
                <td>Name</td>
                <td>
                  <input
                    type="text"
                    name="subject"
                    value={board.subject}
                    onChange={handleChange}
                  />
                </td>
              </tr>
            ) : (
              <tr></tr>
            )}
            <tr>
              <td>Substance</td>
              <td>
                <textarea
                  name="content"
                  value={board.content}
                  onChange={handleChange}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="btn">
          <button type="submit">작성</button>
          <Link to="/boardList" state={{ page: 1 }}>
            목록
          </Link>
        </div>
      </form>
    </BoardWriteBlock>
  );
};

export default BoardWrite;

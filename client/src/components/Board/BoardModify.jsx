import React, {useState} from 'react';
import styled, { keyframes } from 'styled-components'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'

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

const BoardModifyBlock = styled.div`
  max-width: 600px; 
  margin: 0 auto 50px; 
  animation: ${fadeIn} 0.5s ease-out;

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    border-radius: 8px;
    overflow: hidden;
    animation: ${fadeIn} 0.5s ease-out;

    col:nth-child(1) { width: 100px; }
    col:nth-child(2) { width: auto; }
    
    td, th {
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
      input, textarea {
        width: 100%; 
        border: 1px solid #ddd; 
        padding: 10px; 
        border-radius: 4px;
        transition: border-color 0.3s;
        &:focus {
          border-color: #007BFF;
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
    button, a { 
      margin: 0 10px; 
      padding: 10px 20px; 
      background:#925cf2;
      color: white;
      font-size: 14px;
      border: none;
      border-radius: 4px;
      transition: background-color 0.3s, transform 0.3s;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;

      &:hover {
        background-color:#6132b4;
        transform: translateY(-2px);
      }
    }
  }
`;

const BoardModify = ({post}) => {
    const type = useSelector(state => state.boards.type);
    const currentPage = useSelector(state => state.boards.currentPage);
    const navigate = useNavigate();

    const [board, setBoard] = useState({
        subject: post.subject,
        content: post.content
    });

    const [rating, setRating] = useState(post.rating); // 초기 평점

    const handleStarClick = (starIndex) => {
        setRating(starIndex); // 평점 설정
    };

    const handleChange = (e) => {
        const {value, name} = e.target;
        setBoard(board => ({...board, [name]: value}));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (type === "notice") {
            axios.post("http://localhost:8002/board/notice/modify", { noNo: post.noNo, subject: board.subject, content: board.content })
                .then((res) => {
                    if (res.data.affectedRows === 1) {
                        navigate("/boardList", {state : { page : currentPage }});
                    } else {
                        alert("수정하지 못했습니다.");
                    }
                })
                .catch(err => console.log(err.toJSON()));
        } else if (type === "review") {
            axios.post("http://localhost:8002/board/review/modify", { reNo: post.reNo, subject: board.subject, content: board.content })
                .then((res) => {
                    if (res.data.affectedRows === 1) {
                        navigate("/boardList", {state : { page : currentPage }});
                    } else {
                        alert("수정하지 못했습니다.");
                    }
                })
                .catch(err => console.log(err.toJSON()));
        }
    };

    return (
        <BoardModifyBlock>
            <form onSubmit={onSubmit}>
                <table border="1">
                    <colgroup>
                        <col />
                        <col />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>Writer</th>
                            <td><input type="text" name="writer" value={post.writer} disabled /></td>
                        </tr>
                        { type === "review" &&
                            <tr>
                                <th>Name</th>
                                <td><input type="text" name="subject" value={board.subject} onChange={handleChange} /></td>
                            </tr> 
                        }
                        { type === "notice" &&
                            <tr>
                                <th>Name</th>
                                <td><input type="text" name="subject" value={board.subject} onChange={handleChange} /></td>
                            </tr>
                        }
                        <tr>
                            <th>Substance</th>
                            <td><textarea name="content" value={board.content} onChange={handleChange}></textarea></td>
                        </tr>
                    </tbody>
                </table>
                <div className="btn">
                    <button type="submit">글수정</button>
                    <Link to="/boardList" state={{ page:1}}>목록</Link>
                </div>
            </form>
        </BoardModifyBlock>
    );
};

export default BoardModify;
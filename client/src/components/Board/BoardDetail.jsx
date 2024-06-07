import React, {useEffect} from 'react';
import styled, { keyframes } from 'styled-components'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'

// const serverUrl = import.meta.env.VITE_API_URL

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


const BoardDetailBlock = styled.div`
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
`

const BoardDetail = ({post}) => {

    const type = useSelector(state=>state.boards.type)    
    const user = useSelector(state=>state.members.user)
    const currentPage = useSelector(state=>state.boards.currentPage)

    const navigate = useNavigate()

    const onRemove = (e)=>{
        e.preventDefault()
        if (type=="notice") {
            axios.get(`http://localhost:8002/board/notice/remove?no=${post.noNo}`)
            .then((res)=>{
                if (res.data.affectedRows==1) {
                    navigate("/boardList", { state : {page : currentPage }})
                } else {
                    alert("삭제하지 못했습니다.")
                    return 
                }
            })
            .catch(err=>console.log(err))
        } else if (type=="review") {
            axios.get(`http://localhost:8002/board/review/remove?reNo=${post.reNo}`)
            .then((res)=>{
                if (res.data.affectedRows==1) {
                    navigate("/boardList", { state : {page : currentPage }})
                } else {
                    alert("삭제하지 못했습니다.")
                    return 
                }
            })
            .catch(err=>console.log(err))
        }
    }

    useEffect(()=>{
        if (type=="notice") {
            axios.get(`http://localhost:8002/board/notice/hit?no=${post.noNo}&hit=${post.hit}`)
            .then((res)=>{
                if (res.data.affectedRows==1) {
                    console.log("증가했습니다.")
                } else {
                    console.log("증가하지 못했습니다.")
                }
            })
            .catch(err=>console.log(err.toJSON()))
        } else if (type=="review") {
            axios.get(`http://localhost:8002/board/review/hit?no=${post.reNo}&hit=${post.hit}`)
            .then((res)=>{
                if (res.data.affectedRows==1) {
                    console.log("증가했습니다.")
                } else {
                    console.log("증가하지 못했습니다.")
                }
            })
            .catch(err=>console.log(err.toJSON()))
        }
    }, [])

    return (
        <BoardDetailBlock>
            <table border="1">
                <colgroup>
                    <col />
                    <col />
                </colgroup>
                <tbody>
                    <tr>
                        <td>Writer</td>
                        <td><input type="text" name={post.writer} value={post.writer} disabled /></td>
                    </tr>
                    { type=="review" &&
                        <tr>
                            <td>Name</td>
                            <td><input type="text" name="subject" value={post.subject} disabled /></td>
                        </tr> 
                        }
                        { type=="notice" ? 
                            <tr>
                                <td>Name</td>
                                <td><input type="text" name="subject" value={post.subject} disabled /></td>
                            </tr>
                            :
                            <tr>
                            
                                
                            </tr>
                        }
                    <tr>
                        <td>Substance</td>
                        <td><textarea name="content" value={post.content} disabled></textarea></td>
                    </tr>
                </tbody>
            </table>
            <div class="btn">
                { (user && post.writer==user.userId) &&  
                    <>
                        <Link to={`/boardModify/${post.subject}`} state={{ post : post }}>수정</Link>
                        <a href="#" onClick={ onRemove }>삭제</a>
                    </>
                }
                <Link to="/boardList" state={{ page:currentPage}}>목록</Link>
            </div>
        </BoardDetailBlock>
    );
};

export default BoardDetail;
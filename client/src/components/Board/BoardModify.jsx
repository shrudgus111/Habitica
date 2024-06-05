import React, {useState} from 'react';
import styled from 'styled-components'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'

const BoardModifyBlock = styled.div`
max-width:600px; margin:0 auto 50px; 
table {
    col:nth-child(1) { width:100px; }
    col:nth-child(2) { width:auto; }
    td { padding:5px;
        input { width:100%; border:1px solid #ddd; height:30px; padding:5px; }
        textarea { width:100%; border:1px solid #ddd; padding:5px; height:200px }
    }
}
.btn { text-align:center; margin-top:20px;
    button, a { margin:0 10px; padding:10px 20px; background:#ddd;
        font-size:14px }
}
`

const BoardModify = ({post}) => {
    const type = useSelector(state=>state.boards.type)    
    const currentPage = useSelector(state=>state.boards.currentPage )

    const navigate = useNavigate()

    const [board, setBoard] = useState({
        subject:post.subject,
        content:post.content
    })

    const [rating, setRating] = useState(post.rating); // 초기 평점

    const handleStarClick = (starIndex) => {
        setRating(starIndex); // 평점 설정
    };

    const handleChange = (e)=>{
        console.log(e)
        const {value, name} = e.target
        setBoard(post=>({...post, [name]:value }))
    }

    const onSubmit = (e)=>{
        e.preventDefault()
        if (type=="notice") {
           axios.post("http://localhost:8002/board/notice/modify", { noNo:post.noNo, subject:board.subject, content:board.content })
           .then((res)=>{
                if (res.data.affectedRows==1) {
                    navigate("/boardList", {state : { page : currentPage}})
                } else {
                    alert("수정하지 못했습니다.")
                    return
                }
           })
           .catch(err=>console.log(err.toJSON()))
        } else if (type=="review") {
            axios.post("http://localhost:8002/board/review/modify", { reNo:post.reNo, subject:board.subject, content:board.content })
           .then((res)=>{
                if (res.data.affectedRows==1) {
                    navigate("/boardList", {state : { page : currentPage}})
                } else {
                    alert("수정하지 못했습니다.")
                    return
                }
           })
           .catch(err=>console.log(err.toJSON()))
        }
    }

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
                            <td>작성자</td>
                            <td><input type="text" name={post.writer} value={post.writer} disabled /></td>
                        </tr>
                        { type=="review" &&
                           <tr>
                           <tr>
                              <td>제목</td>
                              <td><input type="text" name="subject" value={board.subject} onChange={handleChange} /></td>
                           </tr> 
                              
                           </tr> 
                        }
                        { type=="notice" ? 
                            <tr>
                                <td>제목</td>
                                <td><input type="text" name="subject" value={board.subject} onChange={handleChange} /></td>
                            </tr>
                            :
                            <tr>
                      
                            </tr>
                        }
                        <tr>
                            <td>내용</td>
                            <td><textarea name="content" value={board.content} onChange={handleChange}></textarea></td>
                        </tr>
                    </tbody>
                </table>
                <div class="btn">
                    <button type="submit">글수정</button>
                    <Link to="/boardList">목록</Link>
                </div>
            </form>
        </BoardModifyBlock>
    );
};

export default BoardModify;
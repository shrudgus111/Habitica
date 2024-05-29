import React from 'react';
import styled from 'styled-components'

const TodoHeaderBlock = styled.div`
// background:#fff;
    h1 {
        height:4rem;
       
        color:#fff;
        font-size:1.5rem;
       
        
        display:flex; 
        margin-left:10px;
        align-items:center;
        span{
            width:25px;
            height:25px;
            line-height:25px;
            border-radius:50%;
            background:#fff;
            color:#925cf3;
            text-align:center;
            font-size:17px;
            margin-left:5px;
        }
    }
`

const TodoHeader = ({todos}) => {
    return (
        <TodoHeaderBlock>
            <h1>To Do's <span>{todos.length}</span> </h1>
        </TodoHeaderBlock>
    );
};

export default TodoHeader;
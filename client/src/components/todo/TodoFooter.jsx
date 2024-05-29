import React from 'react';
import styled from 'styled-components'

const TodoFooterBlock = styled.div`
    padding:30px; text-align:center; 
    button {width:100%; background:#fff;  color:#000; padding:10px 0px;
        border-radius:5px; margin:7px auto; 
    }
`

const TodoFooter = ({onFinishRemove, allRemove}) => {
    return (
        <TodoFooterBlock>
            <button onClick={onFinishRemove}>삭제</button>
            <button onClick={allRemove}>전체 삭제</button>
        </TodoFooterBlock>
    );
};

export default TodoFooter;
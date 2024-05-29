import React from 'react';
import styled from 'styled-components'

const TodoTemplateBlock = styled.div`
    max-width:521px;
    margin:50px auto;
    .content {
        padding:10px;
        background:#6132b4;
    }
`

const TodoTemplate = ({children}) => {
    return (
        <TodoTemplateBlock>
            <div className="content">{children}</div>
        </TodoTemplateBlock>
    );
};

export default TodoTemplate;
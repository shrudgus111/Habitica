import React from 'react';
import TodoListItem from './TodoListItem'
import styled from 'styled-components'

const TodoListBlock = styled.div`
    min-height:247px;
    max-height:513px;
    overflow-y:auto;
    margin-top:10px;
    
   
`

const TodoList = ({todos, onToggle, onRemove}) => {
    return (
        <TodoListBlock>
            {
              todos.map((item, index)=><TodoListItem item={item} key={index} onToggle={onToggle} onRemove={onRemove} />)   
            }
        </TodoListBlock>
    );
};

export default TodoList;
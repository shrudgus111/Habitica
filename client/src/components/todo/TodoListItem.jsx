import React from 'react';
import cn from 'classnames'
import styled from 'styled-components'
import { MdRemoveCircleOutline, MdCheckBox, MdCheckBoxOutlineBlank} from 'react-icons/md';

const TodoListItemBlock = styled.div`
    display:flex; padding:1rem;margin-top:5px;  border-radius:20px;
    background:#25cc90; color:#fff;
    &:nth-child(even) { background:#fa8537}
    .list { flex:1; display:flex; align-items:center; 
        .ch{background:#000; color:#fff; width:23px; height:23px; line-height:23px; text-align:center;}
        .red { color:#f00;  }
        .text { margin-left:0.5rem; 
            &.checked { text-decoration:line-through; color:#f00 }
        }
    }
    .remove { color:#ff6b6b;
        cursor:pointer;
        font-size:1.5rem; }
`

const TodoListItem = ({item, onToggle, onRemove}) => {
    const {id, text, checked } = item
    
    // const onClick = (num)=>{
    //     onToggle(num)
    // }

    return (
        <TodoListItemBlock>
            <div className="list" onClick={ ()=>onToggle(id) }>
              <div className='ch'>{ checked ? <MdCheckBox className="red" /> : <MdCheckBoxOutlineBlank /> }</div>
                <div className={cn("text", {checked})}>{id}. { text }</div>
            </div>
            {/* <div classs="remove" onClick={ ()=>onRemove(id) }><MdRemoveCircleOutline /></div> */}
        </TodoListItemBlock>
    );
};

export default TodoListItem;
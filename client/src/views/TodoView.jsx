import React, {useState, useRef, useEffect, useCallback} from 'react';
import TodoHeader from '@/components/todo/TodoHeader'
import TodoTemplate from '@/components/todo/TodoTemplate';
import TodoInsert from '@/components/todo/TodoInsert'
import TodoList from '@/components/todo/TodoList'
import TodoFooter from '@/components/todo/TodoFooter'

const App = () => {
  const id = useRef(1);
  const [todos, setTodos] =useState([
    // { id:1, text:"일정관리1", checked:true },
  ])

  const onInsert = useCallback(
    (value)=>{
      const todo = { id:id.current, text:value, checked:false}
      id.current = id.current + 1;
      console.log(id.current)
      
      setTodos(todos=>{
            const updateTodos = [...todos, todo]   // todos.concat(todo)
            localStorage.todos = JSON.stringify(updateTodos)
            localStorage.id = id.current
            return updateTodos
      })
     
    }, [todos])

  const onToggle = useCallback((id) => {
      setTodos(todos=>{
        const updateTodos = todos.map(item => item.id === id ? {...item, checked: !item.checked} : item)
        localStorage.todos = JSON.stringify(updateTodos)
      
        return updateTodos
      })
      
  }, [todos])

  const onRemove = useCallback((id)=>{
      setTodos(todos=>{
        const updateTodos = todos.filter(item=>item.id!==id)
        localStorage.todos = JSON.stringify(updateTodos)
        return updateTodos
      })
    
  }, [todos])

  const onFinishRemove = useCallback(()=>{
    setTodos(todos=>{
      const updateTodos = todos.filter(item=>!item.checked)
      localStorage.todos = JSON.stringify(updateTodos)
      return updateTodos
    })
   
  }, [todos])

  const allRemove = useCallback(()=>{
    setTodos(()=>{
      const updateTodos = []
      localStorage.todos = JSON.stringify(updateTodos)
      return updateTodos
    })

  }, [todos])

  useEffect(()=>{
    const localtodos = localStorage.todos
    const localid = localStorage.id
    if (localtodos){
      setTodos(JSON.parse(localtodos))
      id.current = JSON.parse(localid)
    }
}, [])

  return (
    <TodoTemplate>
      <TodoHeader todos={todos} />
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
      <TodoFooter onFinishRemove={onFinishRemove} allRemove={allRemove} />
    </TodoTemplate>
  );
};

export default App;
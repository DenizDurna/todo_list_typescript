import React, { useEffect, useState, ChangeEvent} from 'react';
import '../style/App.css';
import TodoList from "../components/todolist"

function App() {
  const [newTodo, setNewTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<any>([]);
  const [selectValue, setSelectValue] = useState<any>("All");
  const [listedTodo, setListedTodo] = useState<any>("");
  const [deleteStatus, setdeleteStatus] = useState<any>(false);
  

  interface newObj {
    todo: string,
     state: boolean,
      id: number 
  }
// change new todo input valu
  const handleChangeNewTodo = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewTodo(e.target.value)
  }

  // add todo to list
  const onClickaddTodo = (): void => {
    if (newTodo !== "" && todoList.length < 100) {
      let id = 0;
      let i:any = todoList.map((obj: newObj, index: number) => obj.id)
      let randomID = Math.ceil(Math.random() * 100)
      while (id < 1) {
        randomID = Math.ceil(Math.random() * 100)
        if (i.indexOf(randomID) < 0) {
          id = randomID
        } else {
          continue
        }
        id = randomID
      }
      setTodoList(todoList.concat({ todo: newTodo, state: true, id: id }))
      setNewTodo("")
    }
  }
  // Let's filter the todos (select tag)
  const onChangeSelect = (event: ChangeEvent<HTMLSelectElement>): void => {
    setSelectValue(event.target.value)
  }

  
  useEffect(() => {
    let localTodo= JSON.parse(localStorage.getItem('localTodoList') as any)
    if (localTodo === null) {
      localStorage.setItem("localTodoList", JSON.stringify(todoList));
    } else {
      setTodoList(localTodo)
    }
  }, [])

  useEffect(() => {
    if (deleteStatus || todoList.length > 0) {
      localStorage.setItem("localTodoList", JSON.stringify(todoList));
      setdeleteStatus(false)
    }
    if (selectValue === "completed") {
      setListedTodo(todoList.filter((obj: newObj, index: number) => !obj.state));
    }
    else if (selectValue === "Listed") {
      setListedTodo(todoList.filter((obj: newObj, index: number) => obj.state))

    }
    else {
      setListedTodo(todoList)

    }
    
  }, [selectValue, todoList,deleteStatus])
  return (
    <div className="App">
      <header className="App-header">
        <h1>TO-Do List</h1>
        <div className='new-todo-line'>
          <div className='add-todo'>
            <input type="text" name="todo" value={newTodo} onChange={handleChangeNewTodo} />
            <button onClick={onClickaddTodo} ><i><img src="images/icons/icon-plus.png" alt="" /></i></button>
          </div>
          <select name="task_status" onChange={onChangeSelect} value={selectValue}>
            <option value="All">All</option>
            <option value="completed">Completed</option>
            <option value="Listed">Not Completed</option>
          </select>
        </div>

        <ul className='todo-list'>
          {
            todoList.length > 0 ?
              listedTodo.map((value: newObj, index: number) =>
                <TodoList key={value.id} index={index} value={value} setTodoList={setTodoList} todoList={todoList} setdeleteStatus={setdeleteStatus} listedTodo={listedTodo} />
              )
              :
              <div id="alert">There is no task to do
              </div>

          }

        </ul>
      </header>
    </div>
  );
}

export default App;

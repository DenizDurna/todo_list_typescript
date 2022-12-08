import React, { useState, ChangeEvent } from 'react';
function Todolist(props: any) {
    const [completed, setCompleted] = useState<boolean>(props.value.state)
    const [todoValue, setTodoValue] = useState(props.value.todo)

    interface newObj {
        todo: string,
         state: boolean,
          id: number 
      }

    
    const onClikDelete = (i: any) => {        
        let deleteTodo = props.todoList.filter((obj: newObj, index: number) => obj.id !== i.id);
        setTodoValue(todoValue)
        props.setTodoList(deleteTodo)
        props.setdeleteStatus(true)
    }


    const onClikComplate = (i: number) => {
        let complate = [...props.todoList]
        complate[i].state = !complate[i].state
        props.setTodoList(complate)
        setCompleted(!completed)
    }


    //edit todo value change
    const handleChangeTodo = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoValue(e.target.value)
    }


    // keyUpEdit edit todo
    const keyUpEdit =(i:any)=>{        
        props.todoList.map((obj: newObj, index: number) =>{
            let newPropsList=[...props.todoList]
            if(obj.id === i.id){
                obj.todo=todoValue
                newPropsList.splice(index,1,obj)
        props.setTodoList(newPropsList) 
        }
        return newPropsList
    })
    }


    return (
               
        <li className="line " >
            <input type="text"   style={!completed ? { color: "grey", textDecoration: "0.1rem red line-through" } : {}} value={todoValue} onChange={handleChangeTodo} onKeyUp={()=>keyUpEdit(props.value)} />
            <span>
                <img id="done"  onClick={() => onClikComplate(props.index)} src="images/icons/icon-done.png" alt="" />
                <img id="delete"  onClick={() => onClikDelete(props.value)} src="images/icons/icon-trash-can.png" alt="" />
            </span>
        </li>


    )
}


export default Todolist;

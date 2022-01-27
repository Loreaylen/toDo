import React, {useState, useEffect} from "react"
import "../List/List.css"
import ToDoList from "../ToDoList/ToDoList"

const List = () => {

    const [list, setList] = useState([])
    const [input, setInput] = useState("") 
    const [complete, setComplete] = useState(false)

    const onChangeHandler = (e) => {
        setInput(e.target.value)
    }

    const add = () => {
        setList([...list, {
            id: Math.floor(Math.random() * 10000),
            task: input,
            done: false
        }])
        setInput("")
    }

    const deleteCompleteTasks = () => {
        const filtered = list.filter(x => x.done !== true)
        setList(filtered)
    }
   

    const del = (id) => {
        const filtered = list.filter(x => {
            console.log(x.id,id)
            return  x.id !== id
        })
        console.log(filtered)
        setList(filtered)
        }   

    return (
        <div className="listCtn">
            <div className="inputs">
                <input id="toDo"  onChange={onChangeHandler} value={input}></input>
                <button onClick={() => add()}>+</button>
            </div>
            <div className="list">
            <ToDoList list={list} setList={setList} del={del} />
            </div>
            <button className="deleteCompleted" disabled={!complete} onClick={() => deleteCompleteTasks()}>Eliminar tareas completadas</button>
        </div>
    )
}

export default List
import React, {useState, useEffect} from "react"
import "../List/List.css"
import ToDoList from "../ToDoList/ToDoList"

const List = () => {

    const [list, setList] = useState(() => {
        try {
                const data = JSON.parse(window.localStorage.getItem("Listado"))
                return data
                
        } catch {
            return []
        }
    })
    const [input, setInput] = useState("") 
    const [complete, setComplete] = useState(false)

    const setLocalStorage = (data) => {
        window.localStorage.setItem("Listado", JSON.stringify(list))
    }

   

    const del = (id) => {
        const filtered = list.filter(x => {
            return  x.id !== id
        })
        setList(filtered)
     };

    const onChangeHandler = (e) => {
        setInput(e.target.value)
    }

    const add = () => {
        if(input !== ""){
            setList([...list, {
                id: Math.floor(Math.random() * 10000),
                task: input,
                done: false
            }])
           return setInput("")
        }
        return alert("Escribi algo")
    }

    const deleteCompleteTasks = () => {
        const filtered = list.filter(x => x.done !== true)
        setList(filtered)
    }

    useEffect(() => {
            const completedTasks = list.filter(x => x.done === true).length
            completedTasks > 0 ? setComplete(true) : setComplete(false)
            setLocalStorage(list)

    }, [list])
  
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
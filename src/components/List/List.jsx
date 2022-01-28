import React, {useState, useEffect, useCallback} from "react"
import "../List/List.css"
import Item from "../Item"

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

    const setLocalStorage = () => {
        window.localStorage.setItem("Listado", JSON.stringify(list))
    }

   

    const del = (id) => {
        const filtered = list.filter(x => {
            return  x.id !== id
        })
        setList(filtered)
     };


    const add = () => {
        if(input !== ""){
            setList([...list, {
                id: Math.floor(Math.random() * 10000),
                task: input.trim(),
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

    console.log("List")

    const fullfiled = useCallback((fn, id) => {
        fn(true)
        const newArr = list.map(x => {
            if(x.id === id) {
                x.done = true
            }
            return x
        })
        setList(newArr)
       }, [list])


    useEffect(() => {
            const completedTasks = list.filter(x => x.done === true).length
            completedTasks > 0 ? setComplete(true) : setComplete(false)
            setLocalStorage(list)

    }, [list])
  
    return (
        <div className="listCtn">
            <div className="inputs">
                <input id="toDo"  onChange={(e) => setInput(e.target.value)} value={input}  onKeyDown={(e) => {if(e.key === "Enter"){add()}}}></input>
                <button onClick={() => add()}>+</button>
            </div>

            <div className="list">
            {list.map(el => <div key={el.id} className="itemCtn"> <Item el={el} fullfiled={fullfiled} /> 
            <button className="deleteButton" onClick={() => del(el.id)}>X</button>
            </div>)}
            </div>
            <button className="deleteCompleted" disabled={!complete} onClick={() => deleteCompleteTasks()}>Eliminar tareas completadas</button>
        </div>
    )
}

export default React.memo(List)
import React, {useState} from "react"
import "../List/List.css"
import ToDoList from "../ToDoList/ToDoList"

const List = () => {

    const [list, setList] = useState([{
        id: 1,
        task: "test"
    }])
    const [input, setInput] = useState("") 

    const onChangeHandler = (e) => {
        setInput(e.target.value)
    }

    const add = () => {
        setList([...list, {
            id: Math.floor(Math.random() * 10000),
            task: input
        }])
        setInput("")
       
    }


    return (
        <div className="listCtn">
            <div className="inputs">
                <input id="toDo"  onChange={onChangeHandler} value={input}></input>
                <button onClick={() => add()}>+</button>
            </div>
            <div className="list">
            <ToDoList list={list} setList={setList} />
            </div>
        </div>
    )
}

export default List
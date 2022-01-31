import React, {useState, useEffect, useCallback} from "react"
import "../List/List.css"
import Item from "../Item"
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CancelIcon from '@mui/icons-material/Cancel';
const List = () => {

    const [list, setList] = useState(() => {

            if(JSON.parse(window.localStorage.getItem("Listado")) !== null){
                const data = JSON.parse(window.localStorage.getItem("Listado"))
                return data
            }    
              return []  
    
    })
    const [input, setInput] = useState("") 

    const [charCount, setCharcount] = useState(0)

    const [complete, setComplete] = useState(false)
    
    const [editing, setEditing] = useState(false)
    
    const [editValue, setEditvalue] = useState("")

    const [editID, setEditID] = useState()

    const setLocalStorage = () => {
        window.localStorage.setItem("Listado", JSON.stringify(list))
    }

const onChangeHandler = (e) => {
    setInput(e.target.value)
}

useEffect(() => {
    setCharcount(input.length)
}, [input])

    const del = (id) => {
        const filtered = list.filter(x => {
            return  x.id !== id
        })
        setList(filtered)
     };


    const add = () => {
        if(input !== ""){
            const newDate = new Date()
            setList([...list, {
                id: Math.floor(Math.random() * 10000),
                task: input.trim(),
                date: `${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}`,
                done: false
            }])
           return setInput("")
        }
        return alert("Escribe algo")
    }

    const deleteCompleteTasks = () => {
        const filtered = list?.filter(x => x.done !== true)
        setList(filtered)
    }

    const fullfiled = useCallback((fn, id, doneState) => {
        fn(!doneState)
        const newArr = list?.map(x => {
            if(x.id === id) {
                const completeDate = new Date()
                const completeDateString = `${completeDate.getDate()}/${completeDate.getMonth()+1}/${completeDate.getFullYear()} ${completeDate.getHours()}:${completeDate.getMinutes()}`
                x.done = !doneState
                x.completeDate = completeDateString
            }
            return x
        })
        setList(newArr)
       }, [list])

       const handleEdit = (id) => {
        setEditID(id)
        setEditing(true)

    }

    const editTask = () =>{
       if(editValue.length > 0){
        const newArr = list?.map(x =>{ 
            if(x.id === editID){
                x.task = editValue
            }
            return x
        })
        setList(newArr)
        setEditing(false)
       } 
       else alert("Escribe algo")
      
    }

    useEffect(() => {
            const completedTasks = list?.filter(x => x.done === true).length
            completedTasks > 0 ? setComplete(true) : setComplete(false)
            setLocalStorage(list)

    }, [list])

  
    return (
        <div className="listCtn">
            <div className="inputs">
                <input type="text" maxLength={50} id="toDo"  onChange={(e) => onChangeHandler(e)} value={input}  onKeyDown={(e) => {if(e.key === "Enter"){add()}}}></input>
                <span className="charCount">{charCount}/50</span>
                <button onClick={() => add()}>+</button>
            </div>

            <div className="list">
            { editing ? 
            
             <div className="editingCtn">
             <input type="text" maxLength={50} onChange={(e) => setEditvalue(e.target.value)}></input>
             <button className="completeEditing" onClick={() => editTask()}><CheckBoxIcon style={{fontSize: "48px", color: "green"}}/></button>
             </div>
             :
            list?.map(el => <div key={el.id} className="itemCtn"> <Item el={el} fullfiled={fullfiled} /> 
            <button className="deleteButton" onClick={() => del(el.id)}><CancelIcon  style={{fontSize: "30px"}}/></button>
            <button className="editTask" onClick={() => handleEdit(el.id)}><EditIcon style={{color: "grey", fontSize: "20px", paddingTop:"2px"}}/></button>
            </div>)
           }
            </div>
            <button className="deleteCompleted" disabled={!complete} onClick={() => deleteCompleteTasks()}>Eliminar tareas completadas</button>
        </div>
    )
}

export default React.memo(List)
import React from "react"
import Item from "../Item"

const ToDoList = ({list, setList}) => {

 const del = (id) => {

 const filtered = list.filter(x => x.id !== id)

 setList(filtered)

 }   

 const complete = (fn) => {
  fn(true)
 }


    return(
        <div>
            {list.map(el => <Item el={el} complete={complete} del={del}/>)}

        </div>
    )
}


export default ToDoList
import React from "react"
import Item from "../Item"

const ToDoList = ({list, setList, del}) => {



 const complete = (fn, id) => {
  fn(true)
  const newArr = list.map(x => {
      if(x.id === id) {
          x.done = true
      }
      return x
  })
  setList(newArr)
 }


    return(
        <div>
            {list.map(el => <Item key={el.id} el={el} complete={complete} del={del}/>)}

        </div>
    )
}


export default ToDoList
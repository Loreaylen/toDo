import React, {useState} from "react"
import "../components/List/List.css"

const Item = ({el, complete, del}) => {

    const [done, setDone] = useState(false)


    return(
        
             <div className={`listItem ${done && "completeTask" }`} key={el.id} onClick={() => complete(setDone)}>
                <p className="task">{el.task}</p>
                <button className="deleteButton" onClick={() => del(el.id)}>X</button>
                </div>
    
    )
}


export default Item
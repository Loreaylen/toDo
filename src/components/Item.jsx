import React, {useState} from "react"
import "../components/List/List.css"

const Item = ({el, complete, del}) => {

    const [done, setDone] = useState(false)

    const id = el.id;


    return(
        
             <div className={`listItem ${done && "completeTask" }`} key={el.id} onClick={() => complete(setDone, id)}>
                <p className="task">{el.task}</p>
                </div>
    
    )
}


export default Item
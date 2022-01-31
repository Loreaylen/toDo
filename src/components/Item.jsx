import React, {useState, memo} from "react"
import "../components/List/List.css"

const Item = ({el, fullfiled}) => {

    const [done, setDone] = useState(el.done)

    const id = el.id;

    const borders = ["#FDCEE9", "#ECCEF3", "#DBCEFD", "#D5D9FD", "#CEE4FD", "#CEF1F2", "#CEFDE6" ]

    return(
        
             <div className={`listItem ${done && "completeTask" }`} style={{borderColor: borders[Math.floor(Math.random() * borders.length)]}} key={el.id} onClick={() => fullfiled(setDone, id, done)}>
                <p className="task">{el.task}</p>
                <p className="time">{el.done ? el.completeDate : el.date}</p>
                </div>
    
    )
}


export default memo(Item)
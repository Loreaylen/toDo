import React, {useState, memo} from "react"
import "../components/List/List.css"

const Item = ({el, fullfiled}) => {



    const [done, setDone] = useState(false)

    const id = el.id;

    const borders = ["#FDCEE9", "#ECCEF3", "#DBCEFD", "#D5D9FD", "#CEE4FD", "#CEF1F2", "#CEFDE6" ]

    console.log("item")

    return(
        
             <div className={`listItem ${done && "completeTask" }`} style={{borderColor: borders[Math.floor(Math.random() * borders.length)]}} key={el.id} onClick={() => fullfiled(setDone, id)}>
                <p className="task">{el.task}</p>
                </div>
    
    )
}


export default memo(Item)
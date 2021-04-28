import React  from "react";
import './messages.css'

// function showTime(bool, time, e) {
//     if (bool){
//         return (time)
        
//         console.log(time)
//     }
//     else {
//        //TODO: Fix Me!
//     }
  
// }
// {(e) => showTime(true, props.time, e)} 
let showTime;

function Purple_Message(props) {
    return <div className= "purple message">
        <p>{props.message}</p>
        </div>
}

function Pink_Message(props) {
    return <div className= "pink message" onMouseEnter={showTime = true} onMouseLeave={showTime = false} 
    > 
        {showTime && 
        <div className="time_label">
            {props.time}
        </div>}     
        <p>{props.message}</p>
    </div>
}


export {Purple_Message, Pink_Message};

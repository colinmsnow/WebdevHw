import React  from "react";
import './messages.css'


let show_time;
// function showTime(bool, time, e) {
//     this.state.show_time = bool
  
// }
// {(e) => showTime(true, props.time, e)} 


function Purple_Message(props) {
    return <div className= "purple message">
        <p>{props.message}</p>
        </div>
}

function Pink_Message(props) {
    return <div className= "pink message" onMouseEnter={() => show_time = true} onMouseLeave={() => show_time = false} 
    > 
        {show_time && 
        console.log(props.time)
        // <div className="time_label">
        //    <p>{props.time}</p>
        // </div>)
        }     
        <p>{props.message}</p>
    </div>
}


export {Pink_Message, Purple_Message};

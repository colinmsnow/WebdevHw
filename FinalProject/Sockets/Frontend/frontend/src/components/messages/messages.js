import React  from "react";
import './messages.css'

function showTime(bool, e) {
    if (bool){
       
    }
    else {
       
    }
  
}

function Purple_Message(props) {
    return <div className= "purple message">
        <p>{props.message}</p>
        </div>
}

function Pink_Message(props) {
    return <div className= "pink message" onMouseEnter={(e) => showTime(true, e)} onMouseLeave={(e) => showTime(false, e)} 
    >
        <p>{props.message}</p>
    </div>
}



export {Purple_Message, Pink_Message};

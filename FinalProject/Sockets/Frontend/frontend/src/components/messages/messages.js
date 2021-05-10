import React, { useState } from "react";
import './messages.css'

function Purple_Message(props) {
    // Purple message bubble
    const [isShown, setIsShown] = useState(false);
    return (

        <div className="resize right_message" onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}>

            {isShown && (
                <div className="time_label right_hover">
                    {props.time}
                </div>
            )}

            <div className="purple message">
                <p>{props.message}</p>
            </div>
        </div>
    );
}

function Pink_Message(props) {
    // Pink message bubble
    const [isShown, setIsShown] = useState(false);
    return (

        <div className="resize" onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}>

            {isShown && (
                <div className="time_label">
                    {props.time}
                </div>
            )}

            <div className="pink message">
                <p>{props.message}</p>
            </div>
        </div>
    );
}


export { Pink_Message, Purple_Message };

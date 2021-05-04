import React, {Component} from 'react';
import './chat_in_list.css'

function Chat_in_list (props)
{
    return (
    // if props.isUnread === false
    // TODO: Implement read or unread conditional
    <div>
    <div class="col">
    <h3>{props.name}</h3>
    </div>
    <div class="col">
    <h4 className="right_text">{props.last_time}</h4>
    </div>
    <div className="full">
    <p><b>{props.first_name}:</b> {props.message}</p>
    <hr></hr>
    </div>
    </div>

)
}

export default Chat_in_list;


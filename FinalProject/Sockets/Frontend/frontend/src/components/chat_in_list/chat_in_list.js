import React, {Component} from 'react';
import './chat_in_list.css'

function Chat_in_list (props)
{
    /* A chat item displayed in the left bar in the messages page.
    Displays name, forst name, timestamp, and last message   */

    return (
    // if props.isUnread === false
    // TODO: Implement read or unread conditional
    <div style={{width:"100%"}}>
    <div class="col">
    <h3 style = {{marginBlockEnd:"0"}}>{props.name}</h3>
    </div>
    <div class="col">
    <h4 className="right_text" style = {{marginBlockEnd:"0"}}>{props.last_time}</h4>
    </div>
    <div className="full">
    <p><b>{props.first_name}:</b> {props.message}</p>
    <hr></hr>
    </div>
    </div>

)
}

export default Chat_in_list;


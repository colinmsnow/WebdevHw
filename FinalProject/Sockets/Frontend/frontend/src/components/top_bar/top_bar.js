import React, { Component }  from "react";
import './top_bar.css'
import '../../assets/new_message.png'

function Top_bar(props){
    let state = {
        new_mess: false
    };
    // TODO: On new message icon click, re render conversation side to have input for new message
    return (
        <div className = "cont">
        <div className="titl">
        <h2>Conversations</h2>
        </div>
        <img className='icon_message' src={require('../../assets/new_message.png')} onClick = {()=>props.handler()}/>
        </div>
    )
    

}

export default Top_bar;
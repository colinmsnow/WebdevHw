import React  from "react";
import './buttons.css'


function Purple_Button(props) {
    return <button className= "purple_button" onClick={props.click}>{props.name}</button>
}

function White_Button(props) {
    return <button className= "white_button" onClick={props.click}>{props.name}</button>
}

function White_Button_Right(props) {
    return <button className= "white_button right" onClick={props.click}>{props.name}</button>
}
function Purple_Button_Right(props) {
    return <button className= "purple_button right" onClick={props.click}>{props.name}</button>
}


export {Purple_Button, White_Button, White_Button_Right, Purple_Button_Right};
